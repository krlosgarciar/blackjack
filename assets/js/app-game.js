/*
2C = Two of Clubs     (Tréboles)
2D = Two of Diamonds  (Diamante)
2H = Two of Hearts    (Corazón)
2S = Two of Spades    (Espadas)
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosIA = 0;

// todo Referencia HTML

const btnPedir = document.querySelector("#btnPedir");
const marcadores = document.querySelectorAll("span");
const addCard = document.querySelectorAll(".cartas");

// ? Creación del deck
const crearDeck = () => {
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
  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);

  // * Otro metedo para hacer shuffle |Por probar|
  // let shuffleDeck = deck.sort((a, b) => 0.5 - Math.random());
  // console.log(shuffleDeck);

  return deck;
};

crearDeck();

// ? Tomar una carta

const perdirCarta = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en el deck";
  }
  deck = _.shuffle(deck);
  const carta = deck.pop();
  // console.log(deck);
  // console.log(carta);
  return carta;
};

// perdirCarta();

// ? Extraer valor de la carta

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// ? Eventos

btnPedir.addEventListener("click", () => {
  const carta = perdirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);

  marcadores[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;

  addCard[0].append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Lo siento, perdiste");
    btnPedir.disabled = true;
  } else if (puntosJugador === 21) {
    console.warn("21, ¡Enhorabuena!");
    btnPedir.disabled = true;
  }
});
