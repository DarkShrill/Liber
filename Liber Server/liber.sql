-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Feb 11, 2020 alle 00:57
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
  `Segnalibro` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('8858828755', 'Oceano Mare', 'Alessandro Baricco', '\'Oceano Mare\' racconta del naufragio di una fregata della marina francese, molto tempo fa, in un oceano. Gli uomini a bordo cercheranno di salvarsi su una zattera. Sul mare si incontreranno le vicende di strani personaggi. Come il professore Bartleboom che cerca di stabilire dove finisce il mare, o il pittore Plasson che dipinge solo con acqua marina, e tanti altri individui in cerca di sé, sospesi sul bordo dell\'oceano, col destino segnato dal mare. E sul mare si affaccia anche la locanda Almayer, dove le tante storie confluiscono. Usando il mare come metafora esistenziale, Baricco narra dei suoi surreali personaggi, spaziando in vari registri stilistici.', 224, 9.07, 'Feltrinelli', '2013', 'Romanzo'),
('9788868365', 'It', 'Stephen King', 'A Derry , una piccola cittadina del Maine, l\'autunno si è annunciato con una pioggia torrenziale che sembra non finire mai. Per un bambino come George Denbrough, ben coperto dal suo impermeabile giallo, il più grande divertimento è seguire la barchetta di carta che gli ha costruito il fratello maggiore Bill. Ma le strade sono sdrucciolevoli e George rischia di perdere il suo giocattolo, che infatti si infila in un canale di scolo lungo il marciapiede e sparisce nelle viscere della terra. Cercare di recuperarlo è l\'ultimo gesto di George: una creatura spaventosa travestita da clown gli strappa un braccio uccidendolo. A combattere It, il mostro misterioso che prende la forma delle nostre peggiori paure, rimangono Bill e il gruppo di amici con i quali ha fondato il Club dei Perdenti, sette ragazzini capaci di immaginare un mondo senza mostri. Ma It è un nemico implacabile e per sconfiggerlo i ragazzi devono affrontare prove durissime e rischiare la loro stessa vita. E se l\'estate successiva, che li ritrova giovani adulti, sembra quella della sconfitta di It, i Perdenti sanno di dover fare una promessa: qualunque cosa succeda, torneranno a Derry per combattere ancora.', 1216, 18.62, 'Sperling & Kupfer', '2019', 'Horror');

-- --------------------------------------------------------

--
-- Struttura della tabella `pagamenti`
--

CREATE TABLE `pagamenti` (
  `ID` int(11) NOT NULL,
  `IDUtente` int(11) NOT NULL,
  `ISBNLibro` varchar(13) NOT NULL,
  `Data` datetime NOT NULL,
  `Importo` double NOT NULL,
  `NumeroCarta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
('1b98098a2d4087ba0fd99f82a03aa561', 1, '2020-11-02 12:56:10');

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
  `NumeroCarta` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`ID`, `Nome`, `Cognome`, `Email`, `Password`, `NumeroCarta`) VALUES
(1, 'Mario', 'Rossi', 'mario.rossi@unicam.it', '8e0e5bc49abf8f71f32907b67a3bea2628d6bd6d4f74c92c0979f0a4a6750a36', '123456');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `pagamenti`
--
ALTER TABLE `pagamenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
