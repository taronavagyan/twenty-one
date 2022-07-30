const shuffle = require("shuffle-array");
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  getRank() {
    return this.rank;
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

  tallyScore(hand) {
    let ranks = hand.map((card) => card.getRank());
    return ranks.reduce((total, rank) => {
      if (Number(rank)) return (total += Number(rank));

      if (["K", "Q", "J"].includes(rank[0])) {
        return (total += 10);
      } else {
        return (total += 11);
      }
    }, 0);
  }

  playerTurn() {
    // STUB
  }

  dealerTurn() {
    // STUB
  }

  displayWelcomeMessage() {
    console.log("Welcome to 21. Good luck!");
    console.log("");
  }

  displayResult() {
    // STUB
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing 21. See you soon!");
    console.log("");
  }
}

let game = new TwentyOneGame();
game.start();
