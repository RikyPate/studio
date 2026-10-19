/* Modulo: Latino, Unità 1 (libro pp. 1-36) */
(function(){
const SL=StudioApp, ch=SL.ch, cs=SL.cs, decl=SL.decl, declPair=SL.declPair, both=SL.both, CASES=SL.CASES;
const e=x=>'<span class="e">'+x+'</span>';
const blocchi=[
{id:'teo',title:'Le regole generali del latino',tag:'Memoria',goal:'Sono le domande da interrogazione su "Prima di iniziare". Rispondi senza guardare, poi ripetile a voce.',items:[
 ch('teo1','Perché si dice che il latino è una lingua <b>sintetica</b>?',['Perché esprime le funzioni logiche con le terminazioni delle parole','Perché usa molte preposizioni e un ordine fisso delle parole','Perché le sue frasi sono più brevi di quelle italiane'],0,'L\'italiano è analitico: usa ordine delle parole e preposizioni. Il latino usa le terminazioni, quindi l\'ordine delle parole non cambia la funzione logica.'),
 ch('teo2','Quanti <b>casi</b> ha la declinazione latina?',['Cinque','Sei','Sette'],1,'Nominativo, genitivo, dativo, accusativo, vocativo, ablativo.'),
 ch('teo3','Quante <b>declinazioni</b> ci sono in latino?',['Tre','Quattro','Cinque'],2,''),
 ch('teo4','Quali <b>generi</b> hanno i nomi latini?',['Maschile e femminile, come in italiano','Maschile, femminile e neutro','Solo maschile e neutro'],1,'Il neutro non esiste in italiano: indica per lo più oggetti inanimati.'),
 ch('teo5','Come si distinguono le <b>quattro coniugazioni</b>?',['Dalla terminazione dell\'infinito presente attivo','Dalla I persona singolare','Dal genere del soggetto'],0,'I -āre, II -ēre (e lunga), III -ĕre (e breve), IV -īre. Poi c\'è la coniugazione mista: infinito in -ĕre ma alcune forme dei verbi in -īre.'),
 ch('teo6','L\'infinito della <b>III coniugazione</b> esce in…',['-ēre, con la e lunga','-ĕre, con la e breve','-īre'],1,''),
 ch('teo7','Quale <b>modo</b> verbale non esiste in latino?',['Il congiuntivo','Il condizionale','L\'imperativo'],1,'Al condizionale italiano corrisponde in genere il congiuntivo latino. Il latino ha invece modi che l\'italiano non ha: gerundivo e supino.'),
 ch('teo8','Il <b>perfetto</b> indicativo latino corrisponde in italiano a…',['Passato remoto, passato prossimo e trapassato remoto','Solo al passato prossimo','Imperfetto e passato remoto'],0,''),
 ch('teo9','I verbi <b>deponenti</b> hanno…',['Forma attiva e significato passivo','Forma passiva e significato attivo','Solo il presente'],1,'I semideponenti hanno forma mista (attiva o passiva secondo i tempi) e significato attivo.'),
 ch('teo10','Sul dizionario un verbo latino si cerca…',['All\'infinito presente, come in italiano','Alla I persona singolare dell\'indicativo presente','Alla III persona singolare'],1,'Per "essere" cerchi sum, non esse.'),
 ch('teo11','In latino gli <b>articoli</b>…',['Sono uguali a quelli italiani','Non esistono: traducendo li aggiungi tu secondo il contesto','Si trovano solo davanti ai nomi femminili'],1,''),
 ch('teo12','L\'imperativo latino si coniuga…',['Solo al presente','Al presente e anche al futuro','Solo alla III persona'],1,'E anche il participio ha il futuro, mentre in italiano è solo presente e passato.')
]},
{id:'pro',title:'Alfabeto, pronuncia, sillabe, accento',tag:'Memoria + ragionamento',goal:'Prima le regole a memoria, poi applicale. Alla fine leggi ad alta voce ogni parola con l\'accento giusto.',items:[
 ch('pro1','Quante lettere ha l\'alfabeto latino?',['21','23','26'],1,'A B C D E F G H I K L M N O P Q R S T V X Y Z'),
 ch('pro2','Quale segno grafico manca?',['La U: si usava la V sia per il suono "u" sia per il suono "v"','La K','La Y'],0,'Per questo sulle epigrafi trovi SENATVS POPVLVSQVE ROMANVS.'),
 ch('pro3','Pronuncia <b>ecclesiastica</b>: come si legge <span class="latin">rosae</span>?',['ròse','ròsae','ròze'],0,'ae e oe si leggono e quando formano dittongo.'),
 ch('pro4','Pronuncia ecclesiastica: <span class="latin">gratia</span>',['gràtia','gràzia','gràsia'],1,'ti seguito da vocale si legge zi.'),
 ch('pro5','Pronuncia ecclesiastica: <span class="latin">molestia</span>',['molèstia','molèszia','molèsia'],0,'Il libro: ti si pronuncia ti quando è accentato oppure preceduto da s, x, y.'),
 ch('pro6','Pronuncia ecclesiastica: <span class="latin">Cicero</span>',['Cìcero (c dolce)','Kìkero','Cìchero'],0,'c e g davanti a e, i hanno suono palatale; davanti a a, o, u suono gutturale.'),
 ch('pro7','Pronuncia <b>restituta</b> (scientifica): <span class="latin">Cicero</span>',['Cìcero','Kìkero','Zìzero'],1,'Nella restituta c e g sono sempre gutturali, v si legge u (vivo: uìuo), ae si legge separato.'),
 ch('pro8','<span class="latin">poëta</span>, con la dieresi, si legge…',['pè-ta','po-e-ta, con le due vocali separate','pö-ta'],1,'La dieresi indica che le due vocali non formano dittongo.'),
 ch('pro9','Come si divide in sillabe <span class="latin">magister</span>?',['ma-gi-ster','ma-gis-ter','mag-is-ter'],1,'In latino s seguita da consonante si divide, a differenza dell\'italiano (ma-gi-ste-ro).'),
 ch('pro10','Come si divide <span class="latin">tenebrae</span>?',['te-neb-rae','te-ne-brae','te-ne-bra-e'],1,'I gruppi t, d, p, b, c, g, f + r o l non si dividono. Il dittongo ae è una sola sillaba.'),
 ch('pro11','Come si divide <span class="latin">maximus</span>?',['ma-xi-mus','mac-si-mus','max-im-us'],1,'La x si scinde in c-s.'),
 ch('pro12','Come si divide <span class="latin">lingua</span>?',['lin-gu-a','lin-gua','li-ngua'],1,'La u dopo ng (e dopo q) non conta come vocale.'),
 ch('pro13','Una vocale seguita da un\'altra vocale è…',['Lunga','Breve','Dipende dal dizionario'],1,'Esempio: facio.'),
 ch('pro14','Una vocale seguita da due o più consonanti è…',['Lunga, perché la sillaba è chiusa','Breve','Sempre accentata'],0,'Esempio: dāmno. E il dittongo è sempre lungo.'),
 ch('pro15','Legge della <b>baritonesi</b>:',['L\'accento non risale oltre la terzultima','L\'accento non cade mai sull\'ultima sillaba','L\'accento cade sempre sulla penultima'],1,'Le eccezioni sono rare (contrazioni o troncamenti).'),
 ch('pro16','Legge del <b>trisillabismo</b>:',['L\'accento non risale mai oltre la terzultima sillaba','Le parole hanno al massimo tre sillabe','L\'accento cade sulla terza sillaba'],0,''),
 ch('pro17','Legge della <b>penultima</b>:',['Se la penultima è lunga l\'accento cade lì; se è breve risale alla terzultima','La penultima non è mai accentata','La penultima è sempre lunga'],0,'Nelle parole di tre o più sillabe è la penultima a decidere.'),
 ch('pro18','<span class="latin">agricŏla</span> (a-gri-co-la): dove cade l\'accento?',['àgricola','agrìcola','agricòla'],1,'La penultima co è breve, quindi l\'accento risale alla terzultima.'),
 ch('pro19','<span class="latin">fortūna</span> (for-tu-na):',['fòrtuna','fortùna','fortunà'],1,'Penultima lunga: accento sulla penultima.'),
 ch('pro20','<span class="latin">victoria</span> (vic-to-ri-a):',['vìctoria','victòria','victorìa'],1,'La penultima ri è breve perché è una vocale seguita da vocale: l\'accento va sulla terzultima, to.'),
 ch('pro21','<span class="latin">magistra</span> (ma-gis-tra):',['màgistra','magìstra','magistrà'],1,'La penultima gis è chiusa (finisce in consonante), quindi lunga.'),
 ch('pro22','<span class="latin">silva</span>:',['sìlva','silvà'],0,'Parola di due sillabe: per la baritonesi l\'accento non va mai sull\'ultima.')
]},
{id:'cas',title:'I casi e le loro funzioni',tag:'Memoria',goal:'Per ogni funzione logica scegli il caso latino. Questa tabella va saputa senza esitare.',items:[
 {k:'select',id:'cas',q:'Funzione logica → caso',opts:CASES,rows:[
  ['soggetto','nom'],['complemento oggetto','acc'],['complemento di specificazione','gen'],['complemento di termine','dat'],['complemento di vocazione','voc'],['complemento di mezzo','abl'],['complemento di causa','abl'],['parte nominale del predicato','nom'],['predicativo del soggetto','nom'],['predicativo dell\'oggetto','acc'],['complemento di vantaggio e svantaggio','dat'],['complemento partitivo','gen'],['complemento di modo','abl'],['stato in luogo con in','abl'],['il possessore nel dativo di possesso','dat']]}
]},
{id:'ita',title:'Dall\'italiano al caso latino',tag:'Ragionamento',goal:'Prima chiediti che complemento è in italiano, poi scegli il caso. Ripeti a voce il ragionamento: "è un complemento di…, quindi…".',items:[
 cs('ita1','Do una rosa <b>alla maestra</b>.','dat','Complemento di termine → dativo.'),
 cs('ita2','<b>La figlia</b> della padrona è felice.','nom','Soggetto → nominativo.'),
 cs('ita3','La figlia <b>della padrona</b> è felice.','gen','Complemento di specificazione → genitivo.'),
 cs('ita4','Ci sono molti pirati <b>nelle isole</b>.','abl','Stato in luogo → in + ablativo (in insulis).'),
 cs('ita5','Le ancelle lodano <b>la vittoria</b>.','acc','Complemento oggetto → accusativo.'),
 cs('ita6','<b>Ragazze</b>, siate diligenti!','voc','Complemento di vocazione → vocativo.'),
 cs('ita7','La matrona è <b>onesta</b>.','nom','Parte nominale del predicato → nominativo (proba).'),
 cs('ita8','Il contadino lavora <b>con grande impegno</b>.','abl','Complemento di modo → ablativo.'),
 cs('ita9','Lodiamo Diana, <b>dea</b> dei boschi.','acc','Apposizione del complemento oggetto: prende il caso di Dianam, quindi accusativo (deam).'),
 cs('ita10','Molte <b>delle ragazze</b> sono stanche.','gen','Complemento partitivo → genitivo.'),
 cs('ita11','"Il poeta ha una lunga lettera". Con il dativo di possesso, <b>il poeta</b> in latino va in…','dat','Il possessore va in dativo: Poetae longa epistula est.')
]},
{id:'dec',title:'Le terminazioni della I declinazione',tag:'Memoria',goal:'Scrivi tutte le forme senza guardare. Le lineette sulle vocali non servono.',items:[
 {k:'grid',id:'g1',q:'Declina <span class="latin">silva, -ae</span> (bosco)',a:decl('silv').map(r=>r.map(x=>[x]))},
 {k:'grid',id:'g2',q:'Declina il nesso <span class="latin">longa epistula</span> (la lunga lettera)',a:declPair('long','epistul')},
 ch('dec1','Sul dizionario trovi <span class="latin">rosa, -ae</span>. Che cosa indica <span class="latin">-ae</span>?',['Il nominativo plurale','Il genitivo singolare','Il dativo singolare'],1,'La I declinazione si riconosce da nominativo in -ă e genitivo singolare in -ae.'),
 ch('dec2','I nomi della I declinazione sono…',['Tutti femminili','Per lo più femminili, ma ci sono alcuni maschili','Metà maschili e metà femminili'],1,'Maschili: advena, agricola, conviva, incola, nauta, pirata, poeta. Si declinano allo stesso modo.'),
 ch('dec3','Quali casi escono tutti in <span class="latin e">-ae</span>?',['Genitivo e dativo singolare, nominativo e vocativo plurale','Nominativo e vocativo singolare','Dativo e ablativo plurale'],0,''),
 ch('dec4','Quali casi escono in <span class="latin e">-is</span>?',['Genitivo plurale','Dativo e ablativo plurale','Accusativo plurale'],1,''),
 ch('dec5','Che differenza c\'è tra <span class="latin">rosă</span> e <span class="latin">rosā</span>?',['Nessuna','rosă (a breve) è nominativo o vocativo, rosā (a lunga) è ablativo','rosă è plurale, rosā singolare'],1,''),
 ch('dec6','Il vocativo, in tutte le declinazioni (salvo un gruppo della II)…',['È uguale al nominativo, al singolare e al plurale','È uguale all\'accusativo','Non esiste al plurale'],0,'')
]},
{id:'amb',title:'Una forma, più casi',tag:'Ragionamento',goal:'Seleziona tutti i casi possibili per ogni forma. È esattamente quello che devi fare quando traduci.',items:[
 {k:'multi',id:'amb1',form:'aquae',a:['Gs','Ds','Np','Vp']},
 {k:'multi',id:'amb2',form:'victoriis',a:['Dp','Abp']},
 {k:'multi',id:'amb3',form:'fortunam',a:['As']},
 {k:'multi',id:'amb4',form:'poetarum',a:['Gp']},
 {k:'multi',id:'amb5',form:'culpā (a lunga)',a:['Abs']},
 {k:'multi',id:'amb6',form:'culpă (a breve)',a:['Ns','Vs']},
 {k:'multi',id:'amb7',form:'ancillas',a:['Ap']},
 {k:'multi',id:'amb8',form:'Iulia (senza segni di quantità)',a:['Ns','Vs','Abs'],why:'Senza la quantità non puoi sapere se la a è breve o lunga: decide il contesto.'}
]},
{id:'agg',title:'Aggettivi in -a e concordanza',tag:'Ragionamento',goal:'Un aggettivo concorda in genere, numero e caso. Non fidarti della terminazione uguale.',items:[
 ch('agg1','Sul dizionario gli aggettivi della I classe sono riportati…',['Con la terminazione del femminile -a','Con la terminazione del maschile -us (es. bonus)','Con il genitivo'],1,''),
 ch('agg2','<span class="latin">Fessa ancilla et nauta in villa sunt.</span> A chi si riferisce <i>fessa</i>?',['A ancilla e a nauta','Solo a ancilla','Solo a nauta'],1,'Gli aggettivi in -a sono solo femminili. Nauta finisce in -a ma è maschile.'),
 ch('agg3','<span class="latin">Poetarum fama magna est.</span> <i>Magna</i> concorda con…',['poetarum','fama','est'],1,'Magna è nominativo singolare femminile come fama; poetarum è genitivo plurale. Traduci: la fama dei poeti è grande.'),
 {k:'text',id:'agg4',q:'Scrivi in latino, nel caso giusto:',rows:[['con molte rose',both('multis','rosis')],['delle ragazze felici',both('laetarum','puellarum')],['l\'ancella diligente (compl. oggetto)',both('sedulam','ancillam')],['o padrona buona!',both('bona','domina')],['alle piccole isole',both('parvis','insulis')]]}
]},
{id:'sum',title:'Il verbo sum',tag:'Memoria',goal:'Infinito, indicativo e imperativo presente. Poi distingui copula e predicato verbale.',items:[
 {k:'text',id:'sum1',q:'Scrivi la forma latina:',rows:[['essere (infinito)',['esse']],['io sono',['sum']],['tu sei',['es']],['egli è',['est']],['noi siamo',['sumus']],['voi siete',['estis']],['essi sono',['sunt']],['sii! (tu)',['es']],['siate! (voi)',['este']]]},
 ch('sum2','<span class="latin">Romae sumus.</span> Sum è…',['Copula (predicato nominale)','Predicato verbale: significa "ci troviamo"'],1,''),
 ch('sum3','<span class="latin">Sedulae sumus.</span> Sum è…',['Copula: sedulae è la parte nominale','Predicato verbale'],0,''),
 ch('sum4','<span class="latin">Divitiae causa curarum sunt.</span> Perché <i>causa</i> è singolare se <i>divitiae</i> è plurale?',['È un errore','Quando la parte nominale è un sostantivo concorda con il soggetto solo nel caso, e mantiene il suo genere e numero','Perché causa è un aggettivo'],1,'Se invece la parte nominale è un aggettivo concorda in caso, genere e numero (Matrona proba est).')
]},
{id:'luo',title:'Lo stato in luogo',tag:'Memoria + ragionamento',goal:'In + ablativo è la regola. Le eccezioni sono quelle che la prof chiederà.',items:[
 ch('luo1','nel bosco',['in silvā','in silvam','silvae'],0,'Regola: in + ablativo.'),
 ch('luo2','a Roma',['in Romā','Romae','Romam'],1,'Nomi di città singolari della I declinazione: locativo in -ae.'),
 ch('luo3','a Ravenna (<span class="latin">Ravenna, -ae</span>)',['Ravennae','in Ravennā','Ravennis'],0,'Città singolare della I: locativo.'),
 ch('luo4','a Tebe (<span class="latin">Thebae, -arum</span>)',['Thebae','in Thebis','Thebis'],2,'Città plurale della I: ablativo semplice, senza in.'),
 ch('luo5','presso l\'altare',['apud aram','apud arā','in arā'],0,'apud + accusativo.'),
 ch('luo6','sotto la porta (con sub)',['sub portam','sub portā','infra portā'],1,'sub e super + ablativo.'),
 ch('luo7','sopra la terra (con supra)',['supra terrā','supra terram','in terram'],1,'supra e infra + accusativo.'),
 ch('luo8','sull\'altare (con super)',['super arā','super aram','apud arā'],0,'super + ablativo.'),
 ch('luo9','"in pace e in guerra"',['in pace et in militiā','domi militiaeque','domus militiaque'],1,'Espressione idiomatica con il locativo di militia.'),
 ch('luo10','Perché si scrive <span class="latin">Athenis</span> e non <span class="latin">Athenae</span> per dire "ad Atene"?',['Perché Athenae è plurale: con le città plurali della I si usa l\'ablativo semplice','Per eufonia','Perché è un locativo'],0,'')
]},
{id:'par',title:'Le particolarità della I declinazione',tag:'Memoria',goal:'Nomi solo plurali e nomi che cambiano significato al plurale: vanno saputi parola per parola.',items:[
 ch('par1','Che cosa sono i <i>pluralia tantum</i>?',['Nomi che hanno solo il plurale','Nomi che hanno solo il singolare','Nomi maschili della I'],0,''),
 ch('par2','<span class="latin">divitiae, -arum</span>',['divinità','ricchezza, ricchezze','differenze'],1,''),
 ch('par3','<span class="latin">indutiae, -arum</span>',['tregua','vestiti','industrie'],0,''),
 ch('par4','<span class="latin">insidiae, -arum</span>',['isole','insidia, insidie','sedute'],1,''),
 ch('par5','<span class="latin">nuptiae, -arum</span>',['notti','nozze','nuvole'],1,''),
 ch('par6','<span class="latin">epulae, -arum</span>',['epoche','vivande, banchetto','lettere'],1,''),
 ch('par7','<span class="latin">angustiae, -arum</span>',['angosce','luoghi stretti, difficoltà','angoli'],1,''),
 ch('par8','<span class="latin">minae, -arum</span>',['miniere','minaccia','mine'],1,''),
 ch('par9','<span class="latin">copia</span> al singolare e <span class="latin">copiae</span> al plurale',['copia / copie','abbondanza / truppe','truppa / abbondanze'],1,''),
 ch('par10','<span class="latin">littera</span> e <span class="latin">litterae</span>',['lettera dell\'alfabeto / lettera (epistola), letteratura','lettera (epistola) / lettere dell\'alfabeto','letto / letti'],0,''),
 ch('par11','<span class="latin">opera</span> e <span class="latin">operae</span>',['opera d\'arte / opere d\'arte','opera, lavoro, attività / operai, manodopera','operaio / operai'],1,''),
 ch('par12','<span class="latin">vigilia</span> e <span class="latin">vigiliae</span>',['vigilia / vigilie','turno di guardia / sentinelle','sentinella / turni'],1,''),
 ch('par13','In <span class="latin">pater familias</span>, <i>familias</i> è…',['Un accusativo plurale','Un genitivo singolare arcaico in -as','Un errore di grafia'],1,'Si trova solo in espressioni fisse: pater, mater, filius, filia familias.'),
 ch('par14','<span class="latin">Syracusae pulchrae sunt.</span>',['Le Siracuse sono belle','Siracusa è bella','A Siracusa sono belle'],1,'Con i pluralia tantum copula, predicato e aggettivi vanno al plurale, ma in italiano traduci al singolare.')
]},
{id:'dat',title:'Dativo di possesso e apposizione',tag:'Ragionamento',goal:'Tre passaggi per il dativo di possesso: trova sum, trova il soggetto (la cosa posseduta), trova il dativo (il possessore).',items:[
 ch('dat1','<span class="latin">Dianae multae rosae sunt.</span>',['Molte rose sono per Diana','Diana ha molte rose','Diana è molte rose'],1,'Dianae = possessore → soggetto italiano; sunt → "ha"; rosae → complemento oggetto.'),
 ch('dat2','<span class="latin">Nautis parva villa est.</span>',['I marinai hanno una piccola fattoria','La fattoria dei marinai è piccola','Ai marinai la fattoria è piccola'],0,''),
 ch('dat3','"La padrona ha molte ancelle." In latino:',['Domina multas ancillas est','Dominae multae ancillae sunt','Dominae multas ancillas sunt'],1,'Le ancelle (cosa posseduta) in nominativo, sunt concordato con loro, la padrona in dativo.'),
 ch('dat4','Nel dativo di possesso, <i>sum</i> concorda con…',['Il possessore','La cosa posseduta, che è il soggetto latino','Sempre al singolare'],1,''),
 ch('dat5','Traducendo il dativo di possesso…',['Il dativo diventa il soggetto italiano e sum diventa "avere"','Il dativo resta complemento di termine','Il soggetto latino resta soggetto'],0,''),
 ch('dat6','"Lodo Diana, dea dei boschi." Quale forma è corretta?',['Dianam, dea silvarum','Dianam, deam silvarum','Dianam, deae silvarum'],1,''),
 ch('dat7','<span class="latin">Athenae, patria poetarum, in Graecia sunt.</span> Perché <i>patria</i> è singolare?',['Perché l\'apposizione prende il caso del nome a cui si riferisce ma mantiene il suo genere e numero','È un errore: dovrebbe essere patriae','Perché è un vocativo'],0,''),
 ch('dat8','<span class="latin">non tantum… sed etiam</span> significa…',['non tanto… quanto','non solo… ma anche','né… né'],1,'Si dice anche non solum… sed etiam.')
]},
{id:'lex',title:'Lessico dell\'unità',tag:'Memoria',goal:'Leggi la parola latina, di\' a voce alta il significato, poi gira la carta. Sii onesta: "quasi" vale come "non la sapevo".',items:[
 {k:'flash',id:'lex',deck:[
  ['amica, -ae','amica'],['ancilla, -ae','ancella'],['aqua, -ae','acqua'],['ara, -ae','altare'],['aula, -ae','sala, cortile'],['avaritia, -ae','avidità'],['culpa, -ae','colpa'],['cura, -ae','preoccupazione'],['doctrina, -ae','erudizione'],['domina, -ae','padrona'],['epistula, -ae','lettera'],['fama, -ae','fama, reputazione'],['filia, -ae','figlia'],['forma, -ae','bellezza'],['gratia, -ae','benevolenza, gratitudine'],['hora, -ae','ora (del giorno)'],['industria, -ae','impegno'],['insula, -ae','isola'],['invidia, -ae','invidia, odio'],['magistra, -ae','maestra'],['matrona, -ae','matrona'],['ora, -ae','spiaggia, riva'],['pecunia, -ae','denaro'],['poena, -ae','pena'],['porta, -ae','porta (della città)'],['potentia, -ae','potere, autorità'],['procella, -ae','tempesta'],['prudentia, -ae','saggezza'],['puella, -ae','ragazza, bambina'],['pugna, -ae','battaglia'],['ruina, -ae','crollo, rovina'],['sententia, -ae','parere, opinione'],['serva, -ae','schiava, serva'],['silva, -ae','bosco'],['venia, -ae','perdono'],['victoria, -ae','vittoria'],['villa, -ae','fattoria'],['vita, -ae','vita'],
  ['advena, -ae (m.)','straniero'],['agricola, -ae (m.)','contadino'],['conviva, -ae (m.)','commensale'],['incola, -ae (m.)','abitante'],['nauta, -ae (m.)','marinaio'],['pirata, -ae (m.)','pirata'],['poeta, -ae (m.)','poeta'],
  ['aspera','aspra'],['bona','buona'],['fessa','stanca'],['fida','fedele, fidata'],['honesta','onorevole, onesta'],['infida','sleale, infedele'],['ingrata','sgradita, ingrata'],['laeta','felice'],['longa','lunga'],['magna','grande'],['mira','straordinaria'],['misera','infelice'],['multa','molta'],['parva','piccola'],['pauca','poca'],['prava','cattiva'],['proba','buona, onesta'],['pulchra','bella'],['sedula','diligente'],['sollicita','preoccupata'],['stulta','sciocca'],
  ['ego','io'],['tu','tu'],['nos','noi'],['vos','voi'],['apud','presso, vicino'],['in','in'],['infra, sub','sotto'],['super, supra','su, sopra'],['autem','ma, invece'],['nam','infatti'],['nec','né, e non'],['nunc','ora'],['non','non'],['saepe','spesso'],['sed','ma'],['ita','così']
 ]}
]},
{id:'tra',title:'Traduci',tag:'Ragionamento',goal:'Frasi nuove con il lessico e le regole dell\'unità. Scrivi la tua traduzione, poi scegli quanto sei sicura e confronta con la soluzione.',items:[
 {k:'open',id:'tr1',src:'Romae multae arae sunt.',model:'A Roma ci sono molti altari.',hint:'Romae: locativo.'},
 {k:'open',id:'tr2',src:'Agricolae parva villa est.',model:'Il contadino ha una piccola fattoria.',hint:'Dativo di possesso.'},
 {k:'open',id:'tr3',src:'Apud portam ancillae fessae sunt.',model:'Presso la porta ci sono le ancelle stanche (oppure: le ancelle sono stanche presso la porta).',hint:''},
 {k:'open',id:'tr4',src:'Dianae, deae silvarum, multae rosae sunt.',model:'Diana, dea dei boschi, ha molte rose.',hint:'Apposizione e dativo di possesso insieme.'},
 {k:'open',id:'tr5',src:'Divitiae saepe causa curarum sunt.',model:'Le ricchezze spesso sono causa di preoccupazioni.',hint:''},
 {k:'open',id:'tr6',src:'Probae este, filiae!',model:'Siate oneste, figlie!',hint:''},
 {k:'open',id:'tr7',src:'Thebis multae et pulchrae arae Minervae sunt.',model:'A Tebe ci sono molti e begli altari di Minerva.',hint:''},
 {k:'open',id:'tr8',src:'In poetarum litteris non tantum doctrina sed etiam forma est.',model:'Nelle opere letterarie dei poeti c\'è non solo erudizione ma anche bellezza.',hint:'litterae al plurale.'},
 {k:'open',id:'tr9',src:'Copiae in insula sunt, sed vigiliae apud portam non sunt.',model:'Le truppe sono sull\'isola, ma le sentinelle non sono presso la porta.',hint:''},
 {k:'open',id:'tr10',src:'Siamo a Ravenna, ma le amiche sono a Tebe.',model:'Ravennae sumus, sed amicae Thebis sunt.',hint:'Dall\'italiano al latino.',toLat:true},
 {k:'open',id:'tr11',src:'La maestra ha una figlia diligente.',model:'Magistrae sedula filia est.',hint:'Dativo di possesso.',toLat:true},
 {k:'open',id:'tr12',src:'Nel bosco c\'è un altare di Diana.',model:'In silva Dianae ara est (anche: In silva ara Dianae est).',hint:'',toLat:true},
 {k:'open',id:'tr13',src:'Siate fedeli, ancelle!',model:'Fidae este, ancillae!',hint:'',toLat:true},
 {k:'open',id:'tr14',src:'Atene, patria della sapienza, è in Grecia.',model:'Athenae, patria sapientiae, in Graecia sunt.',hint:'Athenae è plurale tantum; patria resta singolare.',toLat:true}
]}
];
const orale=[
 ['Perché il latino è una lingua sintetica e l\'italiano analitica?','L\'italiano esprime le funzioni logiche con l\'ordine delle parole e le preposizioni; il latino con le terminazioni. Per questo in latino l\'ordine delle parole non cambia il significato (Caesaris filius librum legit = Librum legit Caesaris filius).'],
 ['Elenca i sei casi e la funzione principale di ciascuno.','Nominativo: soggetto, parte nominale, predicativo del soggetto. Genitivo: specificazione, partitivo. Dativo: termine, vantaggio e svantaggio. Accusativo: oggetto, predicativo dell\'oggetto. Vocativo: vocazione. Ablativo: mezzo, modo, causa e altri.'],
 ['Quante coniugazioni ha il latino e come si riconoscono?','Quattro più la mista, dall\'infinito presente attivo: -āre, -ēre, -ĕre, -īre; la mista ha -ĕre con alcune forme in -īre.'],
 ['Quali differenze ci sono tra i verbi latini e quelli italiani?','Manca il condizionale (si usa il congiuntivo); ci sono gerundio (diverso dall\'italiano), gerundivo e supino; il perfetto vale passato remoto, prossimo e trapassato remoto; imperativo e participio hanno il futuro; esistono deponenti e semideponenti.'],
 ['Dimmi le tre leggi dell\'accento, con un esempio per ognuna.','Baritonesi: mai sull\'ultima (màre). Trisillabismo: mai oltre la terzultima (pervicacìssimus). Penultima: se è lunga prende l\'accento (decēpi → decèpi), se è breve l\'accento va sulla terzultima (decĭpis → dècipis).'],
 ['Quando una sillaba è lunga o breve?','Dittongo sempre lungo; vocale seguita da vocale breve; vocale seguita da due o più consonanti lunga perché la sillaba è chiusa. Altrimenti decide il dizionario.'],
 ['Pronuncia ecclesiastica e restituta: tre differenze.','h muta / lieve aspirazione; c e g dolci davanti a e, i / sempre dure (Cìcero / Kìkero); ti + vocale = zi / sempre ti; ae, oe = e / pronunciati separati; v = v / u; y = i / ü.'],
 ['Declina a voce puella proba, senza fermarti.','puella proba, puellae probae, puellae probae, puellam probam, puella proba, puellā probā; puellae probae, puellarum probarum, puellis probis, puellas probas, puellae probae, puellis probis.'],
 ['Quali casi della I declinazione hanno terminazioni uguali?','-ă: nominativo e vocativo singolare (e -ā ablativo singolare). -ae: genitivo e dativo singolare, nominativo e vocativo plurale. -is: dativo e ablativo plurale.'],
 ['Come si esprime lo stato in luogo? Dimmi tutte le eccezioni.','In + ablativo. Città singolari della I: locativo in -ae (Romae). Domi militiaeque. Città plurali della I: ablativo semplice (Athenis). Apud + accusativo; sub e super + ablativo; supra e infra + accusativo.'],
 ['Che cosa sono i pluralia tantum? Dimmene almeno sei.','Nomi con solo il plurale: angustiae, deliciae, divitiae, epulae, indutiae, insidiae, Kalendae, minae, nuptiae, Athenae, Syracusae, Thebae. Concordano al plurale.'],
 ['Quali nomi cambiano significato tra singolare e plurale?','copia abbondanza / copiae truppe; littera lettera dell\'alfabeto / litterae lettera, letteratura; opera lavoro / operae operai; vigilia turno di guardia / vigiliae sentinelle.'],
 ['Come funziona e come si traduce il dativo di possesso?','Cosa posseduta in nominativo (soggetto), sum concordato con essa, possessore in dativo. Traducendo: il dativo diventa soggetto, sum diventa "avere", il soggetto latino diventa complemento oggetto.'],
 ['Come si comporta l\'apposizione in latino?','Va nello stesso caso del nome a cui si riferisce, ma mantiene il suo genere e numero (Athenae, patria poetarum).'],
 ['Sum predicato verbale o copula: come li distingui? E come concorda la parte nominale?','Predicato verbale quando significa trovarsi, esistere, stare (In Italia sum). Copula con una parte nominale. Parte nominale aggettivo: concorda in caso, genere e numero; sostantivo: solo nel caso.'],
 ['Raccontami Minerva: carta d\'identità.','Atena per i Greci, detta Pallade e Glaucopide. Figlia di Giove e di Metis, nata adulta e armata dalla testa del padre. Dea della sapienza, della ragione e delle arti, ma anche guerriera. Simboli: civetta, lancia, egida con la testa di Medusa, elmo, occhi azzurri. Vinse Poseidone per l\'Attica donando l\'ulivo. A Roma venerata sul Campidoglio con Giove e Giunone. Culto: Atene, Roma, Troia.'],
 ['Ripasso di italiano: che differenza c\'è tra predicativo del soggetto e dell\'oggetto?','Il predicativo completa verbi copulativi, appellativi, estimativi, elettivi. Del soggetto: si riferisce al soggetto (sono giudicato onesto). Dell\'oggetto: al complemento oggetto (tutti lo giudicano onesto).']
];
const lex=blocchi.find(b=>b.id==='lex').items[0].deck;
const schede=  '<div class="sheet"><h2>I casi</h2><div class="scroll"><table class="t"><thead><tr><th>Caso</th><th>Funzioni logiche</th></tr></thead><tbody>'+
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
SL.modulo({id:'latino-u1', materia:'Latino', titolo:'Unità 1 · La I declinazione', scadenza:'2026-10-21', nota:'Verifica in classe', fonte:'Libro di testo, pp. 1-36', blocchi, orale, schede});
})();
