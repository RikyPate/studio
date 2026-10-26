/* Modulo: Latino, verifica del 28 ottobre (libro pp. 1-43). Prima le lacune emerse nel primo ripasso, poi il nuovo, poi il giro completo. */
(function(){
const SL=StudioApp, ch=SL.ch, cs=SL.cs, both=SL.both;
const e=x=>'<span class="e">'+x+'</span>';
const lex=[
  ['amica, -ae','amica'],['ancilla, -ae','ancella'],['aqua, -ae','acqua'],['ara, -ae','altare'],['aula, -ae','sala, cortile'],['avaritia, -ae','avidità'],['culpa, -ae','colpa'],['cura, -ae','preoccupazione'],['doctrina, -ae','erudizione'],['domina, -ae','padrona'],['epistula, -ae','lettera'],['fama, -ae','fama, reputazione'],['filia, -ae','figlia'],['forma, -ae','bellezza'],['gratia, -ae','benevolenza, gratitudine'],['hora, -ae','ora (del giorno)'],['industria, -ae','impegno'],['insula, -ae','isola'],['invidia, -ae','invidia, odio'],['magistra, -ae','maestra'],['matrona, -ae','matrona'],['ora, -ae','spiaggia, riva'],['pecunia, -ae','denaro'],['poena, -ae','pena'],['porta, -ae','porta (della città)'],['potentia, -ae','potere, autorità'],['procella, -ae','tempesta'],['prudentia, -ae','saggezza'],['puella, -ae','ragazza, bambina'],['pugna, -ae','battaglia'],['ruina, -ae','crollo, rovina'],['sententia, -ae','parere, opinione'],['serva, -ae','schiava, serva'],['silva, -ae','bosco'],['venia, -ae','perdono'],['victoria, -ae','vittoria'],['villa, -ae','fattoria'],['vita, -ae','vita'],
  ['advena, -ae (m.)','straniero'],['agricola, -ae (m.)','contadino'],['conviva, -ae (m.)','commensale'],['incola, -ae (m.)','abitante'],['nauta, -ae (m.)','marinaio'],['pirata, -ae (m.)','pirata'],['poeta, -ae (m.)','poeta'],
  ['aspera','aspra'],['bona','buona'],['fessa','stanca'],['fida','fedele, fidata'],['honesta','onorevole, onesta'],['infida','sleale, infedele'],['ingrata','sgradita, ingrata'],['laeta','felice'],['longa','lunga'],['magna','grande'],['mira','straordinaria'],['misera','infelice'],['multa','molta'],['parva','piccola'],['pauca','poca'],['prava','cattiva'],['proba','buona, onesta'],['pulchra','bella'],['sedula','diligente'],['sollicita','preoccupata'],['stulta','sciocca'],
  ['ego','io'],['tu','tu'],['nos','noi'],['vos','voi'],['apud','presso, vicino'],['in','in'],['infra, sub','sotto'],['super, supra','su, sopra'],['autem','ma, invece'],['nam','infatti'],['nec','né, e non'],['nunc','ora'],['non','non'],['saepe','spesso'],['sed','ma'],['ita','così']
 ];
const PERS=['I sing.','II sing.','III sing.','I plur.','II plur.','III plur.'];
const PERSF=['io','tu','egli','noi','voi','essi'];
const coniuga=(tema,des)=>[[tema[0]+des[0]],[tema[1]+des[1]],[tema[2]+des[2]],[tema[3]+des[3]],[tema[4]+des[4]],[tema[5]+des[5]]];
const vgrid=(id,q,forme)=>({k:'grid',id,q,rl:PERSF,cols:['Forma latina'],a:forme.map(f=>[[f]])});
const CONI=[['I','I coniugazione'],['II','II coniugazione'],['III','III coniugazione'],['IV','IV coniugazione'],['M','Mista (verbi in -io)']];
const PO=['I persona singolare','II persona singolare','III persona singolare','I persona plurale','II persona plurale','III persona plurale'];
const pe=(id,forma,i,why)=>ch(id,'<span class="latin">'+forma+'</span>: che persona è?',PO,i,why);

const blocchi=[
/* ---------- PARTE 1: le lacune ---------- */
{id:'app',title:'Apposizione: stesso caso, sempre',tag:'Lacuna · ragionamento',goal:'Nel primo ripasso l\'apposizione è stata sbagliata tre volte. Regola: l\'apposizione va nello STESSO CASO del nome a cui si riferisce, ma tiene il suo genere e il suo numero. Prima di rispondere chiediti: in che caso è il nome accanto?',items:[
 ch('app1','La regola dell\'apposizione in latino è:',['Va sempre al nominativo','Va nello stesso caso del nome a cui si riferisce, ma mantiene il suo genere e numero','Concorda in caso, genere e numero, come un aggettivo'],1,'Athenae (plurale), patria (singolare): stesso caso, numero diverso.'),
 ch('app2','"Ammiro Diana, figlia di Latona." Dianam è accusativo, quindi…',['Dianam, filia Latonae','Dianam, filiam Latonae','Dianam, filiae Latonae'],1,'Dianam è complemento oggetto (accusativo): anche filia va in accusativo, filiam.'),
 ch('app3','"Do una rosa a Giulia, maestra diligente." Iuliae è dativo, quindi…',['Iuliae, magistrae sedulae','Iuliae, magistra sedula','Iuliam, magistram sedulam'],0,'Complemento di termine: dativo per il nome, l\'apposizione e il suo aggettivo.'),
 ch('app4','"Le ninfe lodano Diana, padrona delle fiere."',['Nymphae Dianam, domina ferarum, laudant','Nymphae Dianam, dominam ferarum, laudant','Nymphae Dianae, dominae ferarum, laudant'],1,''),
 ch('app5','"Siracusa, patria dei poeti, è in Sicilia." (Syracusae è plurale tantum)',['Syracusae, patriae poetarum, in Sicilia sunt','Syracusae, patria poetarum, in Sicilia sunt','Syracusa, patria poetarum, in Sicilia est'],1,'Syracusae è plurale (sunt), patria resta singolare: stesso caso (nominativo), numero suo.'),
 ch('app6','"Le ancelle temono la tempesta, rovina delle isole."',['Ancillae procellam, insularum ruina, timent','Ancillae procellam, insularum ruinam, timent','Ancillae procellam, insularum ruinae, timent'],1,'procellam è accusativo, quindi anche ruinam.'),
 cs('app7','"Atene, <b>patria</b> della sapienza, è in Grecia." Patria va in…','nom','Atene è soggetto, quindi l\'apposizione va al nominativo.'),
 {k:'text',id:'app8',q:'Scrivi in latino nome e apposizione nel caso giusto (senza virgole va bene):',rows:[['a Diana, dea dei boschi (dativo)',['Dianae deae silvarum','Dianae silvarum deae']],['Minerva, dea della sapienza (compl. oggetto)',['Minervam deam sapientiae','Minervam sapientiae deam']],['Atene, patria dei poeti (soggetto)',['Athenae patria poetarum','Athenae poetarum patria']]]}
]},
{id:'dpo',title:'Dativo di possesso: scriverlo tu',tag:'Lacuna · ragionamento',goal:'Lo riconosci bene, ora devi saperlo scrivere. Tre passi fissi: 1) chi possiede va in DATIVO; 2) la cosa posseduta va in NOMINATIVO; 3) sum concorda con la cosa posseduta (est se è una, sunt se sono più).',items:[
 {k:'text',id:'dpo1',q:'"La maestra ha una figlia diligente." Costruiscila un pezzo alla volta:',rows:[['1) possessore in dativo',['magistrae']],['2) cosa posseduta in nominativo',both('sedula','filia')],['3) verbo sum concordato',['est']]]},
 {k:'text',id:'dpo2',q:'"I marinai hanno molte preoccupazioni."',rows:[['1) possessore in dativo',['nautis']],['2) cosa posseduta in nominativo',both('multae','curae')],['3) verbo sum concordato',['sunt']]]},
 {k:'text',id:'dpo3',q:'"Diana ha molte frecce."',rows:[['1) possessore in dativo',['dianae']],['2) cosa posseduta in nominativo',both('multae','sagittae')],['3) verbo sum concordato',['sunt']]]},
 ch('dpo4','"Le ninfe hanno un bosco sacro."',['Nymphae sacram silvam sunt','Nymphis sacra silva est','Nymphis sacrae silvae sunt'],1,'Nymphis dativo (possessori), sacra silva nominativo, est singolare perché il bosco è uno.'),
 ch('dpo5','"La padrona ha molte ancelle."',['Dominae multae ancillae sunt','Domina multas ancillas est','Dominae multas ancillas sunt'],0,''),
 ch('dpo6','"Il contadino ha una piccola fattoria." Dove sbaglia questa frase: <span class="latin">Agricola parva villa est</span>?',['Non ha errori','Agricola deve andare in dativo: Agricolae parva villa est','Villa deve andare in accusativo'],1,'Senza dativo la frase dice "il contadino è una piccola fattoria".'),
 ch('dpo7','<span class="latin">Poetae magna fama est.</span>',['Il poeta è una grande fama','Il poeta ha una grande fama','La fama del poeta è grande'],1,'Va bene anche "la fama del poeta è grande" come senso, ma la traduzione con "avere" è quella che chiede il libro.')
]},
{id:'ita',title:'Dall\'italiano al caso latino (bis)',tag:'Lacuna · ragionamento',goal:'Nel primo giro: 64% dicendo "lo so". Per ogni parola in grassetto di\' a voce: "è un… (soggetto, parte nominale, apposizione…), quindi va in…". Attenzione a parte nominale (nominativo) e vocativo.',items:[
 cs('itb1','Diana è <b>casta</b>.','nom','Parte nominale: nominativo, come il soggetto.'),
 cs('itb2','<b>Ninfe</b>, venite!','voc','Si chiama qualcuno: vocativo (uguale al nominativo, nymphae).'),
 cs('itb3','Le ninfe sono <b>ancelle</b> di Diana.','nom','Parte nominale (un sostantivo): nominativo.'),
 cs('itb4','Ammiriamo Minerva, <b>dea</b> della sapienza.','acc','Apposizione di Minervam (accusativo).'),
 cs('itb5','"La maestra ha una figlia." Con il dativo di possesso, <b>la maestra</b> va in…','dat','Il possessore va in dativo.'),
 cs('itb6','Do una rosa a Giulia, <b>maestra</b> diligente.','dat','Apposizione di Iuliae (dativo).'),
 cs('itb7','Le ancelle lodano <b>la padrona</b>.','acc','Complemento oggetto.'),
 cs('itb8','Le rose <b>delle ninfe</b> sono belle.','gen','Specificazione.'),
 cs('itb9','Diana caccia <b>con le frecce</b>.','abl','Mezzo: ablativo.'),
 cs('itb10','<b>Diana</b> caccia nel bosco.','nom','Soggetto.'),
 cs('itb11','La vita dei marinai è <b>dura</b> (aspera).','nom','Parte nominale: nominativo.'),
 cs('itb12','<b>Maestra</b>, ascolta!','voc','')
]},
{id:'acc',title:'Quantità, sillabe e accento',tag:'Lacuna · memoria + ragionamento',goal:'Qui avevi invertito due regole. Imparale come una coppia: vocale PRIMA di vocale è BREVE; vocale prima di DUE consonanti è LUNGA. Poi le tre leggi dell\'accento.',items:[
 ch('acc1','Una vocale seguita da un\'altra vocale è…',['Breve','Lunga'],0,'Esempio: facio, victoria (ri breve).'),
 ch('acc2','Una vocale seguita da due o più consonanti è…',['Breve','Lunga, perché la sillaba è chiusa'],1,'Esempio: dāmno, magistra (gis lunga).'),
 ch('acc3','Il dittongo è…',['Sempre lungo','Sempre breve','Dipende'],0,''),
 ch('acc4','Legge della baritonesi:',['L\'accento cade sempre sulla penultima','L\'accento non cade mai sull\'ultima sillaba','L\'accento non risale oltre la terzultima'],1,'Baritone = parole non accentate sull\'ultima.'),
 ch('acc5','Legge del trisillabismo:',['L\'accento non risale oltre la terzultima','Le parole hanno tre sillabe'],0,''),
 ch('acc6','Legge della penultima:',['Penultima lunga: accento lì; penultima breve: accento sulla terzultima','Penultima breve: accento lì'],0,''),
 ch('acc7','Come si divide <span class="latin">lingua</span>?',['lin-gu-a','lin-gua'],1,'La u dopo ng (e dopo q) non conta come vocale.'),
 ch('acc8','<span class="latin">puella</span> (pu-el-la):',['pùella','puèlla','puellà'],1,'La penultima el è chiusa (seguita da due consonanti, l-l): lunga, prende l\'accento.'),
 ch('acc9','<span class="latin">sagitta</span> (sa-git-ta):',['sàgitta','sagìtta'],1,'git è chiusa: lunga.'),
 ch('acc10','<span class="latin">insŭla</span> (in-su-la):',['ìnsula','insùla'],0,'Penultima breve: l\'accento risale alla terzultima.'),
 ch('acc11','<span class="latin">pecunia</span> (pe-cu-ni-a):',['pecunìa','pecùnia','pècunia'],1,'ni è breve (vocale davanti a vocale): l\'accento va su cu.'),
 ch('acc12','<span class="latin">patria</span> (pa-tri-a):',['pàtria','patrìa'],0,'tri è breve (vocale davanti a vocale): accento sulla terzultima.'),
 ch('acc13','<span class="latin">Diāna</span> (Di-a-na):',['Dìana','Diàna'],1,'Penultima lunga.'),
 ch('acc14','<span class="latin">silvārum</span>:',['sìlvarum','silvàrum'],1,'Il genitivo plurale ha la ā lunga: silvàrum, puellàrum.')
]},
{id:'trp',title:'Le trappole',tag:'Lacuna · memoria',goal:'Piccoli errori del primo ripasso. Sono proprio quelli che costano punti in verifica.',items:[
 {k:'text',id:'trp1',q:'Scrivi:',rows:[['infinito di sum ("essere")',['esse']],['"a Tebe" (Thebae, -arum)',['thebis']],['"a Roma"',['romae']],['genitivo plurale di epistula',['epistularum']]]},
 ch('trp2','Sul dizionario trovi <span class="latin">sagitta, -ae</span>. <i>-ae</i> indica…',['Il nominativo plurale','Il genitivo singolare'],1,'Nome al nominativo, poi la terminazione del genitivo singolare: così riconosci la declinazione.'),
 ch('trp3','Sul dizionario l\'aggettivo "buono" si trova come…',['bona','bonus, -a, -um'],1,'Si parte dal maschile -us.'),
 ch('trp4','<span class="latin">Fessa nauta</span> è corretto per "il marinaio stanco"?',['Sì, finiscono entrambi in -a','No: fessa è femminile, nauta è maschile'],1,'Gli aggettivi in -a che hai studiato vanno solo con nomi femminili.'),
 ch('trp5','"Siamo a Tebe" (Thebae, -arum)',['In Thebis sumus','Thebis sumus','Thebae sumus'],1,'Città plurale della I: ablativo semplice, SENZA in.'),
 ch('trp6','"Atene è grande"',['Athenae magna est','Athenae magnae sunt'],1,'Plurale tantum: verbo e aggettivo al plurale.'),
 ch('trp7','"Siate oneste, figlie!": <i>probae</i> significa…',['sagge','oneste, buone'],1,'proba = buona, onesta; saggezza è prudentia.')
]},
/* ---------- PARTE 2: il nuovo (pp. 37-43) ---------- */
{id:'con',title:'Le quattro coniugazioni e l\'infinito',tag:'Nuovo · memoria',goal:'Pagina 42. La coniugazione si riconosce dall\'infinito presente attivo (e per la mista anche dalla I persona). Togliendo -re all\'infinito ottieni il tema del presente.',items:[
 ch('con1','Quante sono le coniugazioni latine?',['Tre, come in italiano','Quattro, più la coniugazione mista','Cinque'],1,''),
 ch('con2','Da che cosa si riconosce la coniugazione di un verbo?',['Dalla terminazione dell\'infinito presente attivo','Dalla desinenza della III persona plurale','Dal significato'],0,''),
 ch('con3','Che differenza c\'è tra II e III coniugazione?',['Nessuna','La vocale tematica: ē lunga nella II (monēre), ĕ breve nella III (legĕre)','La II finisce in -ire'],1,'Per questo sul dizionario le quantità sono importanti: monère, ma lègere.'),
 {k:'select',id:'con4',q:'A quale coniugazione appartiene?',opts:CONI,rows:[['laudo, laudāre','I'],['moneo, monēre','II'],['lego, legĕre','III'],['audio, audīre','IV'],['capio, capĕre','M'],['amo, amāre','I'],['video, vidēre','II'],['vivo, vivĕre','III'],['venio, venīre','IV'],['fugio, fugĕre','M'],['taceo, tacēre','II'],['punio, punīre','IV']]},
 {k:'text',id:'con5',q:'Scrivi il tema del presente (infinito senza -re):',rows:[['laudare',['lauda']],['monere',['mone']],['legere',['lege']],['audire',['audi']],['amare',['ama']],['videre',['vide']]]},
 ch('con6','Come si forma l\'indicativo presente attivo?',['Tema del presente + desinenze personali attive','Radice + -re','Infinito + desinenze'],0,'laudā- + -tis = laudatis.'),
 ch('con7','I verbi in -io della coniugazione mista hanno…',['L\'infinito in -īre come la IV','L\'infinito in -ĕre come la III, ma la I persona singolare in -io come la IV','La I persona in -o'],1,'capio, capĕre; fugio, fugĕre.')
]},
{id:'des',title:'Le desinenze personali attive',tag:'Nuovo · memoria',goal:'Sono sei e valgono per tutte le coniugazioni. Ripetile ad alta voce come una filastrocca: -o, -s, -t, -mus, -tis, -nt.',items:[
 {k:'text',id:'des1',q:'Scrivi la desinenza (il trattino non serve):',rows:[['I persona singolare (io)',['o','-o']],['II persona singolare (tu)',['s','-s']],['III persona singolare (egli)',['t','-t']],['I persona plurale (noi)',['mus','-mus']],['II persona plurale (voi)',['tis','-tis']],['III persona plurale (essi)',['nt','-nt']]]},
 ch('des2','Le desinenze personali sono…',['Diverse per ogni coniugazione','Identiche per tutte le coniugazioni'],1,''),
 ch('des3','Nella forma <span class="latin">laudatis</span>, <i>-tis</i> è…',['La radice','La vocale tematica','La desinenza personale (voi)'],2,'laud- radice, -a- vocale tematica, -tis desinenza.')
]},
{id:'mod',title:'I cinque modelli: laudo, moneo, lego, audio, capio',tag:'Nuovo · memoria',goal:'Scrivi l\'indicativo presente completo. Attenzione alle forme speciali: laudo (non laudao), legunt, audiunt, capiunt.',items:[
 vgrid('mod1','<span class="latin">laudare</span> (lodare), I coniugazione',['laudo','laudas','laudat','laudamus','laudatis','laudant']),
 vgrid('mod2','<span class="latin">monere</span> (ammonire), II coniugazione',['moneo','mones','monet','monemus','monetis','monent']),
 vgrid('mod3','<span class="latin">legere</span> (leggere), III coniugazione',['lego','legis','legit','legimus','legitis','legunt']),
 vgrid('mod4','<span class="latin">audire</span> (ascoltare), IV coniugazione',['audio','audis','audit','audimus','auditis','audiunt']),
 vgrid('mod5','<span class="latin">capere</span> (prendere), coniugazione mista',['capio','capis','capit','capimus','capitis','capiunt'])
]},
{id:'apl',title:'Applica i modelli a verbi nuovi',tag:'Nuovo · ragionamento',goal:'Riconosci la coniugazione, scegli il modello giusto e coniuga. È il ragionamento che serve in verifica.',items:[
 vgrid('apl1','<span class="latin">amo, amare</span> (amare)',['amo','amas','amat','amamus','amatis','amant']),
 vgrid('apl2','<span class="latin">video, videre</span> (vedere)',['video','vides','videt','videmus','videtis','vident']),
 vgrid('apl3','<span class="latin">vivo, vivere</span> (vivere), III',['vivo','vivis','vivit','vivimus','vivitis','vivunt']),
 vgrid('apl4','<span class="latin">venio, venire</span> (venire)',['venio','venis','venit','venimus','venitis','veniunt']),
 vgrid('apl5','<span class="latin">fugio, fugere</span> (fuggire), mista',['fugio','fugis','fugit','fugimus','fugitis','fugiunt'])
]},
{id:'rif',title:'Riconosci la forma verbale',tag:'Nuovo · ragionamento',goal:'Guarda la desinenza, poi la vocale prima. Di\' a voce: "-nt, quindi III plurale…".',items:[
 pe('rif1','monetis',4,'-tis: voi.'),
 pe('rif2','legunt',5,'-nt: essi. Nella III la vocale tematica diventa u.'),
 pe('rif3','audio',0,''),
 pe('rif4','capimus',3,''),
 pe('rif5','vides',1,''),
 pe('rif6','laudat',2,''),
 ch('rif7','Perché <span class="latin">laudo</span> e non <i>laudao</i>?',['È un\'eccezione da imparare a memoria','La vocale tematica a si è "contratta" con la desinenza -o','Perché è la II coniugazione'],1,''),
 ch('rif8','Nella III coniugazione, alla III persona plurale la vocale tematica diventa…',['i (legint)','u (legunt)','e (legent)'],1,''),
 ch('rif9','In quali verbi si aggiunge una u tra tema e desinenza alla III plurale (-iunt)?',['Nei verbi della I coniugazione','Nei verbi della IV coniugazione e in quelli in -io (audiunt, capiunt)','In tutti'],1,''),
 ch('rif10','<span class="latin">Nymphae Dianam invocant</span>',['La ninfa invoca Diana','Le ninfe invocano Diana','Diana invoca le ninfe'],1,'Nymphae soggetto plurale, Dianam oggetto, invocant III plurale.'),
 ch('rif11','<span class="latin">Puella rosas Dianae praebet</span> (praebeo, -ēre: offrire)',['La ragazza offre rose a Diana','Le ragazze offrono le rose di Diana','La ragazza offre la rosa di Diana'],0,'Dianae qui è dativo (termine): lo dice il contesto.'),
 ch('rif12','<span class="latin">Diana sagittas capit</span>',['Diana prende le frecce','Diana scaglia le frecce','Diana prende la freccia'],0,'')
]},
{id:'lx2',title:'Lessico nuovo: verbi e parole di Diana',tag:'Nuovo · memoria',goal:'Leggi, di\' il significato ad alta voce, gira la carta. Per i verbi di\' anche la coniugazione.',items:[
 {k:'flash',id:'lx2',deck:[
  ['laudo, laudāre (I)','lodare'],['moneo, monēre (II)','ammonire, avvisare'],['lego, legĕre (III)','leggere'],['audio, audīre (IV)','ascoltare, sentire'],['capio, capĕre (mista)','prendere'],['amo, amāre (I)','amare'],['video, vidēre (II)','vedere'],['vivo, vivĕre (III)','vivere'],['fugio, fugĕre (mista)','fuggire'],['voco, vocāre (I)','chiamare'],['invoco, invocāre (I)','invocare'],['orno, ornāre (I)','ornare, adornare'],['praebeo, praebēre (II)','offrire'],['taceo, tacēre (II)','tacere'],['teneo, tenēre (II)','tenere'],['venio, venīre (IV)','venire'],['sedeo, sedēre (II)','sedere'],['specto, spectāre (I)','guardare'],['punio, punīre (IV)','punire'],['splendeo, splendēre (II)','splendere'],['cogito, cogitāre (I)','pensare'],
  ['cerva, -ae','cerva'],['fera, -ae','fiera, bestia feroce'],['sagitta, -ae','freccia'],['luna, -ae','luna'],['ira, -ae','ira'],['praeda, -ae','preda'],['nympha, -ae','ninfa'],['unda, -ae','onda, acqua'],['herba, -ae','erba'],['aura, -ae','brezza, aria']
 ]}
]},
{id:'dia',title:'Diana: carta d\'identità',tag:'Nuovo · cultura',goal:'Pagina 40. Come per Minerva: la prof può chiederla in verifica o all\'orale.',items:[
 ch('dia1','Diana corrisponde alla dea greca…',['Atena','Artemide','Era'],1,''),
 ch('dia2','I genitori di Diana sono…',['Giove e Latona','Giove e Giunone','Apollo e Latona'],0,''),
 ch('dia3','Il fratello gemello di Diana è…',['Marte','Apollo','Mercurio'],1,'Apollo rappresenta il sole, Diana la luna.'),
 ch('dia4','Diana è nata…',['A Delo, sull\'altura del Cinto','Ad Atene','A Roma'],0,'Da qui il nome Cinzia.'),
 ch('dia5','Diana è una dea "triforme" perché…',['Ha tre teste','Cambia nome e funzione: luna in cielo, cacciatrice sulla terra, Ecate negli inferi','Ha tre templi'],1,''),
 ch('dia6','I suoi segni particolari sono…',['Civetta, lancia, egida','Arco, faretra, cerva, cani, falce di luna','Tridente e cavallo'],1,'Civetta, lancia ed egida sono di Minerva: non confonderle.'),
 ch('dia7','Atteone, che la vide mentre si bagnava, fu…',['Trasformato in cervo','Trasformato in ragno','Perdonato'],0,'Nel fumetto: "Forma tua mutatur! Ecce, praeda es".'),
 ch('dia8','Niobe, che insultò Latona, fu punita con…',['La morte delle sue sei figlie, colpite dalle frecce di Diana','La trasformazione in albero','L\'esilio'],0,'Le frecce di Diana non mancano mai il bersaglio.'),
 ch('dia9','I luoghi di culto di Diana sono…',['Atene, Roma, Troia','Delo, Efeso, Ariccia','Delfi e Olimpia'],1,'Il tempio di Efeso era tra le sette meraviglie; ad Ariccia c\'era un santuario con la ninfa Egeria.'),
 ch('dia10','Altri nomi di Diana:',['Pallade, Glaucopide','Delia, Trivia, Lucina, Luna, Cinzia, Ecate'],1,'Pallade e Glaucopide sono nomi di Minerva.')
]},
/* ---------- PARTE 3: il giro completo ---------- */
{id:'gir',title:'Giro completo: tutto il programma',tag:'Ripasso generale',goal:'Una domanda per ogni argomento già studiato, in forma nuova. Se una ti fa esitare, segnatela e ripassa la scheda.',items:[
 ch('gir1','Il latino è una lingua sintetica perché…',['Esprime le funzioni logiche con le terminazioni','Ha poche parole'],0,''),
 ch('gir2','Il complemento di vocazione va in…',['Nominativo','Vocativo','Dativo'],1,''),
 ch('gir3','Il complemento partitivo va in…',['Genitivo','Ablativo'],0,''),
 {k:'multi',id:'gir4',form:'puellae',a:['Gs','Ds','Np','Vp']},
 {k:'multi',id:'gir5',form:'insulis',a:['Dp','Abp']},
 ch('gir6','"Presso la porta"',['apud portā','apud portam','in portam'],1,'apud + accusativo.'),
 ch('gir7','"Sotto la tavola" (sub)',['sub mensā','sub mensam'],0,'sub + ablativo.'),
 ch('gir8','"Sopra la terra" (supra)',['supra terram','supra terrā'],0,'supra + accusativo.'),
 ch('gir9','"A Capua" (Capua, -ae)',['in Capuā','Capuae','Capuis'],1,'Città singolare della I: locativo.'),
 ch('gir10','<span class="latin">copiae, -arum</span>',['copie','truppe','abbondanza'],1,''),
 ch('gir11','<span class="latin">vigiliae, -arum</span>',['sentinelle','vigilie'],0,''),
 ch('gir12','<span class="latin">nuptiae, -arum</span>',['nozze','notti'],0,''),
 ch('gir13','"Siete diligenti, ragazze"',['Sedulae estis, puellae','Sedulae este, puellae','Sedula es, puella'],0,'estis: indicativo (siete); este: imperativo (siate).'),
 ch('gir14','Pronuncia ecclesiastica: <span class="latin">sapientia</span>',['sapièntia','sapiènzia'],1,'ti + vocale non accentato e non dopo s, x, y: zi.'),
 ch('gir15','Il perfetto latino corrisponde a…',['Passato remoto, passato prossimo, trapassato remoto','Imperfetto'],0,''),
 ch('gir16','Quale modo manca in latino?',['Congiuntivo','Condizionale'],1,''),
 ch('gir17','I verbi deponenti hanno…',['Forma passiva e significato attivo','Forma attiva e significato passivo'],0,''),
 ch('gir18','Minerva corrisponde alla dea greca…',['Artemide','Atena'],1,'Simboli: civetta, lancia, egida, elmo.'),
 ch('gir19','<span class="latin">pater familias</span>: familias è…',['Un genitivo arcaico','Un accusativo plurale'],0,''),
 ch('gir20','<span class="latin">non tantum… sed etiam</span>',['non solo… ma anche','né… né'],0,'')
]},
{id:'tr2',title:'Traduci (con verbi)',tag:'Ripasso generale · ragionamento',goal:'Scrivi la traduzione. Poi, dopo aver visto la soluzione, NON dirti "più o meno giusta": tocca solo i punti che hai fatto davvero giusti. Papà vedrà la tua frase e potrà correggerla.',items:[
 {k:'open',id:'tv1',src:'Nymphae in silva Dianam laudant.',model:'Le ninfe nel bosco lodano Diana.',checks:['Nymphae soggetto (nominativo plurale)','Dianam complemento oggetto','in silva stato in luogo','laudant: "lodano" (III plurale)']},
 {k:'open',id:'tv2',src:'Dianae, deae silvarum, multae sagittae sunt.',model:'Diana, dea dei boschi, ha molte frecce.',checks:['Dativo di possesso: Diana diventa soggetto','sunt tradotto con "ha"','deae silvarum: apposizione "dea dei boschi"','multae sagittae: complemento oggetto "molte frecce"']},
 {k:'open',id:'tv3',src:'Puellae Minervae aras rosis ornant.',model:'Le ragazze adornano con rose gli altari di Minerva.',checks:['Puellae soggetto','aras complemento oggetto','Minervae genitivo "di Minerva"','rosis ablativo di mezzo "con rose"','ornant: "adornano"']},
 {k:'open',id:'tv4',src:'Agricolae in villa vivunt et silvam amant.',model:'I contadini vivono nella fattoria e amano il bosco.',checks:['Agricolae soggetto plurale','in villa stato in luogo','vivunt e amant: III plurale']},
 {k:'open',id:'tv5',src:'Syracusis multas aras videmus.',model:'A Siracusa vediamo molti altari.',checks:['Syracusis: "a Siracusa" (ablativo, città plurale)','videmus: "vediamo"','multas aras complemento oggetto']},
 {k:'open',id:'tv6',src:'Diana praedam capit, nam cerva in silva est.',model:'Diana prende la preda, infatti la cerva è nel bosco.',checks:['capit: "prende"','nam: "infatti"','in silva est: "è nel bosco"']},
 {k:'open',id:'tv7',src:'Apud aram Dianae nymphae sedent et tacent.',model:'Presso l\'altare di Diana le ninfe siedono e tacciono.',checks:['apud aram: "presso l\'altare"','Dianae genitivo "di Diana"','sedent et tacent: III plurale']},
 {k:'open',id:'tv8',src:'Le ancelle hanno una padrona onesta.',model:'Ancillis proba domina est.',toLat:true,checks:['Ancillis in dativo (possessori)','proba domina al nominativo','est singolare (concorda con domina)']},
 {k:'open',id:'tv9',src:'Lodiamo Minerva, dea della sapienza.',model:'Minervam, deam sapientiae, laudamus.',toLat:true,checks:['Minervam accusativo','deam accusativo (apposizione)','sapientiae genitivo','laudamus I plurale']},
 {k:'open',id:'tv10',src:'A Roma le ragazze leggono lunghe lettere.',model:'Romae puellae longas epistulas legunt.',toLat:true,checks:['Romae locativo (senza in)','longas epistulas accusativo plurale','legunt (con la u)']},
 {k:'open',id:'tv11',src:'Diana ha una cerva e molte frecce.',model:'Dianae cerva et multae sagittae sunt.',toLat:true,checks:['Dianae dativo (possessore)','cerva e sagittae al nominativo','sunt plurale (le cose possedute sono più di una)']},
 {k:'open',id:'tv12',src:'Atene, patria dei poeti, è grande.',model:'Athenae, patria poetarum, magnae sunt.',toLat:true,checks:['Athenae nominativo plurale','patria nominativo SINGOLARE (apposizione)','magnae sunt al plurale']},
 {k:'open',id:'tv13',src:'Le ninfe ascoltano Diana nel bosco.',model:'Nymphae in silva Dianam audiunt.',toLat:true,checks:['Dianam accusativo','in silva ablativo','audiunt (con -iunt)']}
]}
];

const orale=[
 ['Che cos\'è l\'apposizione e come si comporta in latino? Fammi un esempio.','Un sostantivo che si riferisce a un altro sostantivo e lo specifica. In latino va nello stesso caso del nome a cui si riferisce, ma mantiene il suo genere e numero: Athenae, patria poetarum, in Graecia sunt.'],
 ['Traduci in latino "La maestra ha una figlia diligente" e spiega i passaggi.','Magistrae sedula filia est. Possessore in dativo (magistrae), cosa posseduta in nominativo (sedula filia), sum concordato con la cosa posseduta (est).'],
 ['Quando una vocale è breve e quando è lunga? Dimmi le tre leggi dell\'accento.','Vocale davanti a vocale: breve. Vocale davanti a due consonanti: lunga (sillaba chiusa). Dittongo: lungo. Baritonesi: mai sull\'ultima. Trisillabismo: mai oltre la terzultima. Penultima: se lunga prende l\'accento, se breve va sulla terzultima.'],
 ['Quante sono le coniugazioni e come le riconosci?','Quattro più la mista, dall\'infinito presente attivo: -āre (laudare), -ēre (monere), -ĕre (legere), -īre (audire). La mista ha infinito in -ĕre ma la I persona in -io (capio, capere).'],
 ['Che cos\'è il tema del presente e come si forma l\'indicativo presente?','Si toglie -re all\'infinito (laudā-, monē-, legĕ-, audī-). Indicativo presente = tema del presente + desinenze personali attive.'],
 ['Dimmi le desinenze personali attive.','-o, -s, -t, -mus, -tis, -nt. Sono uguali per tutte le coniugazioni.'],
 ['Coniuga a voce l\'indicativo presente di legere e di audire.','lego, legis, legit, legimus, legitis, legunt; audio, audis, audit, audimus, auditis, audiunt.'],
 ['Quali sono le tre particolarità dell\'indicativo presente?','I persona singolare della I coniugazione: la vocale tematica si contrae (laudo). III plurale della III: la vocale tematica diventa u (legunt). III plurale della IV e dei verbi in -io: si aggiunge u (audiunt, capiunt).'],
 ['Che cosa sono i verbi in -io della coniugazione mista? Fammi un esempio.','Verbi con infinito in -ĕre come la III, ma con la vocale -i- mantenuta in alcune forme come la IV: capio, capis, capit, capimus, capitis, capiunt. Anche fugio, fugere.'],
 ['Raccontami Diana: carta d\'identità.','Artemide per i Greci. Figlia di Giove e Latona, gemella di Apollo, nata a Delo sul monte Cinto. Dea cacciatrice, lunare e infernale (triforme: luna, cacciatrice, Ecate). Simboli: arco, faretra, cerva, cani, falce di luna. Culto a Delo, Efeso, Ariccia. Altri nomi: Delia, Trivia, Lucina, Luna, Cinzia, Ecate. Miti: Atteone trasformato in cervo, le sei figlie di Niobe uccise dalle sue frecce.'],
 ['Elenca i sei casi e la funzione principale di ciascuno.','Nominativo: soggetto, parte nominale. Genitivo: specificazione, partitivo. Dativo: termine, vantaggio, possessore. Accusativo: oggetto. Vocativo: vocazione. Ablativo: mezzo, modo, causa; stato in luogo con in.'],
 ['Come si esprime lo stato in luogo? Tutte le eccezioni.','In + ablativo. Città singolari della I: locativo in -ae (Romae). Città plurali: ablativo semplice (Athenis). domi militiaeque. apud + accusativo; sub, super + ablativo; supra, infra + accusativo.'],
 ['Pluralia tantum e nomi che cambiano significato al plurale.','divitiae, epulae, indutiae, insidiae, nuptiae, minae, angustiae, deliciae, Kalendae, Athenae, Syracusae, Thebae. copia/copiae, littera/litterae, opera/operae, vigilia/vigiliae.'],
 ['Raccontami Minerva.','Atena, Pallade, Glaucopide. Figlia di Giove e Metis, nata armata dalla testa del padre. Dea della sapienza, delle arti e della guerra. Civetta, lancia, egida, elmo. Ulivo contro Poseidone. Campidoglio con Giove e Giunone.']
];

const schedeNuove=
 '<div class="sheet" style="border-color:var(--warn)"><h2>Attenzione: i tuoi errori</h2><ul>'+
 '<li><b>Apposizione</b>: STESSO CASO del nome accanto, ma genere e numero suoi. <i>Dianam, deam silvarum</i> (non dea). <i>Athenae, patria poetarum</i> (non patriae).</li>'+
 '<li><b>Dativo di possesso da scrivere</b>: possessore in dativo + cosa posseduta in nominativo + sum concordato con la cosa. <i>Magistrae sedula filia est.</i></li>'+
 '<li><b>Parte nominale</b> sempre al nominativo (<i>Matrona proba est</i>). <b>Vocativo</b> quando chiami qualcuno (<i>Puellae, venite!</i>).</li>'+
 '<li><b>Quantità</b>: vocale + vocale = breve; vocale + due consonanti = lunga. <b>Baritonesi</b> = mai accento sull\'ultima.</li>'+
 '<li><b>esse</b> è l\'infinito di sum. <b>-ae</b> sul dizionario è il genitivo singolare. Aggettivi: <i>bonus, -a, -um</i>.</li>'+
 '<li><i>Thebis</i> senza in. <i>Athenae magnae sunt</i>: plurale tantum, verbo al plurale. <i>epistularum</i> con la u.</li></ul></div>'+
 '<div class="sheet"><h2>Le quattro coniugazioni</h2><div class="scroll"><table class="t"><thead><tr><th>Coniugazione</th><th>Vocale tematica</th><th>Infinito</th><th>Tema del presente</th></tr></thead><tbody>'+
 '<tr><td>I</td><td>-ā-</td><td><i>laud'+e('āre')+'</i> lodare</td><td><i>laudā-</i></td></tr>'+
 '<tr><td>II</td><td>-ē- (lunga)</td><td><i>mon'+e('ēre')+'</i> ammonire</td><td><i>monē-</i></td></tr>'+
 '<tr><td>III</td><td>-ĕ- (breve)</td><td><i>leg'+e('ĕre')+'</i> leggere</td><td><i>legĕ-</i></td></tr>'+
 '<tr><td>IV</td><td>-ī-</td><td><i>aud'+e('īre')+'</i> ascoltare</td><td><i>audī-</i></td></tr>'+
 '<tr><td>Mista</td><td>-ĭ-</td><td><i>cap'+e('ĕre')+'</i> (capio) prendere</td><td><i>capĭ-</i></td></tr></tbody></table></div>'+
 '<p>Tema del presente = infinito senza -re. Indicativo presente = tema del presente + desinenze personali. Sul dizionario il verbo si cerca alla I persona: <i>laudo, laudas, laudavi, laudatum, laudare</i>.</p></div>'+
 '<div class="sheet"><h2>Desinenze personali attive</h2><div class="scroll"><table class="t"><thead><tr><th></th><th>Singolare</th><th>Plurale</th></tr></thead><tbody><tr><td>I</td><td>'+e('-o')+' (io)</td><td>'+e('-mus')+' (noi)</td></tr><tr><td>II</td><td>'+e('-s')+' (tu)</td><td>'+e('-tis')+' (voi)</td></tr><tr><td>III</td><td>'+e('-t')+' (egli)</td><td>'+e('-nt')+' (essi)</td></tr></tbody></table></div><p>Uguali per tutte le coniugazioni.</p></div>'+
 '<div class="sheet"><h2>Indicativo presente attivo</h2><div class="scroll"><table class="t"><thead><tr><th></th><th>I laudo</th><th>II moneo</th><th>III lego</th><th>IV audio</th><th>Mista capio</th></tr></thead><tbody>'+
 [['io','laud'+e('o'),'mone'+e('o'),'leg'+e('o'),'audi'+e('o'),'capi'+e('o')],['tu','lauda'+e('s'),'mone'+e('s'),'legi'+e('s'),'audi'+e('s'),'capi'+e('s')],['egli','lauda'+e('t'),'mone'+e('t'),'legi'+e('t'),'audi'+e('t'),'capi'+e('t')],['noi','lauda'+e('mus'),'mone'+e('mus'),'legi'+e('mus'),'audi'+e('mus'),'capi'+e('mus')],['voi','lauda'+e('tis'),'mone'+e('tis'),'legi'+e('tis'),'audi'+e('tis'),'capi'+e('tis')],['essi','lauda'+e('nt'),'mone'+e('nt'),'leg<b>u</b>'+e('nt'),'audi<b>u</b>'+e('nt'),'capi<b>u</b>'+e('nt')]].map(r=>'<tr>'+r.map((c,i)=>i?'<td><i>'+c+'</i></td>':'<td>'+c+'</td>').join('')+'</tr>').join('')+
 '</tbody></table></div><h3>Le tre particolarità</h3><ul><li>I persona della I: la vocale tematica si contrae: <i>laudo</i> (non laudao).</li><li>III plurale della III: la vocale tematica diventa u: <i>legunt</i>.</li><li>III plurale della IV e dei verbi in -io: si aggiunge u: <i>audiunt, capiunt</i>.</li></ul><p><b>Verbi in -io</b> (coniugazione mista): infinito in -ĕre come la III, ma mantengono la i come la IV: <i>capio, fugio</i>.</p></div>'+
 '<div class="sheet"><h2>Diana: carta d\'identità</h2><div class="scroll"><table class="t"><tbody><tr><td>Divinità greca</td><td>Artemide</td></tr><tr><td>Detta anche</td><td>Delia, Trivia, Lucina, Luna, Cinzia, Ecate</td></tr><tr><td>Genitori</td><td>Giove e Latona</td></tr><tr><td>Gemello</td><td>Apollo (sole); lei è la luna</td></tr><tr><td>Professione</td><td>dea cacciatrice, lunare e infernale (triforme)</td></tr><tr><td>Segni</td><td>arco, faretra, cerva, cani, falce di luna</td></tr><tr><td>Culto</td><td>Delo, Efeso (tempio tra le sette meraviglie), Ariccia (ninfa Egeria)</td></tr></tbody></table></div><p>Nata a Delo sul monte Cinto. Casta, vive nei boschi con le ninfe. Atteone la vede mentre si bagna e viene trasformato in cervo. Uccide con le sue frecce le sei figlie di Niobe, che aveva insultato Latona.</p></div>'+
 '<div class="sheet"><h2>Lessico nuovo</h2><div class="lex">'+blocchi.find(b=>b.id==='lx2').items[0].deck.map(c=>'<div><i>'+SL.esc(c[0])+'</i> '+SL.esc(c[1])+'</div>').join('')+'</div></div>'+
 '<h2 class="sec">Unità 1 e nozioni preliminari</h2>';

const schede=schedeNuove+  '<div class="sheet"><h2>I casi</h2><div class="scroll"><table class="t"><thead><tr><th>Caso</th><th>Funzioni logiche</th></tr></thead><tbody>'+
  '<tr><td>Nominativo</td><td>soggetto e ciò che si riferisce al soggetto: parte nominale, predicativo del soggetto</td></tr><tr><td>Genitivo</td><td>specificazione, partitivo e altri</td></tr><tr><td>Dativo</td><td>termine, vantaggio e svantaggio (e il possessore nel dativo di possesso)</td></tr><tr><td>Accusativo</td><td>complemento oggetto, predicativo dell\'oggetto</td></tr><tr><td>Vocativo</td><td>vocazione</td></tr><tr><td>Ablativo</td><td>mezzo, modo, causa e altri; stato in luogo con in</td></tr></tbody></table></div><p class="note">Attributi e apposizioni prendono il caso del termine a cui si riferiscono.</p></div>'+
  '<div class="sheet"><h2>La I declinazione</h2><p>Nominativo in -ă, genitivo in -ae. Per lo più femminili; maschili: advena, agricola, conviva, incola, nauta, pirata, poeta.</p><div class="scroll"><table class="t"><thead><tr><th></th><th>Singolare</th><th>Plurale</th></tr></thead><tbody>'+
  [['N.','ă','ae'],['G.','ae','ārum'],['D.','ae','īs'],['Acc.','ăm','ās'],['V.','ă','ae'],['Abl.','ā','īs']].map(r=>'<tr><td>'+r[0]+'</td><td class="latin">sententi'+e(r[1])+' aequ'+e(r[1])+'</td><td class="latin">sententi'+e(r[2])+' aequ'+e(r[2])+'</td></tr>').join('')+
  '</tbody></table></div><h3>Terminazioni uguali</h3><ul><li>'+e('-ă')+': nominativo e vocativo singolare</li><li>'+e('-ae')+': genitivo e dativo singolare, nominativo e vocativo plurale</li><li>'+e('-īs')+': dativo e ablativo plurale</li></ul><p>Decide il contesto. Il vocativo è sempre uguale al nominativo.</p><p>Aggettivi femminili in -a (dizionario: bonus, -a, -um): concordano in genere, numero e caso. Sono solo femminili: <i>fessa ancilla et nauta</i>, fessa va solo con ancilla.</p></div>'+
  '<div class="sheet"><h2>Il verbo sum</h2><div class="scroll"><table class="t"><thead><tr><th></th><th>Singolare</th><th>Plurale</th></tr></thead><tbody><tr><td>I</td><td><i>sum</i> io sono</td><td><i>sumus</i> noi siamo</td></tr><tr><td>II</td><td><i>es</i> tu sei</td><td><i>estis</i> voi siete</td></tr><tr><td>III</td><td><i>est</i> egli è</td><td><i>sunt</i> essi sono</td></tr><tr><td>Imperativo</td><td><i>es</i> sii</td><td><i>este</i> siate</td></tr></tbody></table></div><p>Infinito: <i>esse</i>. Sul dizionario cerchi <i>sum</i>.</p><ul><li>Predicato verbale: "si trova, esiste" (In Italiā sum).</li><li>Copula: con la parte nominale in nominativo. Aggettivo: concorda in caso, genere e numero (Matrona proba est). Sostantivo: solo nel caso (Piratae insularum ruina sunt).</li></ul></div>'+
  '<div class="sheet"><h2>Stato in luogo</h2><ul><li>Regola: <b>in + ablativo</b> (in silvā, in insulīs)</li><li>Città singolari della I: <b>locativo in -ae</b> (Romae, Ravennae)</li><li><i>domi militiaeque</i>: in pace e in guerra</li><li>Città plurali della I: <b>ablativo semplice</b> (Athenis, Syracusis)</li><li><b>apud</b> + accusativo (apud aram)</li><li><b>sub, super</b> + ablativo (sub sellā, super comā)</li><li><b>supra, infra</b> + accusativo (supra terram, infra undas)</li></ul><p class="note">Con il genitivo, in latino si mette spesso tra preposizione e nome: apud Minervae aram.</p></div>'+
  '<div class="sheet"><h2>Particolarità della I</h2><h3>Solo plurali (pluralia tantum)</h3><p class="latin">angustiae luoghi stretti, difficoltà · deliciae delizia, gioia · divitiae ricchezza · epulae vivande, banchetto · indutiae tregua · insidiae insidia · Kalendae Calende · minae minaccia · nuptiae nozze · Athenae Atene · Syracusae Siracusa · Thebae Tebe</p><p>Concordano al plurale: Athenae magnae sunt, Atene è grande.</p><h3>Significato diverso</h3><div class="scroll"><table class="t"><thead><tr><th>Singolare</th><th>Plurale</th></tr></thead><tbody><tr><td><i>copia</i> abbondanza</td><td><i>copiae</i> truppe</td></tr><tr><td><i>littera</i> lettera dell\'alfabeto</td><td><i>litterae</i> lettera (epistola), letteratura</td></tr><tr><td><i>opera</i> opera, lavoro, attività</td><td><i>operae</i> operai, manodopera</td></tr><tr><td><i>vigilia</i> turno di guardia</td><td><i>vigiliae</i> sentinelle</td></tr></tbody></table></div><p><i>familias</i>: genitivo arcaico in -as, solo in pater, mater, filius, filia familias.</p></div>'+
  '<div class="sheet"><h2>Dativo di possesso e apposizione</h2><p><i>Matronis gemmae et armillae sunt</i> → Le matrone hanno gioielli e bracciali.</p><ul><li>cosa posseduta = soggetto, in nominativo</li><li>sum concordato con la cosa posseduta</li><li>possessore in dativo</li></ul><p>Traducendo: il dativo diventa soggetto, sum diventa "avere", il soggetto latino diventa complemento oggetto.</p><p><b>Apposizione</b>: stesso caso del nome a cui si riferisce, ma mantiene genere e numero. <i>Athenae, poetarum patria, in Graeciā sunt.</i></p><p><i>non tantum (solum)… sed etiam</i>: non solo… ma anche.</p></div>'+
  '<div class="sheet"><h2>Pronuncia, sillabe, accento</h2><div class="scroll"><table class="t"><thead><tr><th></th><th>Ecclesiastica</th><th>Restituta</th></tr></thead><tbody><tr><td>h</td><td>muta (hora → òra)</td><td>lievissima aspirazione a inizio parola</td></tr><tr><td>ph</td><td>f</td><td>p aspirata</td></tr><tr><td>c, g</td><td>dolci davanti a e, i (Cìcero)</td><td>sempre dure (Kìkero)</td></tr><tr><td>gl</td><td>sempre gutturale (g-lis)</td><td>gutturale</td></tr><tr><td>ti + vocale</td><td>zi (sapienzia); ti se accentato o dopo s, x, y (molèstia)</td><td>sempre ti</td></tr><tr><td>ae, oe</td><td>e, se dittongo (ròse); separate con la dieresi (po-ë-ta)</td><td>sempre separate</td></tr><tr><td>v</td><td>v</td><td>u (uìuo)</td></tr><tr><td>y</td><td>i</td><td>ü francese</td></tr></tbody></table></div>'+
  '<h3>Sillabe</h3><ul><li>dittonghi (ae, oe, au; più rari eu, ai, ui) = una sillaba: lae-ta</li><li>vocali senza dittongo = due sillabe: po-ë-ta</li><li>u dopo q e dopo ng non conta: e-quus, lin-gua</li><li>due consonanti si dividono (con-sul), tranne t, d, p, b, c, g, f + r o l (te-ne-brae)</li><li>s + consonante si divide: ma-gis-ter</li><li>x = c-s: mac-si-mus · i tra vocali vale doppia: Mai-ius · prefissi isolati: per-a-gro</li></ul>'+
  '<h3>Quantità</h3><ul><li>dittongo sempre lungo · vocale + vocale breve · vocale + due consonanti lunga (sillaba chiusa)</li></ul>'+
  '<h3>Le tre leggi dell\'accento</h3><ul><li><b>Baritonesi</b>: mai sull\'ultima sillaba</li><li><b>Trisillabismo</b>: mai oltre la terzultima</li><li><b>Penultima</b>: se è lunga prende l\'accento (decēpi → decèpi), se è breve l\'accento va sulla terzultima (decĭpis → dècipis)</li></ul><p>Alfabeto: 23 lettere, manca la U (si usava V).</p></div>'+
  '<div class="sheet"><h2>Regole generali</h2><ul><li>Latino sintetico (terminazioni), italiano analitico (ordine e preposizioni). Mancano gli articoli.</li><li>6 casi, 5 declinazioni, 3 generi (maschile, femminile, neutro).</li><li>4 coniugazioni + mista: -āre, -ēre, -ĕre, -īre.</li><li>Niente condizionale (al suo posto il congiuntivo). In più: gerundio, gerundivo, supino.</li><li>Perfetto = passato remoto, passato prossimo, trapassato remoto. Imperativo e participio anche al futuro.</li><li>Deponenti: forma passiva, significato attivo. Semideponenti: forma mista, significato attivo.</li><li>Verbi sul dizionario alla I persona singolare dell\'indicativo presente.</li></ul></div>'+
  '<div class="sheet"><h2>Lessico</h2><div class="lex">'+lex.map(c=>'<div><i>'+SL.esc(c[0])+'</i> '+SL.esc(c[1])+'</div>').join('')+'</div></div>';
SL.modulo({id:'latino-v28', materia:'Latino', titolo:'Verifica pp. 1-43 · Unità 1 e inizio Unità 2', scadenza:'2026-10-28', nota:'Verifica in classe', fonte:'Libro di testo, pp. 1-43', blocchi, orale, schede});
})();
