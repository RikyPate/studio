/* Studio: vista papà. Login Supabase, lettura in tempo reale, interrogazione, azzeramento. */
(function(){
const SL = StudioApp, esc = SL.esc, $ = s => document.querySelector(s);
const app = $('#app');
const sb = window.supabase.createClient(SL_CONFIG.url, SL_CONFIG.key, {auth:{persistSession:true, autoRefreshToken:true, storageKey:'sl_papa_auth'}});
let vista = SL.LS.get('sl_papa_vista') || 'andamento';
let righe = {}, sel = SL.LS.get('sl_papa_mod') || '', channel = null, aperti = new Set(), risposteAperte = new Set(), confermaReset = false;

function setConn(t, on){ const c = $('#conn'); c.className = 'conn ' + (on ? 'live' : ''); c.querySelector('span').textContent = t; }

/* ---------- login ---------- */
function loginForm(msg){
  $('#logout').hidden = true; setConn('Non collegato', false);
  app.innerHTML = '<h1>Vista genitore</h1><form class="login" id="lf"><div><label for="em">Email</label><input type="text" id="em" autocomplete="username" autocapitalize="off" spellcheck="false" inputmode="email"></div><div><label for="pw">Password</label><input type="password" id="pw" autocomplete="current-password" style="font:inherit;font-size:16px;width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:var(--sunk);color:var(--ink)"></div><button class="btn primary" type="submit">Entra</button>'+(msg ? '<p class="err">'+esc(msg)+'</p>' : '')+'</form>';
  $('#lf').addEventListener('submit', async e => {
    e.preventDefault();
    const {error} = await sb.auth.signInWithPassword({email: $('#em').value.trim(), password: $('#pw').value});
    if (error) loginForm('Accesso non riuscito: controlla email e password.');
  });
}
$('#logout').addEventListener('click', async () => { await sb.auth.signOut(); });

sb.auth.onAuthStateChange((ev, session) => {
  if (session) start(); else { if (channel) { sb.removeChannel(channel); channel = null; } loginForm(); }
});

/* ---------- dati ---------- */
let avviato = false;
async function start(){
  if (avviato) return; avviato = true;
  $('#logout').hidden = false; setConn('Carico…', false);
  for (const v of (SL.elenco || [])) { try { await SL.loadModulo(v); } catch(e){} }
  if (!sel || !SL.moduli[sel]) sel = (SL.elenco || [])[0] ? SL.elenco[0].id : '';
  await carica();
  channel = sb.channel('sessioni-papa')
    .on('postgres_changes', {event:'*', schema:'public', table:'sessioni'}, p => { if (p.new && p.new.modulo) { righe[p.new.modulo] = p.new; render(); } })
    .subscribe(s => { if (s === 'SUBSCRIBED') setConn('In tempo reale', true); else if (s === 'CHANNEL_ERROR' || s === 'TIMED_OUT' || s === 'CLOSED') setConn('Aggiornamento automatico interrotto', false); });
  render();
}
async function carica(){
  const {data, error} = await sb.from('sessioni').select('*');
  if (error) { app.innerHTML = '<p class="err">Non riesco a leggere i dati ('+esc(error.message)+'). Controlla che l\'email nello script SQL sia quella del tuo utente.</p>'; return; }
  righe = {}; (data || []).forEach(r => { righe[r.modulo] = r; });
}
document.addEventListener('visibilitychange', async () => { if (document.visibilityState === 'visible' && avviato) { await carica(); render(); } });

/* ---------- vista ---------- */
function render(){
  const y = scrollY;
  const elenco = SL.elenco || [];
  const m = SL.moduli[sel];
  let h = '<h1>Vista genitore</h1><div class="modsel seg" role="group" aria-label="Ripasso">'+elenco.map(v => '<button type="button" data-mod="'+v.id+'" aria-pressed="'+(v.id === sel)+'">'+esc(v.materia)+' · '+esc(v.titolo.split('·')[0].trim())+'</button>').join('')+'</div>';
  if (!m) { app.innerHTML = h + '<p class="note">Nessun ripasso disponibile.</p>'; return; }
  h += '<div class="tabs seg" role="group" aria-label="Sezione"><button type="button" data-vista="andamento" aria-pressed="'+(vista==='andamento')+'">Andamento</button><button type="button" data-vista="schede" aria-pressed="'+(vista==='schede')+'">Schede</button></div>';
  if (vista === 'schede') { app.innerHTML = h + '<p class="lead">'+esc(m.titolo)+(m.fonte ? ' · '+esc(m.fonte) : '')+'. Sono le stesse schede che vede lei.</p>' + m.schede; scrollTo(0, y); return; }
  const r = righe[m.id] || {}; const st = SL.normStato(r.stato); const orale = r.orale || {};
  const all = m.blocchi.map(b => ({b, s:SL.bStats(b, st), bs:st.blocks[b.id] || {}}));
  const done = all.filter(x => SL.isDone(x.b, st)).length;
  const graded = all.filter(x => !SL.isFlash(x.b) && x.bs.checked);
  const avg = graded.length ? Math.round(graded.reduce((s,x) => s + x.s.pct, 0) / graded.length) : null;
  const illus = all.filter(x => x.bs.checked && x.bs.conf === 'so' && x.s.pct < 85).length;
  const flashB = all.find(x => SL.isFlash(x.b));
  h += '<p class="lead">'+esc(m.titolo)+(m.scadenza ? ' · '+esc(m.nota || '')+' '+esc(SL.dataIt(m.scadenza)) : '')+(r.aggiornato_il ? '<br><span class="note">Ultima attività: '+new Date(r.aggiornato_il).toLocaleString('it-IT', {weekday:'short', day:'numeric', month:'short', hour:'2-digit', minute:'2-digit'})+'</span>' : '<br><span class="note">Nessuna attività finora.</span>')+'</p>';
  h += '<div class="sum"><div class="stat"><b>'+done+' / '+m.blocchi.length+'</b><span>blocchi completati</span></div><div class="stat"><b>'+(avg == null ? 'nessuno' : avg+'%')+'</b><span>media dei blocchi corretti</span></div>'+(flashB ? '<div class="stat"><b>'+flashB.s.pts+' / '+flashB.s.tot+'</b><span>flashcard sapute</span></div>' : '')+'<div class="stat"><b>'+illus+'</b><span>blocchi con "lo so" ma sotto l\'85%</span></div></div>';
  h += '<h2 class="sec">Blocchi</h2>';
  all.forEach(({b, s, bs}, bi) => {
    const conf = {so:'Lo so', credo:'Credo', non:'Non lo so'}[bs.conf];
    let flag = ''; if (bs.checked && bs.conf === 'so' && s.pct < 85) flag = '<span class="flag">Illusione di sapere</span>'; else if (bs.checked && bs.conf === 'non' && s.pct >= 85) flag = '<span class="flag">Sa più di quanto crede</span>';
    h += '<details class="prow" data-b="'+b.id+'"'+(aperti.has(b.id) ? ' open' : '')+'><summary><span class="bnum">'+(bi+1)+'</span><span class="btitle">'+esc(b.title)+'</span>'+(conf ? '<span class="pill">Sicurezza: '+conf+'</span>' : '')+flag+SL.pill(b, st)+'</summary><div class="det">';
    if (SL.isFlash(b)) { const no = SL.bUnits(b, st).filter(u => u.has && !u.ok); h += '<p>Da ripassare ('+no.length+'): '+(no.length ? no.map(u => '<i>'+esc(u.label)+'</i> = '+esc(u.sol)).join(' · ') : 'nessuna')+'</p>'; }
    else {
      const open = SL.isOpen(b);
      h += '<table>'+SL.bUnits(b, st).map(u => {
        const mk = !u.has ? '<td class="mk u">·</td>' : open ? (u.self ? '<td class="mk '+(u.ok ? 'y' : u.half ? 'u' : 'n')+'">'+(u.ok ? '✓' : u.half ? '~' : '✗')+'</td>' : '<td class="mk u">?</td>') : '<td class="mk '+(u.ok ? 'y' : 'n')+'">'+(u.ok ? '✓' : '✗')+'</td>';
        return '<tr>'+mk+'<td>'+u.label+'</td><td>'+(u.has ? '<b>'+esc(u.show)+'</b>' : '<span class="note">non ancora</span>')+(u.has && !u.ok ? '<br><span class="note">giusta: '+esc(u.sol)+'</span>' : '')+'</td></tr>';
      }).join('')+'</table>';
    }
    h += '</div></details>';
  });
  if (m.orale && m.orale.length) {
    h += '<h2 class="sec">Interrogazione a voce</h2><p class="note">Fagliele dopo i blocchi, senza libro. Apri la risposta attesa solo dopo che ha parlato.</p>';
    m.orale.forEach((o,i) => { const v = orale['o'+i]; h += '<div class="oral"><p>'+(i+1)+'. '+esc(o[0])+'</p><div class="ans"'+(risposteAperte.has(i) ? '' : ' hidden')+'>'+esc(o[1])+'</div><div class="row"><button type="button" class="btn" data-oshow="'+i+'">Risposta attesa</button>'+[['ok','Sa'],['mid','Incerta'],['no','Non sa']].map(x => '<button type="button" class="btn" data-oral="'+i+'" data-v="'+x[0]+'" aria-pressed="'+(v === x[0])+'">'+x[1]+'</button>').join('')+'</div></div>'; });
  }
  h += '<h2 class="sec">Azzera</h2><p class="note">Cancella risposte e interrogazione di questo ripasso. L\'iPad riparte da zero alla prossima apertura.</p><div class="row">'+(confermaReset ? '<span class="note">Sicuro?</span><button type="button" class="btn danger" data-reset="go">Sì, azzera</button><button type="button" class="btn" data-reset="no">Annulla</button>' : '<button type="button" class="btn danger" data-reset="ask">Azzera questo ripasso</button>')+'</div>';
  app.innerHTML = h; scrollTo(0, y);
}

app.addEventListener('toggle', e => { const d = e.target; if (d.matches && d.matches('details.prow')) { if (d.open) aperti.add(d.dataset.b); else aperti.delete(d.dataset.b); } }, true);
app.addEventListener('click', async e => {
  const t = e.target.closest('button'); if (!t) return; const d = t.dataset;
  if (d.vista) { vista = d.vista; SL.LS.set('sl_papa_vista', vista); render(); scrollTo(0, 0); return; }
  if (d.mod) { sel = d.mod; SL.LS.set('sl_papa_mod', sel); aperti.clear(); risposteAperte.clear(); confermaReset = false; render(); return; }
  if (d.oshow != null) { const i = +d.oshow; if (risposteAperte.has(i)) risposteAperte.delete(i); else risposteAperte.add(i); render(); return; }
  if (d.oral != null) {
    const r = righe[sel] || {modulo: sel}; const orale = Object.assign({}, r.orale || {}, {['o'+d.oral]: d.v});
    righe[sel] = Object.assign({}, r, {orale}); render();
    const {error} = r.aggiornato_il ? await sb.from('sessioni').update({orale}).eq('modulo', sel) : await sb.from('sessioni').upsert({modulo: sel, orale});
    if (error) setConn('Valutazione non salvata: riprova', false);
    return;
  }
  if (d.reset === 'ask') { confermaReset = true; render(); return; }
  if (d.reset === 'no') { confermaReset = false; render(); return; }
  if (d.reset === 'go') {
    confermaReset = false;
    const {error} = await sb.from('sessioni').upsert({modulo: sel, stato: {}, orale: {}, azzerato_il: new Date().toISOString()});
    if (error) setConn('Azzeramento non riuscito: riprova', false);
    await carica(); render(); return;
  }
});
})();
