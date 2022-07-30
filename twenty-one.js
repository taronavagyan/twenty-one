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
    this.reset();
  }

  reset() {
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

  getTopCard() {
    return this.deck.shift();
  }
}

class Participant {
  constructor() {
    this.balance = 5;
    this.score = 0;
    this.hand = [];
    // STUB
    // What sort of state does a participant need?
    // Score? Hand? Amount of money available?
    // What else goes here? All the redundant behaviors from Player and Dealer?
  }

  addToHand(card) {
    this.hand.push(card);
  }

  resetHand() {
    this.hand = [];
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

class Player extends Participant {
  constructor() {
    super();
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  hide() {
    // STUB
  }

  reveal() {
    // STUB
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();

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
    for (let cardNum = 0; cardNum < 2; cardNum += 1) {
      this.player.addToHand(this.deck.getTopCard());
      this.dealer.addToHand(this.deck.getTopCard());
    }
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

console.log(game.player.hand);
console.log(game.dealer.hand);
