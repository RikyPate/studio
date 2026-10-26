/* Studio: app della studentessa. Salva in locale e invia al database (solo scrittura). */
(function(){
const SL = StudioApp, esc = SL.esc, $ = s => document.querySelector(s);
const app = $('#app');
const sb = window.supabase && window.SL_CONFIG ? window.supabase.createClient(SL_CONFIG.url, SL_CONFIG.key, {auth:{persistSession:false, autoRefreshToken:false}}) : null;

let mod = null, st = SL.vuoto(), epoca = null, tab = 'esercizi';
let openBlock = '', flashIdx = {}, flashShow = {}, flashOnlyNo = {};
let saveTimer = null, dirty = false, saving = false;

/* ---------- stato locale e sincronizzazione ---------- */
const key = id => 'sl_' + id;
function loadLocal(id){ try { const d = JSON.parse(SL.LS.get(key(id)) || 'null'); return d || {}; } catch(e){ return {}; } }
function saveLocal(){ if (mod) SL.LS.set(key(mod.id), JSON.stringify({stato:st, epoca, dirty})); }
function setSync(t, cls){ const el = $('#sync'); if (!el) return; el.className = 'conn ' + (cls || ''); el.querySelector('span').textContent = t; }

function touch(){ dirty = true; saveLocal(); clearTimeout(saveTimer); saveTimer = setTimeout(push, 1200); }
async function push(){
  if (!sb || !mod || saving || !dirty) { if (!sb) setSync('Salvato su questo iPad', ''); return; }
  saving = true; const sent = JSON.stringify(st);
  try {
    const {data, error} = await sb.rpc('salva_stato', {p_modulo: mod.id, p_stato: JSON.parse(sent), p_epoca: epoca});
    if (error) throw error;
    if (data && data.esito === 'azzerato') { azzera(data.epoca); }
    else { if (data && data.epoca) epoca = data.epoca; if (JSON.stringify(st) === sent) dirty = false; setSync('Inviato a papà', 'live'); }
    saveLocal();
  } catch(e) { setSync('Non inviato: riprovo appena c\'è rete', 'warn'); }
  saving = false;
  if (dirty) { clearTimeout(saveTimer); saveTimer = setTimeout(push, 4000); }
}
function azzera(nuova){ st = SL.vuoto(); epoca = nuova; dirty = false; flashIdx = {}; flashShow = {}; saveLocal(); setSync('Ripasso azzerato da papà', 'live'); render(); }
async function checkEpoca(){
  if (!sb || !mod) return;
  try {
    const {data, error} = await sb.rpc('epoca_modulo', {p_modulo: mod.id});
    if (error) throw error;
    if (data && epoca && new Date(data) > new Date(epoca)) azzera(data);
    else if (data && !epoca) { epoca = data; saveLocal(); }
    if (dirty) push(); else setSync('Collegato', 'live');
  } catch(e) { setSync('Offline: salvo sull\'iPad', 'warn'); }
}
window.addEventListener('online', () => { checkEpoca(); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkEpoca(); else if (dirty) push(); });

function setAnswer(id, v){ st.answers[id] = v; touch(); }

/* ---------- navigazione ---------- */
function route(){
  const id = decodeURIComponent(location.hash.replace(/^#/, ''));
  const voce = (SL.elenco || []).find(v => v.id === id);
  if (voce) openModulo(voce); else home();
}
window.addEventListener('hashchange', route);

async function home(){
  mod = null; document.title = 'Studio';
  const list = SL.elenco || [];
  const attivi = list.filter(v => v.stato !== 'archivio'), arch = list.filter(v => v.stato === 'archivio');
  const card = v => {
    const loc = loadLocal(v.id), s = SL.normStato(loc.stato); const m = SL.moduli[v.id];
    const p = m ? SL.progresso(m, s) : null; const pct = p ? Math.round(p.done / p.tot * 100) : 0;
    return '<a class="mod" href="#'+encodeURIComponent(v.id)+'"><svg class="ring" viewBox="0 0 36 36" aria-hidden="true"><circle cx="18" cy="18" r="15" fill="none" stroke="var(--line)" stroke-width="4"/><circle cx="18" cy="18" r="15" fill="none" stroke="var(--accent)" stroke-width="4" stroke-linecap="round" stroke-dasharray="'+(pct*0.9425).toFixed(1)+' 94.25" transform="rotate(-90 18 18)"/><text x="18" y="21.5" text-anchor="middle" font-size="9" font-weight="700" fill="var(--ink)">'+(p ? p.done+'/'+p.tot : '')+'</text></svg><span class="grow"><span class="mat">'+esc(v.materia)+'</span><span class="tit" style="display:block">'+esc(v.titolo)+'</span><span class="meta">'+(v.scadenza ? esc(v.nota || 'Scadenza')+': '+esc(SL.dataIt(v.scadenza)) : '')+'</span></span></a>';
  };
  app.innerHTML = '<h1>Ciao!</h1><p class="lead">Scegli il ripasso. Ogni blocco è breve: rispondi senza libro, di\' quanto sei sicura, poi correggi.</p><div class="mods">'+(attivi.length ? attivi.map(card).join('') : '<p class="note">Nessun ripasso attivo.</p>')+'</div>'+(arch.length ? '<h2 class="sec">Archivio</h2><div class="mods">'+arch.map(card).join('')+'</div>' : '');
  setSync(sb ? 'Pronto' : 'Solo su questo iPad', sb ? 'live' : '');
  // carica i moduli per mostrare i progressi
  let changed = false;
  for (const v of list) { if (!SL.moduli[v.id]) { try { await SL.loadModulo(v); changed = true; } catch(e){} } }
  if (changed && !mod) { const y = scrollY; home(); scrollTo(0, y); }
}

async function openModulo(voce){
  try { mod = await SL.loadModulo(voce); } catch(e) { app.innerHTML = '<p class="err">Non riesco a caricare il ripasso. Controlla la connessione e riprova.</p>'; return; }
  const loc = loadLocal(mod.id); st = SL.normStato(loc.stato); epoca = loc.epoca || null; dirty = !!loc.dirty;
  openBlock = SL.LS.get('sl_open_' + mod.id) || mod.blocchi[0].id; tab = 'esercizi';
  document.title = mod.materia + ' · Studio';
  render(); scrollTo(0, 0); checkEpoca();
}

/* ---------- rendering modulo ---------- */
function render(){
  if (!mod) return;
  let h = '<button type="button" class="back" data-home="1">‹ Tutti i ripassi</button>';
  h += '<h1>'+esc(mod.materia)+'</h1><p class="lead">'+esc(mod.titolo)+(mod.scadenza ? ' · '+esc(mod.nota || '')+' '+esc(SL.dataIt(mod.scadenza)) : '')+'</p>';
  h += '<div class="tabs seg" role="group" aria-label="Sezione"><button type="button" data-tab="esercizi" aria-pressed="'+(tab==='esercizi')+'">Esercizi</button><button type="button" data-tab="schede" aria-pressed="'+(tab==='schede')+'">Schede</button></div>';
  if (tab === 'schede') { h += '<p class="note" style="margin-bottom:12px">Usale dopo aver provato gli esercizi. Leggi, chiudi, ripeti ad alta voce, riapri e controlla.</p>' + mod.schede; app.innerHTML = h; return; }
  mod.blocchi.forEach((b, bi) => {
    const open = b.id === openBlock;
    h += '<section class="block" data-block="'+b.id+'"><button type="button" class="bhead" data-toggle="'+b.id+'" aria-expanded="'+open+'"><span class="bnum">'+(bi+1)+'</span><span class="btitle">'+esc(b.title)+'<span>'+esc(b.tag)+'</span></span><span data-pill="'+b.id+'">'+SL.pill(b, st)+'</span></button>';
    if (open) h += '<div class="bbody">'+blockBody(b)+'</div>';
    h += '</section>';
  });
  app.innerHTML = h;
}
function blockBody(b){
  const bs = st.blocks[b.id] || {}, checked = !!bs.checked;
  let h = '<div class="goal"><span class="tag">'+esc(b.tag)+'</span>'+esc(b.goal)+'</div>';
  b.items.forEach(it => { h += '<div class="item">'+itemHTML(it, checked)+'</div>'; });
  if (!SL.isFlash(b)) h += footHTML(b, bs);
  return h;
}
function inp(id, v, cls, ro, label){ return '<input type="text" id="'+id+'" data-id="'+id+'" class="'+cls+'" value="'+esc(v)+'" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"'+(ro ? ' readonly' : '')+(label ? ' aria-label="'+esc(label)+'"' : '')+'>'; }
function itemHTML(it, checked){
  const A = id => st.answers[id];
  if (it.k === 'choice') {
    let h = '<p class="q">'+it.q+'</p><div class="opts'+(it.cases ? ' cases' : '')+'">';
    it.opts.forEach((o,i) => { const sel = A(it.id) === i; let cls = 'opt'; if (checked) { if (i === it.a) cls += ' ok'; else if (sel) cls += ' ko'; } h += '<button type="button" class="'+cls+'" data-choice="'+it.id+'" data-i="'+i+'" aria-pressed="'+sel+'"'+(checked ? ' disabled' : '')+'>'+o+'</button>'; });
    h += '</div>'; if (checked && it.why) h += '<div class="why">'+esc(it.why)+'</div>'; return h;
  }
  if (it.k === 'select') {
    let h = '<p class="q">'+esc(it.q)+'</p><div class="rows">';
    it.rows.forEach((r,i) => { const id = it.id+'_'+i, v = A(id) || ''; const cls = checked ? (v === r[1] ? 'ok' : 'ko') : ''; h += '<label for="'+id+'">'+esc(r[0])+'</label><div><select id="'+id+'" data-id="'+id+'" class="'+cls+'"'+(checked ? ' disabled' : '')+'><option value="">…</option>'+it.opts.map(o => '<option value="'+o[0]+'"'+(v === o[0] ? ' selected' : '')+'>'+o[1]+'</option>').join('')+'</select>'+(checked && v !== r[1] ? '<span class="sol">'+esc((it.opts.find(o => o[0] === r[1]) || ['', r[1]])[1])+'</span>' : '')+'</div>'; });
    return h + '</div>';
  }
  if (it.k === 'text') {
    let h = '<p class="q">'+esc(it.q)+'</p><div class="rows">';
    it.rows.forEach((r,i) => { const id = it.id+'_'+i, v = A(id) || ''; const ok = r[1].map(SL.norm).includes(SL.norm(v)); const cls = checked ? (ok ? 'ok' : 'ko') : ''; h += '<label for="'+id+'">'+esc(r[0])+'</label><div>'+inp(id, v, cls, checked)+(checked && !ok ? '<span class="sol">'+esc(r[1][0])+'</span>' : '')+'</div>'; });
    return h + '</div>';
  }
  if (it.k === 'grid') {
    let h = '<p class="q">'+it.q+'</p><div class="scroll"><table class="gridtbl"><thead><tr><th></th>'+(it.cols || ['Singolare','Plurale']).map(c => '<th>'+esc(c)+'</th>').join('')+'</tr></thead><tbody>';
    const RL = it.rl || SL.CN;
    it.a.forEach((row,ri) => { h += '<tr><td>'+esc(RL[ri])+'</td>'; row.forEach((acc,ci) => { const id = it.id+'_'+ri+'_'+ci, v = A(id) || ''; const ok = acc.map(SL.norm).includes(SL.norm(v)); const cls = checked ? (ok ? 'ok' : 'ko') : ''; h += '<td>'+inp(id, v, cls, checked, RL[ri]+(ci ? ' plurale' : ' singolare'))+(checked && !ok ? '<span class="sol">'+esc(acc[0])+'</span>' : '')+'</td>'; }); h += '</tr>'; });
    return h + '</tbody></table></div>';
  }
  if (it.k === 'multi') {
    const v = A(it.id) || [];
    let h = '<p class="q"><span class="form">'+esc(it.form)+'</span></p><div class="chips">';
    SL.FORMS.forEach(f => { const sel = v.includes(f[0]), right = it.a.includes(f[0]); let cls = 'chip'; if (checked) { if (sel && right) cls += ' right'; else if (sel) cls += ' wrong'; else if (right) cls += ' miss'; } h += '<button type="button" class="'+cls+'" data-multi="'+it.id+'" data-f="'+f[0]+'" aria-pressed="'+sel+'"'+(checked ? ' disabled' : '')+'>'+f[1]+'</button>'; });
    h += '</div>'; if (checked) h += '<div class="why">Soluzione: '+esc(it.a.map(SL.FL).join(', '))+(it.why ? '. '+esc(it.why) : '')+'</div>'; return h;
  }
  if (it.k === 'open') {
    const v = A(it.id) || '', s = A(it.id+'_s');
    let h = '<p class="q"><span class="tag">'+(it.toLat ? 'In latino' : 'In italiano')+'</span><span class="'+(it.toLat ? '' : 'latin')+'" style="font-size:19px">'+esc(it.src)+'</span></p>';
    h += '<textarea id="'+it.id+'" data-id="'+it.id+'" autocapitalize="sentences" spellcheck="false" autocomplete="off"'+(checked ? ' readonly' : '')+' aria-label="La tua traduzione">'+esc(v)+'</textarea>';
    if (it.hint && !checked) h += '<div class="note">Aiuto: '+esc(it.hint)+'</div>';
    if (checked && it.checks) { const ck = A(it.id+'_c') || []; h += '<div class="why"><b>Soluzione:</b> '+esc(it.model)+'</div><p class="note" style="margin:10px 0 6px">Confronta la tua frase con la soluzione e tocca solo i punti che hai fatto davvero giusti:</p><div class="opts">'+it.checks.map((c,i) => '<button type="button" class="opt'+(ck.includes(i) ? ' ok' : '')+'" data-ck="'+it.id+'" data-i="'+i+'" aria-pressed="'+ck.includes(i)+'">'+(ck.includes(i) ? '✓ ' : '')+esc(c)+'</button>').join('')+'</div>'; return h; }
    if (checked) h += '<div class="why"><b>Soluzione:</b> '+esc(it.model)+'</div><div class="row" style="margin-top:8px"><span class="note">La tua era:</span>'+[['ok','Giusta'],['mid','Quasi'],['no','Sbagliata']].map(o => '<button type="button" class="btn" data-self="'+it.id+'" data-v="'+o[0]+'" aria-pressed="'+(s === o[0])+'">'+o[1]+'</button>').join('')+'</div>';
    return h;
  }
  if (it.k === 'flash') return flashHTML(it);
  return '';
}
function footHTML(b, bs){
  const s = SL.bStats(b, st);
  if (bs.checked) {
    const conf = {so:'Lo so', credo:'Credo di saperlo', non:'Non lo so'}[bs.conf] || '';
    let msg;
    if (SL.isOpen(b)) msg = b.items.some(i => i.checks) ? 'Per ogni frase tocca solo i punti che hai fatto davvero giusti: il punteggio si aggiorna. Papà vedrà le tue frasi e potrà correggerle.' : 'Valuta ogni frase con Giusta, Quasi o Sbagliata: il punteggio si aggiorna.';
    else if (bs.conf === 'so' && s.pct < 85) msg = 'Avevi detto "lo so", ma non tutto era giusto: è proprio qui che il ripasso a voce serve. Rileggi le correzioni, ripetile ad alta voce e rifai il blocco.';
    else if (bs.conf === 'non' && s.pct >= 85) msg = 'Ne sapevi più di quanto pensavi. Fidati di più.';
    else if (s.pct >= 85) msg = 'Bene. Ripeti a voce le spiegazioni e passa al blocco successivo.';
    else msg = 'Rileggi le correzioni, ripeti a voce le regole e rifai il blocco più tardi.';
    const i = mod.blocchi.indexOf(b);
    return '<div class="foot"><div class="result '+SL.level(s.pct)+'">'+(SL.isOpen(b) ? 'Autovalutazione: ' : 'Risultato: ')+s.pct+'% · avevi detto: '+esc(conf)+'<small>'+esc(msg)+'</small></div><div class="row"><button type="button" class="btn" data-redo="'+b.id+'">Rifai il blocco</button>'+(i < mod.blocchi.length - 1 ? '<button type="button" class="btn primary" data-toggle="'+mod.blocchi[i+1].id+'">Blocco successivo</button>' : '')+'</div></div>';
  }
  const c = bs.conf || '';
  return '<div class="foot"><div class="conf"><p>Prima di correggere: quanto sei sicura delle tue risposte?</p>'+[['so','Lo so'],['credo','Credo di saperlo'],['non','Non lo so']].map(o => '<button type="button" class="btn" data-conf="'+b.id+'" data-v="'+o[0]+'" aria-pressed="'+(c === o[0])+'">'+o[1]+'</button>').join('')+'</div><div class="row"><button type="button" class="btn primary" data-check="'+b.id+'"'+(c ? '' : ' disabled')+'>'+(SL.isOpen(b) ? 'Mostra le soluzioni' : 'Correggi')+'</button><span class="note" data-count="'+b.id+'">'+s.ans+' risposte su '+s.tot+'</span></div></div>';
}
function flashHTML(it){
  const deck = it.deck.map((c,i) => ({c, i}));
  const onlyNo = !!flashOnlyNo[it.id];
  const list = onlyNo ? deck.filter(d => st.flash[it.id+'_'+d.i] !== 'ok') : deck;
  const u = SL.units(it, st); const okN = u.filter(x => x.ok).length, noN = u.filter(x => x.has && !x.ok).length, todo = u.length - okN - noN;
  let h = '<div class="row note"><span>Sapute: <b>'+okN+'</b></span><span>Da ripassare: <b>'+noN+'</b></span><span>Mai viste: <b>'+todo+'</b></span></div><div class="meter"><i style="width:'+Math.round(okN / u.length * 100)+'%"></i></div>';
  h += '<div class="row" style="margin:10px 0"><button type="button" class="btn" data-fonly="'+it.id+'" aria-pressed="'+onlyNo+'">Solo quelle non sapute</button></div>';
  if (!list.length) return h + '<div class="card"><div class="back">Le sai tutte. Brava.</div><div class="hint">Togli il filtro per ripassarle di nuovo.</div></div>';
  const idx = (flashIdx[it.id] || 0) % list.length, d = list[idx], show = !!flashShow[it.id];
  h += '<div class="card"><div class="hint">'+(idx+1)+' di '+list.length+'</div><div class="front">'+esc(d.c[0])+'</div>'+(show ? '<div class="back">'+esc(d.c[1])+'</div>' : '<div class="hint">Di\' il significato ad alta voce, poi gira.</div>')+'</div>';
  h += '<div class="cardbar">'+(show ? '<button type="button" class="btn" data-fgrade="'+it.id+'" data-i="'+d.i+'" data-v="no">Non la sapevo</button><button type="button" class="btn primary" data-fgrade="'+it.id+'" data-i="'+d.i+'" data-v="ok">La sapevo</button>' : '<button type="button" class="btn primary" data-fshow="'+it.id+'">Gira la carta</button><button type="button" class="btn" data-fskip="'+it.id+'">Salta</button>')+'</div>';
  return h;
}
function rerenderBlock(id){
  const sec = document.querySelector('.block[data-block="'+id+'"]'); if (!sec) return;
  const b = mod.blocchi.find(x => x.id === id); const body = sec.querySelector('.bbody');
  if (body) body.innerHTML = blockBody(b); sec.querySelector('[data-pill]').innerHTML = SL.pill(b, st);
}

/* ---------- eventi ---------- */
app.addEventListener('input', e => {
  const el = e.target; if (!el.dataset.id || !(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
  setAnswer(el.dataset.id, el.value);
  const sec = el.closest('.block'); if (sec) { const b = mod.blocchi.find(x => x.id === sec.dataset.block); const s = SL.bStats(b, st); const c = sec.querySelector('[data-count]'); if (c) c.textContent = s.ans+' risposte su '+s.tot; sec.querySelector('[data-pill]').innerHTML = SL.pill(b, st); }
});
app.addEventListener('change', e => { const el = e.target; if (el.tagName === 'SELECT' && el.dataset.id) { setAnswer(el.dataset.id, el.value); const sec = el.closest('.block'); if (sec) rerenderBlock(sec.dataset.block); } });
app.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t || t.disabled) return; const d = t.dataset;
  const secId = () => { const s = t.closest('.block'); return s && s.dataset.block; };
  if (d.home) { location.hash = ''; return; }
  if (d.tab) { tab = d.tab; render(); return; }
  if (d.toggle) { openBlock = (openBlock === d.toggle && t.classList.contains('bhead')) ? '' : d.toggle; SL.LS.set('sl_open_' + mod.id, openBlock); render(); const s = document.querySelector('.block[data-block="'+d.toggle+'"]'); if (s && openBlock) s.scrollIntoView({block:'start'}); return; }
  if (d.choice) { setAnswer(d.choice, +d.i); rerenderBlock(secId()); return; }
  if (d.multi) { const v = (st.answers[d.multi] || []).slice(); const k = v.indexOf(d.f); if (k >= 0) v.splice(k, 1); else v.push(d.f); setAnswer(d.multi, v); rerenderBlock(secId()); return; }
  if (d.conf) { st.blocks[d.conf] = Object.assign({}, st.blocks[d.conf], {conf: d.v}); touch(); rerenderBlock(d.conf); return; }
  if (d.check) { const b = mod.blocchi.find(x => x.id === d.check); b.items.forEach(it => { if (it.k === 'open' && it.checks && !Array.isArray(st.answers[it.id+'_c'])) st.answers[it.id+'_c'] = []; }); const s = SL.bStats(b, st); st.blocks[d.check] = Object.assign({}, st.blocks[d.check], {checked: true, pct: s.pct, at: Date.now()}); touch(); push(); rerenderBlock(d.check); return; }
  if (d.redo) { const b = mod.blocchi.find(x => x.id === d.redo); SL.bUnits(b, st).forEach(u => { delete st.answers[u.id]; delete st.answers[u.id+'_s']; }); st.blocks[d.redo] = {}; touch(); rerenderBlock(d.redo); return; }
  if (d.ck) { const v = (st.answers[d.ck+'_c'] || []).slice(); const i = +d.i, k = v.indexOf(i); if (k >= 0) v.splice(k, 1); else v.push(i); setAnswer(d.ck+'_c', v); rerenderBlock(secId()); return; }
  if (d.self) { setAnswer(d.self+'_s', d.v); rerenderBlock(secId()); return; }
  if (d.fshow) { flashShow[d.fshow] = true; rerenderBlock(secId()); return; }
  if (d.fskip) { flashIdx[d.fskip] = (flashIdx[d.fskip] || 0) + 1; flashShow[d.fskip] = false; rerenderBlock(secId()); return; }
  if (d.fgrade) { st.flash[d.fgrade+'_'+d.i] = d.v; touch(); if (!flashOnlyNo[d.fgrade] || d.v !== 'ok') flashIdx[d.fgrade] = (flashIdx[d.fgrade] || 0) + 1; flashShow[d.fgrade] = false; rerenderBlock(secId()); return; }
  if (d.fonly) { flashOnlyNo[d.fonly] = !flashOnlyNo[d.fonly]; flashIdx[d.fonly] = 0; flashShow[d.fonly] = false; rerenderBlock(secId()); return; }
});

/* ---------- avvio ---------- */
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
route();
})();
