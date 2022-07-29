(() => {
  "use strict";
  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosGame = [];

  // todo Referencia HTML

  const btnNuevo = document.querySelector("#btnNuevo"),
    btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    marcadores = document.querySelectorAll("span"),
    addCard = document.querySelectorAll(".cartas");

  // ? Inciar el Juego

  const startGame = (numJugadores = 2) => {
    console.clear();
    deck = crearDeck();
    puntosGame = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosGame.push(0);
    }
    marcadores.forEach((elem) => (elem.innerText = 0));
    addCard.forEach((elem) => (elem.innerHTML = ""));
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  // ? Creación del deck
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(`${i}${tipo}`);
      }
    }

    for (const esp of especiales) {
      for (const tipo of tipos) {
        deck.push(`${esp}${tipo}`);
      }
    }
    // * Metodos para hacer shuffle
    // deck = _.shuffle(deck);
    // let shuffleDeck = deck.sort((a, b) => 0.5 - Math.random());
    // console.log(shuffleDeck);
    return deck;
  };

  // ? Tomar una carta

  const perdirCarta = () => {
    if (deck.length === 0) {
      throw "No hay más cartas en el deck";
    }
    deck = _.shuffle(deck);
    return deck.pop();
  };

  // ? Extraer valor de la carta

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  // ? Acumulador de puntos

  const acumuladorPuntos = (carta, turno) => {
    puntosGame[turno] = puntosGame[turno] + valorCarta(carta);
    marcadores[turno].innerText = puntosGame[turno];
    return puntosGame[turno];
  };

  // ? ModificarDOM => Carta

  const createCardDOM = (carta, turno) => {
    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    addCard[turno].append(imgCarta);
  };

  // ? test Ganador

  const winLose = () => {
    const [puntosMinimos, puntosIA] = puntosGame; // Desestructuración de arreglos

    setTimeout(() => {
      (puntosMinimos > puntosIA && puntosMinimos <= 21) || puntosIA > 21
        ? alert("¡El jugador Gana!")
        : puntosMinimos > 21 || (puntosMinimos < puntosIA && puntosIA <= 21)
        ? alert("¡La IA es el Ganador!")
        : alert("¡Empatados!");
    }, 100);
  };

  // * Turno de la IA
  const turnoIA = (puntosMinimos) => {
    let puntosIA = 0;
    do {
      const carta = perdirCarta();
      puntosIA = acumuladorPuntos(carta, puntosGame.length - 1);
      createCardDOM(carta, puntosGame.length - 1);
    } while (puntosMinimos > puntosIA && puntosMinimos <= 21);
    winLose();
  };

  // ? Eventos

  // * Pedir

  btnPedir.addEventListener("click", () => {
    const carta = perdirCarta(),
      puntosJugador = acumuladorPuntos(carta, 0);
    createCardDOM(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoIA(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn("21, ¡Enhorabuena!");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoIA(puntosJugador);
    }
  });

  // * Detener

  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoIA(puntosGame[0]);
  });

  // * Nuevo Juego

  btnNuevo.addEventListener("click", () => {
    startGame();
  });
})();
