const shuffle = require("shuffle-array");
class Card {
  constructor(suit, rank) {
    // STUB
    // What sort of suit does a card need?
    // Rank? Suit? Points?
    this.suit = suit;
    this.rank = rank;
  }
}

class Deck {
  static SUITS = ["SPADES", "CLUBS", "HEARTS", "DIAMONDS"];
  static RANKS = [
    "ACE",
    "KING",
    "QUEEN",
    "JACK",
    "10",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
  ];
  constructor() {
    this.deck = [];
    for (let suitIdx = 0; suitIdx < 4; suitIdx += 1) {
      for (let rankIdx = 0; rankIdx < 13; rankIdx += 1) {
        let suit = Deck.SUITS[suitIdx];
        let rank = Deck.RANKS[rankIdx];
        this.deck.push(new Card(suit, rank));
      }
    }
    shuffle(this.deck);
  }

  deal() {
    // STUB
    // does the dealer or the deck deal?
  }
}

class Participant {
  constructor() {
    // STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? All the redundant behaviors from Player and Dealer?
  }
}

class Player extends Participant {
  constructor() {
    // STUB
    // What sort of state does a player need?
    // Score? Hand? Amount of money available?
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  score() {
    // STUB
  }
}

class Dealer extends Participant {
  // Very similar to a Player; do we need this?

  constructor() {
    // STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
  }

  hit() {
    // STUB
  }

  stay() {
    // STUB
  }

  isBusted() {
    // STUB
  }

  score() {
    // STUB
  }

  hide() {
    // STUB
  }

  reveal() {
    // STUB
  }

  deal() {
    // STUB
    // does the dealer or the deck deal?
  }
}

class TwentyOneGame {
  constructor() {
    // STUB
    // What sort of state does the game need?
    // A deck? Two participants?
  }

  start() {
    // SPIKE
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {
    // STUB
  }

  showCards() {
    // STUB
  }

  playerTurn() {
    // STUB
  }

  dealerTurn() {
    // STUB
  }

  displayWelcomeMessage() {
    // STUB
  }

  displayResult() {
    // STUB
  }

  displayGoodbyeMessage() {
    // STUB
  }
}

let game = new TwentyOneGame();
game.start();
