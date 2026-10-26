/* Studio: funzioni condivise tra vista studente e vista papà */
(function(){
const SL = window.StudioApp = window.StudioApp || {};
SL.moduli = SL.moduli || {};
SL.modulo = m => { SL.moduli[m.id] = m; };
SL.indice = list => { SL.elenco = list; };

/* utilità */
SL.esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
SL.norm = s => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/v/g, 'u').replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
SL.LS = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k, v); } catch(e){} }
};
SL.loadScript = src => new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); });
SL.loadModulo = async voce => { if (!SL.moduli[voce.id]) await SL.loadScript(voce.file); return SL.moduli[voce.id]; };

/* costanti */
SL.CASES = [['nom','Nominativo'],['gen','Genitivo'],['dat','Dativo'],['acc','Accusativo'],['voc','Vocativo'],['abl','Ablativo']];
SL.CASEIDX = c => SL.CASES.findIndex(x => x[0] === c);
SL.FORMS = [['Ns','Nom. sing.'],['Gs','Gen. sing.'],['Ds','Dat. sing.'],['As','Acc. sing.'],['Vs','Voc. sing.'],['Abs','Abl. sing.'],['Np','Nom. plur.'],['Gp','Gen. plur.'],['Dp','Dat. plur.'],['Ap','Acc. plur.'],['Vp','Voc. plur.'],['Abp','Abl. plur.']];
SL.FL = c => (SL.FORMS.find(f => f[0] === c) || [c, c])[1];
SL.CN = ['N.','G.','D.','Acc.','V.','Abl.'];

/* aiuti per scrivere i moduli */
SL.both = (a,b) => [a + ' ' + b, b + ' ' + a];
SL.decl = stem => [[stem+'a',stem+'ae'],[stem+'ae',stem+'arum'],[stem+'ae',stem+'is'],[stem+'am',stem+'as'],[stem+'a',stem+'ae'],[stem+'a',stem+'is']];
SL.declPair = (a,n) => { const A = SL.decl(a), N = SL.decl(n); return A.map((r,i) => r.map((x,j) => SL.both(x, N[i][j]))); };
SL.ch = (id,q,opts,a,why) => ({k:'choice', id, q, opts, a, why});
SL.cs = (id,q,a,why) => ({k:'choice', id, q, opts: SL.CASES.map(c => c[1]), a: SL.CASEIDX(a), why, cases: true});

/* valutazione: ogni esercizio si scompone in unità con esito */
SL.units = (it, st) => {
  const A = id => st.answers[id];
  const has = v => v != null && v !== '';
  switch (it.k) {
    case 'choice': { const v = A(it.id); return [{id:it.id, label:it.q, has:has(v), ok:v === it.a, show:has(v) ? it.opts[v] : '', sol:it.opts[it.a]}]; }
    case 'select': { const lab = x => (it.opts.find(o => o[0] === x) || ['', x])[1]; return it.rows.map((r,i) => { const id = it.id+'_'+i, v = A(id); return {id, label:r[0], has:!!v, ok:v === r[1], show:v ? lab(v) : '', sol:lab(r[1])}; }); }
    case 'text': return it.rows.map((r,i) => { const id = it.id+'_'+i, v = A(id) || ''; return {id, label:r[0], has:!!SL.norm(v), ok:r[1].map(SL.norm).includes(SL.norm(v)), show:v, sol:r[1][0]}; });
    case 'grid': { const out = []; it.a.forEach((row,ri) => row.forEach((acc,ci) => { const id = it.id+'_'+ri+'_'+ci, v = A(id) || ''; out.push({id, label:(it.rl || SL.CN)[ri]+' '+(it.cols ? it.cols[ci] : (ci ? 'plur.' : 'sing.')), has:!!SL.norm(v), ok:acc.map(SL.norm).includes(SL.norm(v)), show:v, sol:acc[0]}); })); return out; }
    case 'multi': { const v = A(it.id) || []; const ok = v.length === it.a.length && it.a.every(x => v.includes(x)); return [{id:it.id, label:it.form, has:v.length > 0, ok, show:v.map(SL.FL).join(', '), sol:it.a.map(SL.FL).join(', ')}]; }
    case 'open': {
      const v = A(it.id) || '', ck = A(it.id+'_c'), ov = A(it.id+'_ov');
      let self = A(it.id+'_s');
      if (it.checks) self = Array.isArray(ck) ? (ck.length === it.checks.length ? 'ok' : ck.length * 2 >= it.checks.length ? 'mid' : 'no') : undefined;
      const fin = ov || self;
      return [{id:it.id, label:it.src, has:!!String(v).trim(), ok:fin === 'ok', half:fin === 'mid', show:v, sol:it.model, self, ov, ck:Array.isArray(ck) ? ck : []}];
    }
    case 'flash': return it.deck.map((c,i) => { const s = st.flash[it.id+'_'+i]; return {id:it.id+'_'+i, label:c[0], has:!!s, ok:s === 'ok', show:s === 'ok' ? 'sapeva' : s === 'no' ? 'non sapeva' : '', sol:c[1]}; });
  }
  return [];
};
SL.bUnits = (b, st) => b.items.flatMap(it => SL.units(it, st));
SL.bStats = (b, st) => { const u = SL.bUnits(b, st); const pts = u.reduce((s,x) => s + (x.ok ? 1 : x.half ? .5 : 0), 0); return {tot:u.length, ans:u.filter(x => x.has).length, pts, pct:u.length ? Math.round(pts / u.length * 100) : 0}; };
SL.isFlash = b => b.items.every(i => i.k === 'flash');
SL.isOpen = b => b.items.every(i => i.k === 'open');
SL.level = p => p >= 85 ? 'done' : p >= 60 ? 'mid' : 'bad';
SL.vuoto = () => ({answers:{}, blocks:{}, flash:{}});
SL.normStato = s => Object.assign(SL.vuoto(), s || {}, {answers:Object.assign({}, (s||{}).answers), blocks:Object.assign({}, (s||{}).blocks), flash:Object.assign({}, (s||{}).flash)});
SL.isDone = (b, st) => { const s = SL.bStats(b, st); return SL.isFlash(b) ? s.ans === s.tot : !!(st.blocks[b.id] || {}).checked; };
SL.progresso = (m, st) => { const done = m.blocchi.filter(b => SL.isDone(b, st)).length; return {done, tot:m.blocchi.length}; };

SL.pill = (b, st) => {
  const s = SL.bStats(b, st), bs = st.blocks[b.id] || {};
  if (SL.isFlash(b)) { if (!s.ans) return '<span class="pill">Da fare</span>'; return '<span class="pill '+(s.ans === s.tot ? SL.level(s.pct) : 'prog')+'">'+s.pts+' / '+s.tot+'</span>'; }
  if (bs.checked) return '<span class="pill '+SL.level(s.pct)+'">'+s.pct+'%</span>';
  if (s.ans) return '<span class="pill prog">'+s.ans+' / '+s.tot+'</span>';
  return '<span class="pill">Da fare</span>';
};
SL.dataIt = iso => { if (!iso) return ''; const d = new Date(iso + (iso.length === 10 ? 'T12:00:00' : '')); return d.toLocaleDateString('it-IT', {weekday:'long', day:'numeric', month:'long'}); };
})();
