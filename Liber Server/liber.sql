-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 14, 2020 alle 00:53
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `liber`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `librerie`
--

CREATE TABLE `librerie` (
  `ID` int(11) NOT NULL,
  `IDUtente` int(11) NOT NULL,
  `ISBNLibro` varchar(13) NOT NULL,
  `Segnalibro` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `librerie`
--

INSERT INTO `librerie` (`ID`, `IDUtente`, `ISBNLibro`, `Segnalibro`) VALUES
(1, 1, '9788868365', 10),
(3, 1, '9780460007672', 1),
(4, 1, '9780816156856', 1),
(5, 1, '9780199193295', 1),
(6, 1, '9781615701292', 1),
(7, 1, '978877089125', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `libri`
--

CREATE TABLE `libri` (
  `ISBN` varchar(13) NOT NULL,
  `Titolo` varchar(100) NOT NULL,
  `Autore` varchar(100) NOT NULL,
  `Trama` text DEFAULT NULL,
  `NumeroPagine` int(10) UNSIGNED DEFAULT NULL,
  `Prezzo` double UNSIGNED NOT NULL,
  `CasaEditrice` varchar(50) NOT NULL,
  `AnnoPubblicazione` varchar(30) DEFAULT NULL,
  `Genere` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `libri`
--

INSERT INTO `libri` (`ISBN`, `Titolo`, `Autore`, `Trama`, `NumeroPagine`, `Prezzo`, `CasaEditrice`, `AnnoPubblicazione`, `Genere`) VALUES
(' 978162899681', 'Jack deve morire ', 'Joyce Carol Oates', 'Il protagonista, Andrew J. Rush, è uno scrittore di successo: ha un manager e un editore a New York, e i suoi romanzi hanno venduto milioni di copie in oltre trenta paesi; è sposato con una donna adorabile, ha tre figli grandi ed è uno stimato filantropo nella piccola città del New Jersey, dove vive. Ma nasconde un oscuro segreto. Sotto lo pseudonimo di \"Jack of Spades\" scrive racconti hardboiled, maschilisti, violenti, misogini e rozzi, già oggetto di culto per un pubblico fedele e in continua crescita. Un giorno, sua figlia Julia s\'imbatte casualmente in uno di questi racconti e riconosce una scena ispirata a un evento familiare. Sconvolta, chiede insistentemente spiegazioni al padre. Nel frattempo, una donna lo accusa di plagio. La sua reputazione, la carriera e la vita familiare sono improvvisamente minacciate: Jack comincia a farsi strada nella mente e nella vita di Andrew e lo influenza fino a spingerlo a imprese delittuose.', 233, 8.99, 'Il Saggiatore', '2016', 'Horror'),
(' 978227722637', 'Rinascimento privato ', 'Maria Bellonci', 'In queste pagine si racconta la vicenda di Isabella d\'Este, divenuta marchesa di Mantova dopo il matrimonio con Francesco Gonzaga; non di una semplice per quanto raffinata biografia si tratta, però, quanto di un vero e proprio romanzo: sia per la presenza di alcuni personaggi totalmente inventati - come Robert de la Pole, corrispondente del re d\'inghilterra e innamorato platonico di Isabella -, sia soprattutto per la qualità della scrittura, che sembra avvolgere in una sorta di abbagliante pulviscolo ogni figura e ogni fatto storico. Protagonista assoluta è lei, Isabella, che ormai alla soglia dei sessant\'anni rievoca la propria vita da quando, sposa sedicenne, giunse a Mantova e in un periodo tra i più tumultuosi e fulgidi della nostra storia, a cavallo tra Quattro e Cinquecento, resse le fila del piccolo stato costruendo attorno a sé una corte di ineguagliato splendore.', 488, 7.99, 'Mondadori', '2016', 'Storico'),
(' 978870063162', 'Harry Potter e la pietra filosofale ', 'J. K. Rowling', 'Il primo capitolo di uno dei più grandi fenomeni letterari internazionali, il libro che ha fatto leggere milioni di ragazzi e ha unito genitori e figli nella scoperta di un universo fantastico che è già parte dell’immaginario collettivo.\r\n', 300, 6.9, 'Salani', '2018', 'Fantasy'),
('0062276468', 'Il leone d’oro', 'Wilbur Smith,', 'Africa orientale, seconda metà del diciassettesimo secolo. Hal Courteney incarna la quintessenza di una vita vissuta pericolosamente: ha per moglie una nobile guerriera etiope che combatte al suo fianco, ha da parte un cospicuo tesoro e ha un ancor più cospicuo numero di nemici. Hal è convinto di aver seppellito per sempre il peggiore di questi, l\'Avvoltoio, il responsabile dell\'ingiusta condanna di suo padre. Ma l\'uomo è invece sopravvissuto e, benché sfigurato e mutilato, è più combattivo che mai: l\'unico scopo della sua vita ormai è uccidere Hal e la moglie.', 493, 4.25, 'TEA', '2019', 'Avventura'),
('8804348488', 'La fortezza', 'Paul Wikson', 'asso Dinu, Romania, Seconda Guerra Mondiale.\r\nQualcuno sta uccidendo i soldati tedeschi che hanno da poco occupato la solitaria fortezza di un desolato passo montano nel cuore della Valacchia.\r\nInvisibile e silenzioso, il nemico sceglie una o due vittime per notte, lasciando dietro di sé corpi mutilati e dissanguati. Spaventati da quanto accade, i nazisti inviano sul posto una squadra di commando scelti delle SS, incaricati di scoprire e fermare il misterioso assassino. Il maggiore Kaempffer, scoprendosi a sua volta impotente, ricorre all’aiuto di un esperto di folklore locale, il vecchio ebreo Theodor Cuza, accompagnato dalla giovane figlia Magda. Una cosa è infatti oramai chiara: l’assassino solitario della fortezza non può essere né un partigiano, né un essere umano.', 336, 6.75, 'Mondadori', '2017', 'Horror'),
('8858828755', 'Oceano Mare', 'Alessandro Baricco', '\'Oceano Mare\' racconta del naufragio di una fregata della marina francese, molto tempo fa, in un oceano. Gli uomini a bordo cercheranno di salvarsi su una zattera. Sul mare si incontreranno le vicende di strani personaggi. Come il professore Bartleboom che cerca di stabilire dove finisce il mare, o il pittore Plasson che dipinge solo con acqua marina, e tanti altri individui in cerca di sé, sospesi sul bordo dell\'oceano, col destino segnato dal mare. E sul mare si affaccia anche la locanda Almayer, dove le tante storie confluiscono. Usando il mare come metafora esistenziale, Baricco narra dei suoi surreali personaggi, spaziando in vari registri stilistici.', 224, 9.07, 'Feltrinelli', '2013', 'Romanzo'),
('9780199193295', 'L’isola del tesoro ', 'Robert Louis Stevenson', '\"Ogni sera, il padre di Robert Louis Stevenson raccontava a se stessso avventure di pirati, di ladri, di briganti e di veccchi marinai. Il figlio faceva lo stesso: la sera si raccontava storie d\'avventura, e le sognava nelle ore notturne. Quando, nel settembre 1881, cominciò a scrivere \'L\'Isola del tesoro\', gli parve di attingere a un patrimonio famigliare.\" Inizia così il saggio di Pietro Citati che introduce questa edizione del romanzo più popolare di Stevenson e le avventure dell\'Hispaniola, di Long John Silver, l\'ammutinamento, i pirati...', 262, 8.5, 'Einaudi', '2015', 'Avventura'),
('9780460007672', 'Lo strano caso del dottor Jekyll e del signor Hyde', 'Robert Louis Stevenson', 'Esplicita metafora della lotta fra il bene e il male, \"Lo strano caso del Dr. Jekyll e Mr. Hyde\" è soprattutto un attacco diretto contro la repressiva e puritana letteratura inglese del periodo vittoriano. Il Dr. Jekyll, uomo retto, onesto, generoso, decisamente \"positivo\" e Mr. Hyde, crudele, vizioso, violento, sono due caratteri universali. L\'indagine psicologica di Stevenson si spinge oltre: Jekyll fragile, incerto, drammaticamente lacerato fra impulsi contrastanti è costretto a celare quegli istinti che Hyde soddisfa in modo macroscopico. Segue il racconto \"Ladro di cadaveri\" dove l\'atmosfera stregata e la tensione macabra vengono affidate a un particolare inquietante... Introduzione di Riccardo Reim.', 214, 6.9, 'Newton Compton Editori', '2016', 'Horror'),
('9780582186552', 'Lo Hobbit', 'John R. R. Tolkien', NULL, 304, 4.9, 'Bompiani', '2018', 'Fantasy'),
('9780605928183', '. Harry Potter e la camera dei segreti ', 'J. K. Rowling', 'A Hogwarts il nuovo anno scolastico s\'inaugura all\'insegna di fatti misteriosi: strane voci riecheggiano nei corridoi e Ginny, la sorella di Ron, sparisce nel nulla...', 324, 7.56, 'Salani', '2018', 'Fantasy'),
('9780671626884', 'Cabal', 'Clive Barker', 'Aaron Boone è un ragazzo di Calgary, in Canada, che soffre di un disturbo mentale. Per questo motivo si rivolge ad uno psichiatra di nome Decker. Costui lo informa di una serie di omicidi avvenuti nel giro di pochi mesi, dei quali molto probabilmente lo stesso Boone è artefice. Il ragazzo, sconvolto, tenta inizialmente il suicidio facendosi investire da un camion, riesce però a sopravvivere e viene ricoverato all\'ospedale. Qui incontra un uomo di nome Narcisse che gli parla di un luogo che può offrire ospitalità ai meritevoli chiamato Midian, una sorta di necropoli in cui dimorano mostri un tempo umani. Boone conosce già Midian perché l\'ha sognata spesso, e crede che sia ormai l\'unico luogo in cui possa rifugiarsi dopo i terribili delitti commessi. Il ragazzo non è il solo a voler raggiungere la misteriosa città, lo stesso Narcisse lo desidera ardentemente, tant\'è che offuscato dalla pazzia, si recide il volto con i suoi uncini argentati strappandosi letteralmente la faccia per dare prova di essere degno di entrare a far parte della popolazione di Midian. Approfittando della confusione scaturita da quel gesto, Boone fugge dall\'ospedale deciso a raggiungere la città.', 444, 12.9, 'Sonzogno', '2016', 'Horror'),
('9780736609289', 'Le miniere di re Salomone', 'Henry Rider Haggard', 'Allan Quatermain, esperto cacciatore di elefanti, viene ingaggiato dal gentiluomo inglese sir. Henry Curtis come guida in una spedizione nel cuore dell\'Africa alla ricerca di suo fratello, scomparso mentre seguiva le tracce delle miniere di diamanti del re Salomone. Tra colpi di scena, guerre e incontri inattesi, il viaggio si trasformerà in un\'esperienza cruciale, un confronto con un mondo sconosciuto e con se stessi. Uno dei più celebri romanzi d\'avventura, che Haggard scrisse per scommessa in sole sei settimane per dimostrare di essere capace di un racconto migliore de \"L\'isola del tesoro\". Un viaggio in Africa fuori dai limiti del colonialismo più angusto, ma anche un itinerario spirituale nelle regioni più nascoste dell\'anima.', 230, 7.56, 'Donzelli', '2016', 'Avventura'),
('9780816156856', 'Shining ', 'Stephen King', 'L\'Overlook, uno strano e imponente albergo che domina le alte montagne del Colorado, è stato teatro di numerosi delitti e suicidi e sembra aver assorbito forze maligne che vanno al di là di ogni comprensione umana e si manifestano soprattutto d\'inverno, quando l\'albergo chiude e resta isolato per la neve. Uno scrittore fallito, Jack Torrance, con la moglie Wendy e il figlio Danny di cinque anni, accetta di fare il guardiano invernale all\'Overlook, ed è allora che le forze del male si scatenano con rinnovato impeto: la famiglia si trova avvolta ben presto in un\'atmosfera sinistra. Dinanzi a Danny – che è dotato di un potere extrasensoriale, lo \"shine\" – si materializzano gli orribili fatti accaduti nelle stanze dell\'albergo, ma se il bambino si oppone con forza a insidie e presenze, il padre ne rimane vittima.', 592, 11.9, 'Bompiani', '2017', 'Horror'),
('9781101530641', 'L’incubo di Hill House ', 'Shirley Jackson', '«In questo autentico classico del genere gotico, Eleanor Vance, giovane e tormentata donna che non ricorda di essere mai stata felice in tutta la sua vita, viene assoldata dal sinistro professor Montague, aspirante cacciatore di fantasmi, per un soggiorno sperimentale a Hill House ... Giunta a destinazione, Eleanor si trova davanti una casa “che sembrava aver preso forma da sola, assemblandosi in quel suo possente schema indipendentemente dai muratori”; un edificio che “drizzava la testa imponente contro il cielo senza concessioni all\'umanità”; una costruzione immune da ogni esorcismo: “un luogo non adatto agli uomini, né all\'amore, né alla speranza”; una casa che si rifiuta di essere una dimora accogliente così come Eleanor vorrebbe sfuggire a un sistema di vita che le ha portato soltanto infelicità».', 233, 6.99, 'Adelphi', '2016', 'Horror'),
('9781444708127', 'Cujo ', 'Stephen King', 'A Castle Rock, una sonnolenta cittadina del Maine, la vita scorre sui soliti binari. Cujo, il docile San Bernardo del meccanico, scorrazza libero per la campagna, finché una notte il suo padroncino, aprendo la porta del ripostiglio, non vede emergere dalle tenebre due occhi infuocati. Chi è la creatura diabolica che da quel momento comincia a seminare ovunque terrore e desolazione? È forse Cujo che, diventato idrofobo, si è trasformato nell\'incarnazione stessa del male?', 378, 7.99, 'Sperling & Kupfer', '2014', 'Horror'),
('9781522998518', 'Notre-Dame de Paris ', 'Victor Hugo', 'Vasta sinfonia in pietra, opera colossale di un uomo e di un popolo.” Con queste parole Hugo descrive la facciata della cattedrale di Notre-Dame, teatro e incarnazione delle vicende della gitana Esmeralda, dell’arcidiacono Frollo e del campanaro Quasimodo. Alle porte della Parigi del 1482 giunge una tribù di zingari, con le loro danze, il loro teatro e il vivace accampamento, pittorescamente battezzato “Corte dei Miracoli”. Sono decisi a farsi notare dai cittadini, ma è la bella Esmeralda a portare scompiglio nella città. Di lei si invaghiscono Frollo e Quasimodo, insieme a molti altri. Per lei verranno commessi delitti e rapimenti, sulla sua testa graverà una terribile condanna a morte. Un capolavoro della letteratura che traccia un vero e proprio affresco della Parigi del Quindicesimo secolo, completamente illustrato con le straordinarie immagini originarie di illustratori contemporanei di Hugo. Un canto della città e una vicenda tragica, una storia che non cessa mai di essere raccontata.', 559, 8.25, 'BUR Biblioteca Univ. Rizzoli', '2019', 'Storico'),
('9781544052151', 'Le case della follia', 'Howard Phillips Lovecraft ', 'Cofanetto con i volumi 1-4. Continente antartico, ai confini del mondo conosciuto. Un gruppo di audaci esploratori fa una scoperta sensazionale lungo il cammino verso l\'ignoto: una catena montuosa dalle vette nere, che si cela nel punto più remoto della vasta distesa gelata. Nelle sue oscure profondità viene rinvenuta una creatura antichissima e misteriosa, preludio di un\'immane tragedia che incombe sull\'umanità, e dinanzi alla quale anche gli animi più impavidi vacillano.', 768, 11.2, 'Edizioni BD', '2019', 'Horror'),
('9781567673067', 'I tre moschettieri ', 'Alexandre Dumas', 'Dove sta la magia? Nella forza del plot? Nella qualità possente dello scenario storico che è in grado di evocare? Nella suspense? Forse, più di tutto, nella gioia del raccontare. Questo capolavoro dell\'intrigo cattura a ogni pagina il lettore, lo spiazza, lo depista, lo inganna e lo rende complice, per poi coinvolgerlo in uno strabiliante \"effetto meraviglia\". A partire dal titolo: non solo I tre moschettieri sono quattro, ma - come ha osservato Umberto Eco il romanzo è palesemente \"la storia del quarto\", di d\'Artagnan, che è l\'assoluto protagonista non solo di questo libro, ma degli altri due che seguiranno: Vent\'anni dopo e Il visconte di Bragelonne. \"Immaginatevi un Don Chisciotte a diciott\'anni\": è questo il primo impatto del lettore con d\'Artagnan, e attorno a questo virtuoso della spada, a questo campione di lealtà, di dedizione assoluta alla regina, si dipanerà la storia dei tre romanzi, la storia di una vita. L\'altra figura decisiva, antagonistica, è Milady, quintessenza dell\'inganno, maschera erotica della perfidia e del tradimento, di cui porta il segno indelebile inciso nelle carni. C\'era bisogno di una nuova edizione dei Tre moschettieri per riportare il romanzo all\'altezza della sua scrittura: attraverso una nuova traduzione che unisce rigore e respiro narrativo, un\'Introduzione del più grande studioso vivente di Dumas e un dettagliatissimo Dizionario dei personaggi.', 758, 9.35, 'Feltrinelli', '2016', 'Storico'),
('9781615701292', 'Le avventure di Tom Sawyer', 'Mark Twain', 'La storia s\'impernia sulla vicenda capitata ai due amici Huck e Tom, andati a seppellire un gatto a mezzanotte nel cimitero del villaggio. Nel cimitero i nostri eroi, quella notte, sono gli invisibili testimoni d\'un assassinio. Come lo stesso autore scrisse, il racconto raccoglie molte vicende veramente accadute, esperienze personali e altre di ragazzi che furono compagni di scuola di Mark Twain. Postfazione di Antonio Faeti. Età di lettura: da 8 anni.', 298, 8.18, ' BUR Biblioteca Univ. Rizzoli', '2015', 'Avventura'),
('9781617078545', 'La storia infinita', 'Michael Ende', 'Bastiano è un giovane goffo, e non è quel che si dice comunemente un \"ragazzo sveglio\", ma la lettura (e il termine è improprio, perché egli passerà alternativamente dal ruolo di lettore a quello di personaggio e di protagonista) di questo libro lo farà cambiare e farà cambiare la Storia stessa. Gli farà capire che il \"fa\' ciò che vuoi\" che sta scritto sull\'amuleto ricevuto in dono non significa \"fa\' quel che ti pare\", ma esorta a seguire la volontà più profonda per trovare se stessi. Che è la strada più ardua del mon do. Il libro e Bastiano la percorreranno insieme, e il ragazzo attraverserà tutti i suoi desideri e passerà dalla goffaggine alla bellezza, alla forza, alla sapienza, al potere, fino a quando dovrà fermarsi.', 436, 6.48, 'TEA', '2009', 'Fantasy'),
('9781687633873', 'Cuore di tenebra ', 'Joseph Conrad', 'Marlowe racconta di aver avuto l\'incarico di sostituire un capitano fluviale ucciso dagli indigeni nell\'Africa centrale. Si imbarca su una nave francese e, giunto alla stazione della compagnia, vede come gli indigeni muoiano di stenti e di sfruttamento. Dopo un lungo viaggio di duecento miglia sul fiume rintraccia Kurtz, un leggendario agente capace di procurare più avorio di ogni altro. In realtà Kurtz, uomo solo e ormai folle, è quasi morente. Viene convinto a partire, ma muore sul battello che lo trasporta, dopo aver pronunciato un discorso che non può nascondere \"la tenebra del suo cuore\".', 121, 6.8, 'Feltrinelli', '2013', 'Avventura'),
('9781713428961', 'Viaggio al centro della terra ', 'Jules Verne', 'In un vecchio manoscritto il professor Lidenbrock, geologo e mineralogista, scopre un testo cifrato in cui è scritto che attraverso il cratere dello Sneffels, vulcano spento dell\'Islanda, è possibile penetrare fino al centro della Terra. Folgorato dalla scoperta, Lidenbrock raggiunge la fredda isola artica e intraprende l\'avventurosa discesa nelle viscere del pianeta in compagnia del suo giovane nipote: cosa troveranno i nostri coraggiosi esploratori nelle misteriose profondità sotterranee? Nel racconto delle prodigiose avventure che si susseguiranno, la potente fantasia di Jules Verne raggiunge il vertice in un viaggio meraviglioso e fantastico fra travolgenti fenomeni naturali, apparizioni di mostri preistorici, panorami di magica e misteriosa bellezza. Introduzione di Giampaolo Rugarli.', 217, 4.16, 'Newton Compton Editori', '2015', 'Avventura'),
('9781743038178', 'Mondo senza fine ', 'Ken Follett', 'È il 1327. Il giorno di Ognissanti, quattro bambini si allontanano di nascosto dal priorato di Kingsbridge e nella foresta assistono per caso all\'omicidio di due uomini. Da allora le vite di questi ragazzi - un piccolo genio, un bulletto, una adruncola e una ragazzina dalle grandi ambizioni - saranno indissolubilmente egate tra loro e, una volta adulti, conosceranno amore, avidità, ambizione e vendetta. Vivranno momenti di prosperità e carestia, malattia e guerra. Dovranno fronteggiare la più terribile epidemia di tutti i tempi: la peste. Uno di loro viaggerà per inseguire un amore impossibile e un\'altra sfiderà il potere della Chiesa. Ma su ciascuno resterà l\'ombra dell\'inspiegabile omicidio di cui sono stati testimoni in quel fatidico giorno della loro infanzia. Dopo \"I pilastri della terra\", Ken Follett ambienta \"Mondo senza fine\" due secoli dopo la costruzione della cattedrale di Kingsbridge, sullo sfondo di un lento ma inesorabile mutamento che rivoluzionerà le arti e le scienze. I secoli bui sono alle spalle e si cominciano a vedere i primi bagliori di una nuova epoca. Prefazione dell\'autore all\'edizione per il decimo anniversario.', 1367, 6, 'Mondadori', '2016', 'Storico'),
('9781785945168', 'Dracula', 'Bram Stoker', 'n Transilvania per concludere la vendita di una casa londinese al Conte Dracula, discendente di un\'antichissima casata locale, il giovane agente immobiliare Jonathan Harker scopre che il suo cliente è una creatura di mistero e orrore... «Dracula», archetipo delle infinite storie di vampiri narrate dalla letteratura e dal cinema, mette in scena l\'eterna lotta tra il Bene e il Male, ma anche tra la ragione e l\'istinto, tra le pulsioni più inconfessabili e il perbenismo non solo vittoriano. Una storia scaturita dall\'inconscio ed entrata in tutti i nostri incubi.', 532, 9.18, 'Mondadori', '2016', 'Horror'),
('9781973812609', 'Ivanhoe ', 'Walter Scott', 'La vicenda si colloca nell\'Inghilterra del XII secolo sullo sfondo dei contrasti tra sassoni e normanni. Ivanhoe, figlio di Cedric, ama, riamato, lady Rowena. Ma Cedric ha deciso di dare in moglie Rowena a Athelstane per riportare una stirpe sassone sul trono e bandisce Ivanhoe, amico del re normanno Riccardo Cuor di Leone. Il giovane va crociato al seguito di Riccardo mentre, assente il re, Giovanni usurpa il trono. Al ritorno dei crociati, Ivanhoe batte tutti i campioni dell\'usurpatore. Ma i nobili normanni lo fanno prigioniero con Cedric, Rowena e Athelstane. Vengono però liberati da re Riccardo e Robin Hood. Ivanhoe e Rowena infine si sposano.', 538, 4.16, 'BUR Biblioteca Univ. Rizzoli', '2017', 'Storico'),
('9781976530739', 'Moby Dick', 'Herman Melville', 'Un uomo e un mostruoso cetaceo si fronteggiano: è il conflitto più aspro, accanito e solitario mai immaginato, è la storia di ogni anima che si spinga a guardare oltre l\'abisso. Moby Dick è un gigantesco capodoglio, candida fonte di orrore e meraviglia; Achab è un capitano che, ossessionato da follia vendicatrice, lo insegue fino all\'ultimo respiro; Ismaele, un marinaio dall\'oscuro passato imbarcato sulla baleniera Pequod, è il narratore e, forse, l\'eroe della tragedia. Sullo sfondo, il ribollire sordo e terribile dell\'oceano, il vociare cosmopolita dell\'equipaggio, le descrizioni anatomiche delle balene e i puntuali resoconti di caccia. Così, pagina dopo pagina, i personaggi del dramma diventano i protagonisti di una nuova epica, con il fascino ambiguo e controverso di un destino contemporaneo. Con un saggio di Harold Bloom.', 703, 7.56, 'BUR Biblioteca Univ. Rizzoli', '2015', 'Avventura'),
('9781977841438', 'Frankenstein', 'Mary Shelley', 'Nel 1816 Lord Byron, durante una sera tempestosa nella sua villa a Ginevra, propone ai suoi ospiti - Mary e Percy Shelley, e William Polidori - di scrivere, per gioco, cun racconto dell\'orrore. Ricollegandosi al mito di Prometeo, Mary scriverà Frankenstein. Una storia che è un groviglio etico, un ragionamento profondo sull\'origine della vita: l\'angosciante storia di uno scienziato che conduce macabri esperimenti nel tentativo di restituire la vita ai cadaveri. Una favola terribile capace di imporsi con la forza delle immagini e la sua autonomia di mito universale. Uno sconvolgente racconto dell\'orrore in cui il mostro è più umano del suo creatore.', 250, 8.43, 'Einaudi', '2016', 'Horror'),
('9782207600504', 'Danza macabra', 'Dan Simmons', 'ono i vampiri della mente, creature dotate della capacità psichica di penetrare nella mente degli altri e di usarli: possono leggerne il pensiero, soggiogarne la volontà, assorbirne le sensazioni, nutrirsi delle loro emozioni, costringerli a commettere atti di violenza folle. Ogni anno, tre di questi vampiri - Melanie, Willi e Nina - si incontrano per discutere l\'andamento del loro gioco, quasi una gara, di possessione e sterminio. Ma nel corso dell\'ultima riunione accade qualcosa di nuovo e i tre vengono proiettati in un conflitto dal cui esito dipende il futuro dell\'intero pianeta. Alcuni normali esseri umani cercano di combattere i vampiri: Saul Laski, psicologo, reduce da un campo di concentramento nazista; Natalie Preston, figlia di un uomo che ha fatalmente incrociato la strada di Melanie; lo sceriffo Bobby Jo Gentry, coinvolto casualmente nella lotta mentre indaga su una serie di omicidi. La caccia è aperta... ma chi è il cacciatore, e chi la preda?', 945, 16.58, 'Gargoyle', '2009', 'Horror'),
('9785170686773', 'Pet Sematary ', 'Stephen King', 'Il dottor Louis Creed ha appena accettato l\'incarico di direttore sanitario dell\'Università del Maine, e con un certo entusiasmo: posizione di prestigio, magnifica villa di campagna dove Eileen e Gage, i suoi bambini, possono crescere tranquilli, vicini gentili e generosi in una cittadina idilliaca lontana dal caos metropolitano. Persino Winston Churchill, detto Church, il loro pigro e inseparabile gattone, sembra subito godere dei vantaggi della nuova situazione. Ben presto, però, la serena esistenza dei Creed viene sconvolta da una serie di episodi inquietanti: piccoli incidenti inspiegabili che coinvolgono i bambini, pericolosi e giganteschi camion che sfrecciano sulla superstrada proprio sotto casa Creed, incontri diabolicamente sorprendenti e, soprattutto, sogni. Sogni oscuri e terribilmente realistici che perseguitano Louis da quando ha visitato il Pet Sematary, il cimitero dove i ragazzi di Ludlow seppelliscono da sempre i loro animali domestici. Ufficialmente. Perché oltre quella radura, nascosto tra gli alberi, c\'è un altro terreno di sepoltura, ben più terrificante. Un luogo carico di presagi e di richiami, spaventosi quanto irresistibili, provenienti da un altro mondo. Un luogo dove al dottor Creed toccherà una scoperta raggelante: a volte è meglio essere morti... Pet Sematary, definito dal Washington Post «folle, potente, disturbante», è un vero e proprio classico della letteratura horror, ispirato, parola di King, da un leggendario racconto popolare: La zampa di scimmia.', 425, 13.99, 'Sperling & Kupfer', '2019', 'Horror'),
('9787207071804', 'I viaggi di Gulliver', 'Jonathan Swift', 'Cavalli che parlano e ragionano, giganti dalle proporzioni smisurate, nani così piccoli da poter essere tenuti in una tasca, filosofi che popolano isole volanti: sono solo alcune delle creature straordinarie che il capitano Lemuel Gulliver incontra nel corso dei suoi viaggi avventurosi, tra mille peripezie e innumerevoli pericoli. Pubblicato nel 1726, è oggi noto soprattutto come un classico della narrativa per ragazzi, ma rappresenta anche un capolavoro del fantastico e della satira. Dietro la favolosa descrizione delle immaginarie popolazioni di Lilliput, Brobdingnag, Laputa e Huyhnhnmlandia, la sferzante penna di Swift ritrae le assurdità e i difetti dell\'Europa settecentesca. Introduzione di Fabio Giovannini.', 256, 3.32, 'Newton Compton Editori', '2015', 'Avventura'),
('9787532761296', 'La bussola d’oro ', 'Philip Pullman', 'Lyra vive al Jordan College di Oxford. Oxford non è lontana da Londra, e Londra è in Inghilterra. Il mondo di Lyra però è ben diverso dal nostro. Oltre l\'Oceano c\'è l\'America, ma lo stato più importante di quel continente si chiama Nuova Francia; giganteschi orsi corazzati regnano sull\'Artico e ogni essere umano ha il suo daimon: una parte di sé di sesso opposto al proprio, grazie al quale nessuno deve temere la solitudine. Questo mondo attraversa un periodo critico: nella luce misteriosa dell\'Aurora Boreale cade una Polvere di provenienza ignota, dalle proprietà oscure. Uomini di scienza, autorità civili e religiose se ne interessano e ne hanno paura. L\'intrepida Lyra, a soli undici anni, si trova al centro degli intrighi e, quando intuisce segreti pericolosi e inquietanti, decide di andare alla ricerca della verità grazie anche all\'aiuto di una sorta di bussola d\'oro, che serve appunto a misurarla, quella verità... Una storia straordinaria, una fantasmagoria di incredibili invenzioni che procede a ritmo incalzante in una lussureggiante molteplicità di toni: il favoloso e l\'immaginifico, l\'epico e il drammatico, il lirico e il mistico... Il romanzo di Pullman è un\'allegoria della condizione umana che riesce a proporre in un\'avventura mozzafiato i grandi temi della riflessione filosofica compenetrandoli alla narrazione, riuscendo così a far vibrare le nostre corde più profonde, a emozionarci e a rinnovare in noi i grandi interrogativi fondamentali. Età di lettura: da 12 anni.', 368, 5.4, 'Salani', '2019', 'Fantasy'),
('9787538729368', 'Ventimila leghe sotto i mari ', 'Jules Verne', 'Scritto nel 1870, il romanzo di Jules Verne, tra i più celebri dello scrittore francese, è stato ripreso nel corso del Novecento da innumerevoli adattamenti televisivi e cinematografici. Pensato come il primo volume di una trilogia, fin da subito il romanzo accese l\'immaginazione dei contemporanei, per la straordinaria visione di un sottomarino in grado di esplorare il fondo dei mari. Una nave, difatti, l\'Abraham Lincoln, viene incaricata di catturare un misterioso mostro marino. Nell\'equipaggio spiccano il naturalista, professore Aronnax, il servo Conseil e il fiocinatore Ned Land. Travolti da un\'ondata, i tre vengono raccolti proprio dal \"mostro marino\", il Nautilus, guidato dal misterioso capitano Nemo, un uomo che rifugge il consesso civile, si schiera talvolta a sostegno degli oppressi e peraltro si sente un perseguitato. Insieme al capitano Nemo, avranno modo di percorrere in lungo e in largo gli oceani, alla riscoperta delle rovine dell\'Atlantide perduta e lottando contro piovre gigantesche, fino al sorprendente finale.', 484, 8.5, 'Feltrinelli', '2018', 'Avventura'),
('9788370011314', 'L\'isola del dottor Moreau', 'Herbert George Wells', 'Un uomo di nome Pendrick, a seguito di un naufragio nel Pacifico, viene accolto a bordo di un\'imbarcazione piena di animali di proprietà di un tale Montgomery e del suo assistente M\'Ling, un individuo deforme e dal comportamento bizzarro. I due uomini conducono Pendrick su un\'isola sconosciuta fuori dalle rotte, abitata da un singolo individuo (o almeno è quello che sembra): il dottor Moreau, un medico eccentrico il cui nome non è del tutto nuovo a Pendrick. Sembra infatti che da Londra, un certo dottor Moreau, era stato allontanato dopo che erano emersi alcuni suoi esperimenti raccapriccianti sulla vivisezione. Il giorno dopo al suo arrivo, Pendrick ha un incredibile incontro che un gruppo di uomini dalle fattezze simili a quelle dei maiali. Queste creature lo inseguono, ma Pendrick riesce in qualche modo a seminarle, stordendo uno di essi che rimane riverso a terra, mostrandosi in tutta la sua mostruosità. Sconvolto, Pendrick chiede spiegazioni a Montgomery che però si rifiuta di offrire chiarimenti. Durante la sua permanenza sull\'isola, l\'uomo verrà a conoscenza degli orribili esperimenti del dottor Moreau, volti ad umanizzare gli animali. Ma qualcosa andrà storto.', 126, 5.02, 'Ugo Mursia Editore', '2008', 'Horror'),
('9788373191723', 'Il signore degli anelli ', 'John R. R. Tolkien', 'Il \"Signore degli Anelli\" è un romanzo d\'eccezione, al di fuori del tempo: chiarissimo ed enigmatico, semplice e sublime. Esso dona alla felicità del lettore avventure in luoghi remoti e terribili, episodi d\'inesauribile allegria, segreti paurosi che si svelano a poco a poco, draghi crudeli e alberi che camminano, città d\'argento e di diamante poco lontane da necropoli tenebrose in cui dimorano esseri che spaventano solo al nominarli, urti giganteschi di eserciti luminosi e oscuri; e tutto questo in un mondo immaginario ma ricostruito con cura meticolosa, e in effetti assolutamente verosimile, perché dietro i suoi simboli si nasconde una realtà che dura oltre e malgrado la storia: la lotta, senza tregua, fra il bene e il male. Leggenda e fiaba, tragedia e poema cavalleresco, il romanzo di Tolkien è in realtà un\'allegoria della condizione umana che ripropone in chiave moderna i miti antichi.', 1255, 11.3, 'Quirino Principe', '2014', 'Fantasy'),
('9788422642138', 'Il giro del mondo in 80 giorni', 'Jules Verne', 'alutato fin dal suo apparire, nel 1873, da un eccezionale successo di pubblico, I! giro del mondo in ottanta giorni è forse ancora oggi il romanzo più famoso e amato di Jules Verne: il flemmatico, inscalfibile, metodico Phileas Fogg e il suo fedele cameriere Passepartout formano un\'indimenticabile coppia ormai stabilmente entrata a far parte dell\'immaginario di intere generazioni di lettori (giovani e non), affascinati - anzi, \"sedotti\", come scrisse Jean Cocteau, che di questo libro fu un fervente ammiratore - dalla pirotecnica girandola di avventure nei luoghi più disparati del globo, che la fantasia dello scrittore riesce a rendere meravigliosamente \"possibili\", trasmettendoci la stessa formidabile euforia dei suoi personaggi.', 190, 8.99, 'Newton Compton Editori', '2016', 'Avventura'),
('9788467245707', 'Alla corte dei Borgia ', 'Jeanne Kalogridis', '1492, Sancia d\'Aragona, figlia del re Alfonso II di Napoli, viene data in sposa a Goffredo Borgia, l\'ultimogenito del pontefice Alessandro VI, al secolo Rodrigo Borgia, uomo potente e corrotto che sogna di dominare l\'Italia. Un matrimonio combinato che ha come scopo proteggere Napoli dalle ambizioni di Luigi di Francia, ottenere l\'alleanza con la Spagna e ampliare il potere del Papa. A Roma Sancia si trova circondata dalla grandezza della Città Eterna, ma anche avviluppata in una stretta trama di intrighi. La temibile Lucrezia sarà sua alleata o nemica? E Cesare Borgia diventerà un amante appassionato o il suo peggior nemico? Sulle orme della storia, Sancia s\'addentra in un difficile cammino scoprendo doti che non sospettava di avere. E per sopravvivere, dovrà diventare più spietata dei suoi avversari.', 590, 2.99, 'TEA', '2017', 'Storico'),
('9788475968513', 'Il Sirmarillion ', 'John R. R. Tolkien', 'Il Silmarillion, iniziato nel 1917 e la cui elaborazione è stata proseguita da Tolkien fino alla morte, rappresenta il tronco da cui si sono diramate tutte le sue successive opere narrative. \"Opera prima\", dunque, essa costituisce il repertorio mitico di Tolkien, quello da cui è derivata la filiazione delle sue favole: Lo Hobbit, Il Signore degli Anelli, Il cacciatore di Draghi. Il Silmarillion, che comprende cinque racconti legati come i capitoli di un\'unica storia sacra, narra la parabola di una caduta: dalla \"musica degli inizi\", il momento cosmogonico, alla guerra di Elfi e Uomini contro l\'Avversario. L\'ultimo dei racconti costituisce l\'antecedente immediato del Signore degli Anelli.', 682, 8.99, 'Bompiani', '2013', 'Fantasy'),
('9788496246522', 'Il conte di Montecristo ', 'Alexandre Dumas', 'Nel febbraio del 1815, a Marsiglia, il marinaio Edmond Dantès viene falsamente accusato di bonapartismo e arrestato nel giorno delle nozze, alle soglie di una brillante carriera navale. Durante la prigionia nel castello d\'If, uno scoglio in mezzo al mare, affina un odio feroce per gli autori della sua rovina e, quando l\'amicizia con un altro prigioniero gli procura l\'evasione nonché un favoloso tesoro, ne farà lo strumento di una vendetta grandiosa e spietata. Le mille identità che il conte assume per preparare la trappola ai suoi nemici, i suoi viaggi, gli avvelenamenti, gli intrighi, le scomparse, i ritorni: questo grande fiume creato dalla penna infaticabile di Dumas sa far voltare pagina come pochi altri, con la stessa urgenza con cui i lettori di due secoli fa aspettavano l\'uscita della puntata successiva.', 1249, 10.5, 'BUR Biblioteca Univ. Rizzoli', '2013', 'Avventura'),
('9788497592581', 'Il nome della rosa', 'Umberto Eco', 'Ultima settimana del novembre 1327. Il novizio Adso da Melk accompagna in un\'abbazia dell\'alta Italia frate Guglielmo da Baskerville, incaricato di una sottile e imprecisa missione diplomatica. Ex inquisitore, amico di Guglielmo di Occam e di Marsilio da Padova, frate Guglielmo si trova a dover dipanare una serie di misteriosi delitti (sette in sette giorni, perpetrati nel chiuso della cinta abbaziale) che insanguinano una biblioteca labirintica e inaccessibile. Per risolvere il caso, Guglielmo dovrà decifrare indizi di ogni genere, dal comportamento dei santi a quello degli eretici, dalle scritture negromantiche al linguaggio delle erbe, da manoscritti in lingue ignote alle mosse diplomatiche degli uomini di potere. La soluzione arriverà, forse troppo tardi, in termini di giorni, forse troppo presto, in termini di secoli.', 624, 7.56, 'Bompiani', '2019', 'Storico'),
('9788498890372', 'The Witcher: il guardiano degli innocenti', 'Andrzej Sapkowski', 'Geralt è uno strigo, un individuo più forte e resistente di qualsiasi essere umano, che si guadagna da vivere uccidendo quelle creature che sgomentano anche i più audaci: demoni, orchi, elfi malvagi... Strappato alla sua famiglia quand\'era soltanto un bambino, Geralt è stato sottoposto a un durissimo addestramento, durante il quale gli sono state somministrate erbe e pozioni che lo hanno mutato profondamente. Non esiste guerriero capace di batterlo e le stesse persone che lo assoldano hanno paura di lui. Lo considerano un male necessario, un mercenario da pagare per i suoi servigi e di cui sbarazzarsi il più in fretta possibile. Anche Geralt, però, ha imparato a non fidarsi degli uomini: molti di loro nascondono decisioni spietate sotto la menzogna del bene comune o diffondono ignobili superstizioni per giustificare i loro misfatti. Spesso si rivelano peggiori dei mostri ai quali lui dà la caccia. Proprio come i cavalieri che adesso sono sulle sue tracce: hanno scoperto che Geralt è gravemente ferito e non vogliono perdere l\'occasione di eliminarlo una volta per tutte. Per questo lui ha chiesto asilo a Nenneke, sacerdotessa del tempio della dea Melitele e guaritrice eccezionale, nonché l\'unica persona che può aiutarlo a ritrovare Yennefer, la bellissima e misteriosa maga che gli ha rubato il cuore...', 372, 2.99, 'Nord', '2019', 'Fantasy'),
('978877089125', 'I pilastri della terra ', 'Ken Follett', '\r\nUn mystery, una storia d\'amore, una grande rievocazione storica: nella sua opera più ambiziosa e acclamata, Ken Follett tocca una dimensione epica, trasportandoci nell\'Inghilterra medievale al tempo della costruzione di una cattedrale gotica. Intreccio, azione e passioni si sviluppano così sullo sfondo di un\'era ricca di intrighi e cospirazioni, pericoli e minacce, guerre civili, carestie, conflitti religiosi e lotte per la successione al trono. Con la stessa suspense che caratterizza tutti i suoi thriller, Follett ricrea un\'epoca scomparsa e affascinante. Foreste, castelli e monasteri sono l\'avvolgente paesaggio, mosso dai ritmi della vita quotidiana e dalla pressione di eventi storici e naturali entro il quale per circa quarant\'anni si confrontano e si scontrano le segrete aspirazioni e i sentimenti dei protagonisti - monaci, mercanti, artigiani, nobili, fanciulle misteriose -, vittime o pedine di avvenimenti che ne segnano i destini e rimettono continuamente in discussione la costruzione della cattedrale.', 1049, 7.99, 'Mondadori', '2016', 'Storico'),
('9788804548959', 'Le cronache di Narnia', 'Clive S. Lewis', 'Viaggi fino alla fine del mondo, creature fantastiche, epiche battaglie tra il bene e il male: cosa avrebbe potuto aspettarsi di più un lettore? Scritto nel 1949 da C.S. Lewis, \"Il leone, la strega e l\'armadio\" inaugurò la serie dei sette volumi che sarebbero divenuti celebri come \"Le Cronache di Narnia\". Un capolavoro che trascende il genere fantasy, ormai riconosciuto tra i classici della letteratura inglese del Novecento. C.S. Lewis lo scrisse con la dichiarata intenzione di rivolgersi ai bambini, ma non solo a loro. Era convinto, infatti, che \"un libro non merita di essere letto a dieci anni se non merita di essere letto anche a cinquanta\". Un\'incredibile girandola di personaggi (fauni, ninfe, streghe, animali parlanti, eroici guerrieri), per il ritmo incalzante dell\'avventura, ma anche per l\'insolito spessore che tradisce l\'immensa cultura di un autentico scrittore, noto medievalista dell\'Università di Oxford, capace di attingere dalla vasta letteratura inglese quanto dalle allegorie dantesche. La presente edizione offre al pubblico italiano il testo integrale delle \"Cronache di Narnia\" in un unico volume, con un breve saggio in appendice in cui Lewis stesso spiega cosa significhi per lui \"scrivere per i bambini\". Età di lettura: da 10 anni.', 841, 7.99, 'Mondadori', '2014', 'Fantasy'),
('9788821519666', 'Il Corsaro Nero', 'Emilio Salgari', 'Paalido, sempre vestito di nero, il Cavaliere di Roccabruna, Signore di Ventimiglia, divenuto corsaro per vendicare il fratello ucciso a tradimento dal duca Wan Guld, al soldo degli spagnoli, è uno dei personaggi più celebri del romanzo d\'avventura italiano. Abbordaggi, battaglie, duelli, ma anche l\'amore che colpisce in modo inaspettato.', 320, 7.99, 'BUR Biblioteca Univ. Rizzoli', '2018', 'Avventura'),
('9788830455436', 'Il destino del faraone', 'Clive Cussler,', NULL, 416, 11.99, 'Longanesi', '2020', 'Avventura'),
('9788834710470', 'Il ciclo di Belgariad', 'David Eddings', 'Nella notte dei tempi il Dio Aldur rubò una pietra alle stelle e ne fece un gioiello prezioso, il Globo. Il potere del gioiello era grande e l\'avido Dio Torak lo volle per sé perché attraverso di esso avrebbe avuto il dominio sull\'occidente. Ma quando tese la mano per toccarlo, il Globo lo divorò con le sue fiamme. Ora Torak giace nel sonno senza fine della sofferenza e la pietra del potere non è più in suo possesso. Ma Zedar l\'Apostata, discepolo prediletto, prepara il suo ritorno. Le sue trame segrete si intrecciano come i fili di una ragnatela e il giovane Garion, la cui vita trascorre serena in una fattoria dell\'ovest, scoprirà il peso del proprio destino. Il libro contiene i romanzi: Il segno della profezia; La regina della stregoneria.', 544, 10.2, 'Fanucci', '2013', 'Fantasy'),
('9788868365', 'It', 'Stephen King', 'A Derry , una piccola cittadina del Maine, l\'autunno si è annunciato con una pioggia torrenziale che sembra non finire mai. Per un bambino come George Denbrough, ben coperto dal suo impermeabile giallo, il più grande divertimento è seguire la barchetta di carta che gli ha costruito il fratello maggiore Bill. Ma le strade sono sdrucciolevoli e George rischia di perdere il suo giocattolo, che infatti si infila in un canale di scolo lungo il marciapiede e sparisce nelle viscere della terra. Cercare di recuperarlo è l\'ultimo gesto di George: una creatura spaventosa travestita da clown gli strappa un braccio uccidendolo. A combattere It, il mostro misterioso che prende la forma delle nostre peggiori paure, rimangono Bill e il gruppo di amici con i quali ha fondato il Club dei Perdenti, sette ragazzini capaci di immaginare un mondo senza mostri. Ma It è un nemico implacabile e per sconfiggerlo i ragazzi devono affrontare prove durissime e rischiare la loro stessa vita. E se l\'estate successiva, che li ritrova giovani adulti, sembra quella della sconfitta di It, i Perdenti sanno di dover fare una promessa: qualunque cosa succeda, torneranno a Derry per combattere ancora.', 1216, 18.62, 'Sperling & Kupfer', '2019', 'Horror'),
('9788875219451', 'I vivi e I morti ', 'Andrea Gentile', 'A Masserie di Cristo, lungo le pendici del Monte Capraro, nel cuore di un Sud viscerale, fantasmagorico e magico, i vivi e i morti s\'incontrano, talvolta senza riconoscersi. E non sono né vivi né morti. In questo luogo inesistente e remoto, la giovane Assuntina è scomparsa, e tutto il villaggio non si dà pace. Tebaldo costringe la piccola figlia Italia a ucciderlo, e la madre la punisce rinchiudendola in una cantina. In un infernale carcere sotterraneo un Custode meticoloso e malinconico assegna punizioni terribili a rei e innocenti e scrive lettere amareggiate a se stesso, mentre la guerra fra le fazioni del paese disarticola l\'ordine già precario del mondo. Il tempo ricomincerà ancora una volta - ma si tratta di Genesi o Apocalisse? - e un Noi collettivo, transitorio e ipnotico, potrà narrare finalmente la follia degli uomini. Esiste solo il movimento infinito, il racconto che si racconta sempre di nuovo, per i vivi e per i morti. In questa storia ogni luce danza con le ombre, ogni spiegazione semplice e razionale dei fatti precipita in uno strapiombo di colpe oscure e inconfessabili che ci interrogano profondamente e ci scherniscono.', 549, 9.99, 'Minimum Fax', '2018', 'Horror'),
('9788897594116', 'I promessi sposi ', 'Alessandro Manzoni', NULL, 1328, 1.99, 'BUR Biblioteca Univ. Rizzoli', '2014', 'Storico'),
('9789575457051', 'Guerra e pace ', 'Lev Tolstoj', 'Sette anni occorsero a Tolstoj (dal 1863 al 1869) per comporre uno dei capolavori della letteratura ottocentesca. L\'ossatura del romanzo, sullo sfondo delle guerre napoleoniche - dal 1805 alla travolgente insurrezione di tutto il popolo russo nel 1812 - è data dalle vicende di due grandi famiglie dell\'alta nobiltà, i Rostov e i Bolkonskij, depositari dei valori autentici e genuini, intrecciate a quelle dei corrotti e dissoluti Kuragin. Spiccano, nella moltitudine di personaggi, le figure di Natasa, fanciulla e poi donna di straordinaria purezza e d\'indole forte e impetuosa; del principe Andrei, che porta il suo orgoglio nella guerra, nella prigionia e nell\'infelice amore per Natasa; dell\'enigmatico e complesso Pierre Bezuchov, capace di autentica adesione al «dolore del mondo».', 1463, 12.75, 'Garzanti', '2017', 'Storico'),
('9789738459687', 'Zanna Bianca ', 'Jack London', 'Nel 1897 Jack London lasciò San Francisco per l\'Alaska sulla scia della febbre dell\'oro scoppiata in quegli anni. Tra mille peripezie raggiunse il Klondike, e proseguì al di là delle montagne, fino a Dawson City in Canada e lungo il fiume Yukon. Non trovò l\'oro che cercava ma riportò a casa qualcosa di più prezioso: un immenso tesoro di osservazioni e di ricordi che trasformò poi nelle sue opere più famose. È così che nascono alcuni dei suoi capolavori \"Il richiamo della foresta\", \"Zanna Bianca\", \"Farsi un fuoco\", \"Baitard\" dove in uno scenario di sterminate distese di neve, fiumi gelati, foreste brulle e tetre, si muovono uomini e animali legati indissolubilmente dalle leggi di natura che li costringono a lottare per la vita, uccidere per non essere uccisi, giocare d\'astuzia, combattere gli istinti più selvaggi.', 500, 5.4, 'Einaudi', '2018', 'Avventura'),
('9789739618199', 'Robinson Crusoe ', 'Daniel Defoe', 'Defoe è concordemente giudicato dalla critica uno dei creatori del realismo moderno, e \"Robinson Crusoe\" (ritenuto da alcuni il suo capolavoro) è senz\'altro uno dei libri più celebri e amati di tutta la letteratura inglese. Generazioni e generazioni di lettori di ogni paese e ogni età - anche giovanissimi - sono approdati sull\'isola deserta con l\'intrepido naufrago, hanno sfidato con lui le forze contrarie della natura, hanno partecipato ai suoi sforzi umili, tenaci e vittoriosi, hanno stretto amicizia con Venerdì... Ma \"Robinson Crusoe\" è molto più di uno splendido romanzo di avventure: è anche un\'opera straordinaria (divenuta in breve un vero paradigma per filosofi ed economisti) che riuscì a interpretare con sorprendente precisione le idee, i fermenti e i miti del proprio tempo. Introduzione di Riccardo Reim.', 281, 4.16, 'Newton Compton Editori', '2016', 'Avventura');

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamenti`
--

CREATE TABLE `pagamenti` (
  `ID` int(11) NOT NULL,
  `IDUtente` int(11) NOT NULL,
  `ISBNLibro` varchar(13) NOT NULL,
  `Data` varchar(30) NOT NULL,
  `Importo` double NOT NULL,
  `NumeroCarta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `pagamenti`
--

INSERT INTO `pagamenti` (`ID`, `IDUtente`, `ISBNLibro`, `Data`, `Importo`, `NumeroCarta`) VALUES
(1, 1, '9788868365', '2020-13-02 12:45:25', 18.62, '123456'),
(3, 1, '9780460007672', '2020-13-02 10:06:29', 6.9, '123456'),
(4, 1, '9780816156856', '2020-14-02 12:46:04', 11.9, '123456'),
(5, 1, '9780199193295', '2020-14-02 12:47:17', 8.5, '123456'),
(6, 1, '9781615701292', '2020-14-02 12:47:56', 8.18, '123456'),
(7, 1, '978877089125', '2020-14-02 12:49:00', 7.99, '123456');

-- --------------------------------------------------------

--
-- Struttura della tabella `tokens`
--

CREATE TABLE `tokens` (
  `Token` varchar(128) NOT NULL,
  `ID_Utente` int(11) NOT NULL,
  `Scadenza` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `tokens`
--

INSERT INTO `tokens` (`Token`, `ID_Utente`, `Scadenza`) VALUES
('123456789', 1, '10/03/2020 00:00:00'),
('1b98098a2d4087ba0fd99f82a03aa561', 1, '2020-11-02 12:56:10'),
('be9ec76da004483021f758a76ebad80c', 1, '2020-12-02 10:50:55');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(50) NOT NULL,
  `Cognome` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `NumeroCarta` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID`, `Nome`, `Cognome`, `Email`, `Password`, `NumeroCarta`) VALUES
(1, 'Mario', 'Rossi', 'mario.rossi@unicam.it', '8e0e5bc49abf8f71f32907b67a3bea2628d6bd6d4f74c92c0979f0a4a6750a36', '123456'),
(4, 'Luigi', 'Bianchi', 'luigi.bianchi@unicam.it', '395860aec5db0c4292cde0d6c2ff46b7d910a976ca1a7a3c2fd9ca9e4c765586', '345678');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `librerie`
--
ALTER TABLE `librerie`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `possiede` (`IDUtente`),
  ADD KEY `appartiene` (`ISBNLibro`);

--
-- Indici per le tabelle `libri`
--
ALTER TABLE `libri`
  ADD PRIMARY KEY (`ISBN`);

--
-- Indici per le tabelle `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `effettuato` (`IDUtente`),
  ADD KEY `acquista` (`ISBNLibro`);

--
-- Indici per le tabelle `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`Token`),
  ADD KEY `token_id_utente` (`ID_Utente`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `librerie`
--
ALTER TABLE `librerie`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `librerie`
--
ALTER TABLE `librerie`
  ADD CONSTRAINT `appartiene` FOREIGN KEY (`ISBNLibro`) REFERENCES `libri` (`ISBN`),
  ADD CONSTRAINT `possiede` FOREIGN KEY (`IDUtente`) REFERENCES `utenti` (`ID`);

--
-- Limiti per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  ADD CONSTRAINT `acquista` FOREIGN KEY (`ISBNLibro`) REFERENCES `libri` (`ISBN`),
  ADD CONSTRAINT `effettuato` FOREIGN KEY (`IDUtente`) REFERENCES `utenti` (`ID`);

--
-- Limiti per la tabella `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `token_id_utente` FOREIGN KEY (`ID_Utente`) REFERENCES `utenti` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
