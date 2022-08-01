const shuffle = require("shuffle-array");
const readline = require("readline-sync");
class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.isHidden = false;
  }

  getRank() {
    return this.rank;
  }

  hide() {
    this.isHidden = true;
  }

  reveal() {
    this.isHidden = false;
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
  constructor(balance) {
    this.balance = balance || 5;
    this.hand = [];
  }

  resetHand() {
    this.hand = [];
  }

  score() {
    if (this.hand.some((card) => card.isHidden)) {
      return TwentyOneGame.RANK_VALUES[this.hand[0].getRank()] + " + ?";
    }

    let cardRanks = this.hand.map((card) => card.getRank());

    let cardValues = cardRanks.map((rank) => TwentyOneGame.RANK_VALUES[rank]);

    let total = cardValues.reduce((a, b) => a + b);

    while (total > 21 && cardValues.includes(11)) {
      cardValues = cardValues.map((value) => {
        if (value === 11) {
          return 1;
        }
        return value;
      });
    }

    return cardValues.reduce((a, b) => a + b);
  }

  addToHand(card) {
    this.hand.push(card);
  }

  displayHand() {
    this.hand.forEach((card) => {
      if (card.isHidden) {
        console.log("> ???");
      } else {
        console.log(`> ${card.rank} of ${card.suit}`);
      }
    });
    console.log("Score: " + this.score());
    console.log("");
  }

  resetHand() {
    this.hand = [];
  }

  hit() {
    console.log("Player hits...");
  }

  stay() {
    return false;
  }

  isBusted() {
    return this.score() > 21;
  }

  hasTwentyOne() {
    return this.score() === 21;
  }
}

class Player extends Participant {
  constructor() {
    super();
  }

  hit() {
    console.log("You hit...");
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  hit() {
    console.log("Dealer hits...");
  }

  hide() {
    this.hand[1].hide();
  }

  reveal() {
    this.hand[1].reveal();
  }
}

class TwentyOneGame {
  static RANK_VALUES = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK: 10,
    QUEEN: 10,
    KING: 10,
    ACE: 11,
  };
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.reset();
  }

  reset() {
    this.deck = new Deck();
    this.player.resetHand();
    this.dealer.resetHand();
    this.winner = null;
    this.loser = null;
  }

  start() {
    console.clear();
    this.displayWelcomeMessage();
    do {
      this.reset();
      this.dealCards();
      this.dealer.hide();
      this.showCards();
      this.playerTurn();
      console.log("");
      this.dealerTurn();
      this.displayResult();
      if (this.winner && this.winner.balance === 10) {
        if (this.winner === this.player) {
          console.log("The house is broke!");
        } else {
          console.log("It seems like you've run out of money...");
        }
        break;
      }
    } while (this.playAgain());
    this.displayGoodbyeMessage();
  }

  playAgain() {
    let response;

    while (!"yn".includes(response)) {
      response = readline
        .question("Would you like to play again? ")
        .toLowerCase()[0];
    }
    console.clear();
    return response === "y";
  }

  dealCards() {
    for (let cardNum = 0; cardNum < 2; cardNum += 1) {
      this.player.addToHand(this.deck.getTopCard());
      this.dealer.addToHand(this.deck.getTopCard());
    }
  }

  showCards() {
    console.log("Your cards... ");
    this.player.displayHand();
    console.log("Dealer's cards... ");
    this.dealer.displayHand();
  }

  playerTurn() {
    if (this.player.hasTwentyOne()) {
      console.log("You have 21!");
      return;
    }
    while (this.getPlayerMove() === "h") {
      console.clear();
      this.player.hit();
      this.player.addToHand(this.deck.getTopCard());
      this.showCards();

      if (this.player.hasTwentyOne() || this.player.isBusted()) {
        return;
      }
    }
  }

  getPlayerMove() {
    let response;
    while (true) {
      console.log("Would you like to hit or stay? (h/s)");
      let response = readline.question().toLowerCase()[0];

      if (!"hs".includes(response)) {
        console.log("Invalid response... Try again.");
      } else {
        return response;
      }
    }
  }

  dealerTurn() {
    if (this.player.isBusted()) return;
    this.dealer.reveal();
    console.log("Dealer's cards...");
    this.dealer.displayHand();

    while (this.dealer.score() < 17) {
      this.dealer.hit();
      this.dealer.addToHand(this.deck.getTopCard());
      this.dealer.displayHand();
    }
  }

  pay() {
    if (this.winner === null) return;
    this.winner.balance += 1;
    this.loser.balance -= 1;
  }

  displayWelcomeMessage() {
    console.log("Welcome to 21. Good luck!");
    console.log("");
  }

  displayResult() {
    this.dealer.reveal();
    console.clear();
    this.showCards();
    if (this.player.isBusted()) {
      console.log("You busted.");
      console.log("Dealer wins!");
      [this.winner, this.loser] = [this.dealer, this.player];
    } else if (this.dealer.isBusted()) {
      console.log("Dealer busts.");
      console.log("You win!");
      [this.winner, this.loser] = [this.player, this.dealer];
    } else if (this.player.score() < this.dealer.score()) {
      console.log("Dealer wins!");
      [this.winner, this.loser] = [this.dealer, this.player];
    } else if (this.player.score() === this.dealer.score()) {
      console.log("It's a tie!");
    } else {
      console.log("You win!");
      [this.winner, this.loser] = [this.player, this.dealer];
    }
    this.pay();
    console.log("");
    console.log(
      `Your balance: ${this.player.balance} || Dealer's balance: ${this.dealer.balance}`
    );
    console.log("");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing 21. See you soon!");
    console.log("");
  }
}

let game = new TwentyOneGame();
game.start();

let player = new Player();
player.hand = game.player.hand;
