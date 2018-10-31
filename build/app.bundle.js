/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./js/player.js");
/* harmony import */ var _dealer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dealer */ "./js/dealer.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card */ "./js/card.js");
/* harmony import */ var _deck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deck */ "./js/deck.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page */ "./js/page.js");
/* harmony import */ var _statistics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./statistics */ "./js/statistics.js");





 // console.log(Statistics.data);
// Statistics.data.numOfWins++;
// Statistics.save();
// IIFE

(function main() {
  'use strict';

  console.log('Main'); // Game constants

  var NUM_OF_DECKS = 1,
      BLACKJACK_RATIO = 3 / 2,
      NORMAL_RATIO = 1,
      MIN_WAGER = _page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.min,
      MAX_WAGER = _page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.max; // Create player, dealer, and deck

  var player, activePlayerHand, dealer, deck;
  _page__WEBPACK_IMPORTED_MODULE_4__["addListeners"]([{
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].startGame,
    eventType: 'click',
    fn: startGame
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].makeWager,
    eventType: 'click',
    fn: validateWager
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager,
    eventType: 'keypress',
    fn: wagerInputEventHandler
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].hit,
    eventType: 'click',
    fn: playerHit
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].stand,
    eventType: 'click',
    fn: playerStand
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].doubleDown,
    eventType: 'click',
    fn: playerDoubleDown
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split,
    eventType: 'click',
    fn: playerSplitPair
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].newHand,
    eventType: 'click',
    fn: startNewHand
  }]);

  function startGame() {
    console.log('Start Game');
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].game);
    player = new _player__WEBPACK_IMPORTED_MODULE_0__["Player"](), dealer = new _dealer__WEBPACK_IMPORTED_MODULE_1__["Dealer"](), deck = new _deck__WEBPACK_IMPORTED_MODULE_3__["Deck"]();
    activePlayerHand = player.getActiveHand();
    player.renderMoney();
    startNewHand();
  }

  function startNewHand() {
    clearPreviousHand();
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].wager);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].newHand);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);
  }

  function clearPreviousHand() {
    deck.addHandToDiscardPile(player.hand.cards);
    deck.addHandToDiscardPile(dealer.hand.cards);

    if (player.hasSplitHand) {
      deck.addHandToDiscardPile(player.splitHand.cards);
      player.splitHand.clear();
      player.splitHand.render();
      player.splitHand.renderValue();
      player.splitHand = {};
    }

    player.hand.clear();
    player.clearWager();
    player.hasSplitHand = false;
    player.renderAll();
    dealer.hand.clear();
    dealer.hand.render();
    dealer.hand.renderValue();
    _page__WEBPACK_IMPORTED_MODULE_4__["clearUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].playerSplit);
    activePlayerHand = player.getActiveHand();
  }

  function validateWager() {
    var wager = parseInt(_page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.value);

    if (wager >= MIN_WAGER && wager <= MAX_WAGER && wager % 1 === 0 && player.money >= wager) {
      placeWager(wager);
    } else {
      console.log('Invalid wager.');
      _page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult.innerHTML = '';
      addToResultsLog("Invalid wager. Enter a wager between ".concat(MIN_WAGER, " and ").concat(MAX_WAGER, ". You must also have enough money!"));
    }
  }

  function placeWager(wager) {
    _page__WEBPACK_IMPORTED_MODULE_4__["clearUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].wager);
    player.wager = wager;
    player.money -= wager;
    player.renderMoney();
    player.renderWager(); // Show double down button if player has enough money to do so

    if (player.money >= wager) {
      _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].doubleDown);
    }

    dealCards();
  }

  function dealCards() {
    console.log('Deal Cards');

    for (var i = 0; i < 2; i++) {
      activePlayerHand.addCard(deck.dealCard());
      dealer.hand.addCard(deck.dealCard());
    }

    dealer.hand.cards[1].isFaceUp = false;

    if (player.canSplitPair()) {
      _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);
    }

    activePlayerHand.render();
    activePlayerHand.renderValue();
    dealer.hand.render(); // player.hand.value = 21;

    checkForBlackjacks();
  } // Only run after initial deal


  function checkForBlackjacks() {
    var playerBlackjack = activePlayerHand.checkForBlackjack(),
        dealerBlackjack = false,
        // Initialize to false
    dealerFaceUpCardValue = dealer.hand.cards[0].value; // Checks if dealer's hand is a blackjack only if their face up card is a 10, Face card, or an Ace

    if (dealerFaceUpCardValue >= 10) {
      dealerBlackjack = dealer.hand.checkForBlackjack();
    }

    if (playerBlackjack && dealerBlackjack) {
      console.log('Tie!');
      flipDealerCard();
      handleTie();
    } else if (playerBlackjack) {
      console.log('Player Blackjack!');
      flipDealerCard();
      handlePlayerBlackjack();
    } else if (dealerBlackjack) {
      console.log('Dealer Blackjack!');
      flipDealerCard();
      handleDealerBlackjack();
    } else {
      beginPlayerTurn();
    }
  }

  function flipDealerCard() {
    dealer.hand.cards[1].isFaceUp = true;
    dealer.hand.render();
  }

  function handlePlayerBlackjack() {
    var winnings = player.wager * BLACKJACK_RATIO;
    console.log("Player wins $".concat(winnings.toFixed(2), " for Blackjack on wager of $").concat(player.wager.toFixed(2), "!"));
    player.money += winnings + player.wager;
    player.renderMoney();
    addToResultsLog("Player wins $".concat(winnings.toFixed(2), " for Blackjack on $").concat(player.wager, " wager! "));
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfBlackjacks++;
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].lifetimeEarnings += winnings;
    endCurrentHand();
  }

  function handlePlayerWin() {
    console.log('player win');
    var winnings = player.wager * NORMAL_RATIO;
    console.log("Player wins $".concat(winnings.toFixed(2), " for win on wager of $").concat(player.wager.toFixed(2), "!"));
    player.money += winnings + player.wager;
    player.renderMoney();
    addToResultsLog("Player wins $".concat(winnings.toFixed(2), " on $").concat(player.wager, " wager. "));
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfWins++;
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].lifetimeEarnings += winnings;
  }

  function handlePlayerBust() {
    console.log('handle player bust');
    addToResultsLog("<br><b>Hand Result</b><br>Player bust! ");
    activePlayerHand.isCompleted = true;
    handlePlayerLoss();
    endPlayerHand();
  }

  function handlePlayerLoss() {
    var losses = player.wager;
    addToResultsLog("Player loses $".concat(losses.toFixed(2), " wager."));
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfLosses++;
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].lifetimeEarnings -= losses;
  }

  function handleDealerBlackjack() {
    addToResultsLog("<b>Dealer Blackjack!</b> ");
    handlePlayerLoss();
    endCurrentHand();
  }

  function handleTie() {
    player.money += player.wager;
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfPushes++;
    addToResultsLog("<br><b>Hand Result</b><br>Push! Player keeps wager of $".concat(player.wager, "."));
    endCurrentHand();
  }

  function handlePush() {
    player.money += player.wager;
    _statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfPushes = parseInt(_statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfPushes) + 1;
    console.log(_statistics__WEBPACK_IMPORTED_MODULE_5__["data"].numOfPushes);
    addToResultsLog("<br><b>Hand Result</b><br>Push! Player keeps wager of $".concat(player.wager, "."));

    if (!player.hasHandToCompare()) {
      endCurrentHand();
    }
  }

  function beginPlayerTurn() {
    console.log('Begin Player Turn'); // Show user options

    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
  }

  function playerHit() {
    console.log('hit');
    activePlayerHand.addCard(deck.dealCard());
    activePlayerHand.render();
    activePlayerHand.renderValue();
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].doubleDown);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);

    if (activePlayerHand.checkFor21()) {
      playerStand();
    } else if (activePlayerHand.checkForBust()) {
      console.log('player bust');
      handlePlayerBust();
    }
  }

  function playerStand() {
    console.log('Player stands');
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
    endPlayerHand();
  }

  function playerDoubleDown() {
    player.money -= player.wager;
    player.wager += player.wager;
    player.renderAll();
    playerHit(); // Hand is checked for 21/bust in playerHit()

    if (activePlayerHand.value < 21) {
      endPlayerHand();
    }
  }

  function playerSplitPair() {
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].doubleDown);
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].playerSplit);
    addToResultsLog('Splitting player hand. Currently playing main hand.');
    player.splitPair();
  }

  function endPlayerHand() {
    activePlayerHand.setToInactive();
    console.log(player.hasActiveHand());

    if (player.hasActiveHand()) {
      if (activePlayerHand.value <= 21) {
        addToResultsLog("Player stands on value of ".concat(activePlayerHand.value, "."));
      }

      activePlayerHand = player.getActiveHand();
      console.log(activePlayerHand);
      addToResultsLog('<br>Player now playing split hand.');
      beginPlayerTurn();
    } else if (player.hasHandToCompare()) {
      console.log('has hand');

      if (activePlayerHand.value <= 21) {
        addToResultsLog("Player stands on value of ".concat(activePlayerHand.value, "."));
      }

      beginDealerTurn();
    } else {
      endCurrentHand();
    }
  }

  function beginDealerTurn() {
    flipDealerCard();
    addToResultsLog('<br>Beginning dealer\'s turn.');

    while (dealer.hand.value < dealer.minimumTotal || dealer.hand.value === 17 && dealer.hand.numOfAces > 0) {
      dealer.hand.addCard(deck.dealCard());
      dealer.hand.render();
    }

    dealer.hand.renderValue();
    addToResultsLog("Dealer draws to ".concat(dealer.hand.value, "."));

    while (player.hasHandToCompare()) {
      activePlayerHand = player.getHandToCompare();
      activePlayerHand.complete();
      compareHands();
    }

    endCurrentHand();
  }

  function compareHands() {
    console.log('comparing hands');

    if (dealer.hand.value > activePlayerHand.value && dealer.hand.value <= 21) {
      addToResultsLog("<br><b>Hand Result</b><br>Dealer ".concat(dealer.hand.value, " beats player ").concat(activePlayerHand.value, ". "));
      handlePlayerLoss();
      endCurrentHand();
    } else if (dealer.hand.value === activePlayerHand.value) {
      handlePush();
    } else if (dealer.hand.checkForBust()) {
      addToResultsLog("Dealer bust! ");
      handlePlayerWin();
    } else {
      addToResultsLog("<br><b>Hand Result</b><br>Player ".concat(activePlayerHand.value, " beats dealer ").concat(dealer.hand.value, ". "));
      handlePlayerWin();
    }
  }

  function endCurrentHand() {
    console.log('end current hand');
    _statistics__WEBPACK_IMPORTED_MODULE_5__["save"]();

    if (player.money >= MIN_WAGER) {
      _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].newHand);
    } else {
      console.log('Game over!');
      addToResultsLog('You do not have enough money to play. Game over! Start a new game to continue playing.');
    }

    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
  }

  function addToResultsLog(result) {
    _page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult.innerHTML += result + "<br>";
  }

  function wagerInputEventHandler(e) {
    if (e.keyCode === 13) {
      validateWager();
    }
  }
})();

/***/ }),

/***/ "./js/card.js":
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! exports provided: Card */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
function Card(rank, suit) {
  this.rank = rank;
  this.suit = suit;
  this.isFaceUp = true;

  switch (rank) {
    case 'Ace':
      this.value = 11;
      break;

    case 'Jack':
    case 'Queen':
    case 'King':
      this.value = 10;
      break;

    default:
      this.value = rank;
  }
}

Card.prototype.toString = function () {
  return "".concat(this.rank, " of ").concat(this.suit);
};

Card.prototype.render = function () {
  var cardDiv = document.createElement('div');

  if ((this.suit === 'Hearts' || this.suit === 'Diamonds') && this.isFaceUp) {
    cardDiv.classList.add('text-red');
  }

  cardDiv.classList.add('card');

  if (!this.isFaceUp) {
    cardDiv.innerHTML = 'Hidden';
  } else {
    cardDiv.innerHTML = "<span class='card-text'>".concat(this.rank, " of ").concat(this.suit, "</span>");
  }

  return cardDiv;
};



/***/ }),

/***/ "./js/dealer.js":
/*!**********************!*\
  !*** ./js/dealer.js ***!
  \**********************/
/*! exports provided: Dealer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dealer", function() { return Dealer; });
/* harmony import */ var _person__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./person */ "./js/person.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ "./js/page.js");



function Dealer() {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].call(this);
  this.name = 'Dealer';
  this.minimumTotal = 17;
  this.hand.setDisplays(_page__WEBPACK_IMPORTED_MODULE_1__["displays"].dealerHand, _page__WEBPACK_IMPORTED_MODULE_1__["displays"].dealerTotal);
}

Dealer.prototype = Object.create(_person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype);
Object.defineProperty(Dealer.prototype, 'constructor', {
  value: Dealer,
  enumerable: false,
  writable: true
});


/***/ }),

/***/ "./js/deck.js":
/*!********************!*\
  !*** ./js/deck.js ***!
  \********************/
/*! exports provided: Deck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deck", function() { return Deck; });
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./js/card.js");


function Deck() {
  var numOfDecks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  this.cards = [];
  this.discardPile = [];
  build.call(this);
  this.shuffle();

  function build() {
    for (var i = 1; i <= 13; i++) {
      var rank = void 0;

      switch (i) {
        case 1:
          rank = 'Ace';
          break;

        case 11:
          rank = 'Jack';
          break;

        case 12:
          rank = 'Queen';
          break;

        case 13:
          rank = 'King';
          break;

        default:
          rank = i;
      }

      for (var j = 0; j < numOfDecks; j++) {
        this.cards.push(new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Spades'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Clubs'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Hearts'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Diamonds'));
      }
    }
  }
}

Deck.prototype.build = function (numOfDecks) {
  this.cards = [];

  for (var i = 1; i <= 13; i++) {
    var rank = void 0;

    switch (i) {
      case 1:
        rank = 'Ace';
        break;

      case 11:
        rank = 'Jack';
        break;

      case 12:
        rank = 'Queen';
        break;

      case 13:
        rank = 'King';
        break;

      default:
        rank = i;
    }

    for (var j = 0; j < numOfDecks; j++) {
      this.cards.push(new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Spades'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Clubs'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Hearts'), new _card__WEBPACK_IMPORTED_MODULE_0__["Card"](rank, 'Diamonds'));
    }
  }
}; // Modern Fisher-Yates shuffle algorithm introduced by Richard Durstenfeld
// Time complexity: O(n)


Deck.prototype.shuffle = function () {
  var i, j, temp;

  for (i = this.cards.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.cards[j];
    this.cards[j] = this.cards[i];
    this.cards[i] = temp;
  }
};

Deck.prototype.checkForOutOfCards = function () {
  if (this.cards.length === 0) {
    console.log('Deck out of cards. Discard pile shuffled.');
    this.cards = this.discardPile;
    this.discardPile = [];
    this.shuffle();
  }
};

Deck.prototype.dealCard = function () {
  var cardToDeal = this.cards.pop();
  cardToDeal.isFaceUp = true;
  console.log("Dealt ".concat(cardToDeal.toString()));
  this.checkForOutOfCards();
  return cardToDeal;
};

Deck.prototype.addHandToDiscardPile = function (hand) {
  this.discardPile = this.discardPile.concat(hand);
};



/***/ }),

/***/ "./js/hand.js":
/*!********************!*\
  !*** ./js/hand.js ***!
  \********************/
/*! exports provided: Hand */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hand", function() { return Hand; });
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./card */ "./js/card.js");


function Hand() {
  this.cards = [], this.value = 0, this.numOfAces = 0, this.isActive = true, // Do not change this value in the dealer's hand,
  this.isCompleted = false;
}

Hand.prototype.setDisplays = function (display, totalDisplay) {
  this.display = display;
  this.totalDisplay = totalDisplay;
};

Hand.prototype.addCard = function (card) {
  this.cards.push(card);

  if (card.rank === 'Ace') {
    this.numOfAces++;
  }

  this.updateValue();
};

Hand.prototype.updateValue = function () {
  var value = this.cards.reduce(function (acc, card) {
    return acc + card.value;
  }, 0);

  if (this.numOfAces > 0 && value > 21) {
    for (var i = 0; i < this.numOfAces; i++) {
      value -= 10;
      if (value <= 21) break;
    }
  }

  this.value = value;
};

Hand.prototype.render = function () {
  var display = this.display;
  this.display.innerHTML = '';
  this.cards.forEach(function (card) {
    display.appendChild(card.render());
  });
};

Hand.prototype.renderValue = function () {
  var value = this.value > 0 ? this.value : "";
  this.totalDisplay.innerHTML = value;
};

Hand.prototype.checkForBust = function () {
  return this.value > 21;
};

Hand.prototype.clear = function () {
  this.cards = [];
  this.value = 0;
  this.numOfAces = 0, this.isActive = true, // Do not change this value in the dealer's hand,
  this.isCompleted = false;
};

Hand.prototype.checkForBlackjack = function () {
  if (this.value === 21) {
    return true;
  } else {
    return false;
  }
};

Hand.prototype.setToActive = function () {
  this.isActive = true;
};

Hand.prototype.setToInactive = function () {
  this.isActive = false;
};

Hand.prototype.complete = function () {
  this.isCompleted = true;
};

Hand.prototype.checkFor21 = Hand.prototype.checkForBlackjack;


/***/ }),

/***/ "./js/page.js":
/*!********************!*\
  !*** ./js/page.js ***!
  \********************/
/*! exports provided: addListeners, hideUIElement, showUIElement, clearUIElement, buttons, inputs, containers, displays */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addListeners", function() { return addListeners; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideUIElement", function() { return hideUIElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showUIElement", function() { return showUIElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearUIElement", function() { return clearUIElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "buttons", function() { return buttons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inputs", function() { return inputs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containers", function() { return containers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "displays", function() { return displays; });
// Takes array of objects with element, eventType, and fn properties and adds an event listener to each element
function addListeners(items) {
  items.forEach(function (item) {
    return item.element.addEventListener(item.eventType, item.fn);
  });
}
function hideUIElement(element) {
  element.classList.add('display-none');
}
function showUIElement(element) {
  element.classList.remove('display-none');
}
function clearUIElement(element) {
  element.innerHTML = "";
} // DOM Elements Object

var buttons = {
  startGame: document.getElementById('btn-start-game'),
  makeWager: document.getElementById('btn-make-wager'),
  hit: document.getElementById('btn-hit'),
  stand: document.getElementById('btn-stand'),
  split: document.getElementById('btn-split'),
  doubleDown: document.getElementById('btn-double-down'),
  surrender: document.getElementById('btn-surrender'),
  newHand: document.getElementById('btn-new-hand')
};
var inputs = {
  wager: document.getElementById('wager-input')
};
var containers = {
  game: document.getElementById('game-container'),
  dealer: document.getElementById('dealer-container'),
  player: document.getElementById('player-container'),
  wager: document.getElementById('wager-container'),
  newHand: document.getElementById('new-hand-container'),
  playerSplit: document.getElementById('player-split-container')
};
var displays = {
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  playerTotal: document.getElementById('player-total'),
  dealerTotal: document.getElementById('dealer-total'),
  playerOptions: document.getElementById('player-options'),
  wager: document.getElementById('wager-display'),
  playerMoney: document.getElementById('player-money-display'),
  handResult: document.getElementById('hand-result-display'),
  playerSplitHand: document.getElementById('player-split-hand'),
  playerSplitTotal: document.getElementById('player-split-total')
};

/***/ }),

/***/ "./js/person.js":
/*!**********************!*\
  !*** ./js/person.js ***!
  \**********************/
/*! exports provided: Person */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Person", function() { return Person; });
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hand */ "./js/hand.js");


function Person() {
  this.hand = new _hand__WEBPACK_IMPORTED_MODULE_0__["Hand"]();
}



/***/ }),

/***/ "./js/player.js":
/*!**********************!*\
  !*** ./js/player.js ***!
  \**********************/
/*! exports provided: Player */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony import */ var _person__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./person */ "./js/person.js");
/* harmony import */ var _hand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hand */ "./js/hand.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page */ "./js/page.js");




function Player() {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].call(this);
  this.name = 'Player';
  this.money = 100;
  this.wager = 0;
  this.hasSplitHand = false;
  this.splitHand = {};
  this.hand.setDisplays(_page__WEBPACK_IMPORTED_MODULE_2__["displays"].playerHand, _page__WEBPACK_IMPORTED_MODULE_2__["displays"].playerTotal);
}

Player.prototype = Object.create(_person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype);
Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true
}); // Render all of player's data that changes

Player.prototype.renderAll = function () {
  this.hand.render();
  this.hand.renderValue();
  this.renderMoney();
  this.renderWager();
};

Player.prototype.renderMoney = function () {
  _page__WEBPACK_IMPORTED_MODULE_2__["displays"].playerMoney.innerHTML = "<span class='text-shadow'>Money:</span> <span class='player-money'>$".concat(this.money.toFixed(2), "</span>");
};

Player.prototype.renderWager = function () {
  if (this.hasSplitHand) {
    _page__WEBPACK_IMPORTED_MODULE_2__["displays"].wager.innerHTML = "<span class='text-shadow'>Current wager:</span> <span class='player-wager'>$".concat(this.wager * 2, "</span> (split)");
  } else {
    _page__WEBPACK_IMPORTED_MODULE_2__["displays"].wager.innerHTML = "<span class='text-shadow'>Current wager:</span> <span class='player-wager'>$".concat(this.wager, "</span>");
  }
};

Player.prototype.clearWager = function () {
  this.wager = 0;
};

Player.prototype.hasActiveHand = function () {
  if (this.hasSplitHand) {
    return this.hand.isActive || this.splitHand.isActive;
  } else {
    return this.hand.isActive;
  }
};

Player.prototype.getActiveHand = function () {
  if (this.hasSplitHand) {
    return this.hand.isActive ? this.hand : this.splitHand;
  } else {
    return this.hand;
  }
};

Player.prototype.hasHandToCompare = function () {
  if (this.hasSplitHand) {
    return !this.hand.isCompleted || !this.splitHand.isCompleted;
  } else {
    return !this.hand.isCompleted;
  }
};

Player.prototype.getHandToCompare = function () {
  if (this.hasSplitHand) {
    return !this.hand.isCompleted ? this.hand : this.splitHand;
  } else {
    return this.hand;
  }
};

Player.prototype.canSplitPair = function () {
  if (this.hand.cards.length === 2 && this.hand.cards[0].value === this.hand.cards[1].value && this.money >= this.wager && this.hand.cards[0].rank !== 'Ace') {
    return true;
  } else {
    return false;
  }
};

Player.prototype.splitPair = function () {
  this.splitHand = new _hand__WEBPACK_IMPORTED_MODULE_1__["Hand"]();
  this.splitHand.setDisplays(_page__WEBPACK_IMPORTED_MODULE_2__["displays"].playerSplitHand, _page__WEBPACK_IMPORTED_MODULE_2__["displays"].playerSplitTotal);
  this.hasSplitHand = true;
  this.splitHand.addCard(this.hand.cards.pop());
  this.hand.updateValue();
  this.money -= this.wager;
  this.renderMoney();
  this.renderWager();
  this.hand.render();
  this.hand.renderValue();
  this.splitHand.render();
  this.splitHand.renderValue();
};

Player.prototype.renderSplitHand = function () {
  var display = this.splitHand.display;
  display.innerHTML = '';
  this.splitHand.cards.forEach(function (card) {
    display.appendChild(card.render());
  });
};

Player.prototype.renderSplitHandValue = function () {
  var value = this.splitHand.value;
  this.splitHand.totalDisplay.innerHTML = value;
};



/***/ }),

/***/ "./js/statistics.js":
/*!**************************!*\
  !*** ./js/statistics.js ***!
  \**************************/
/*! exports provided: data, save */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "save", function() { return save; });
var stats = {};

if (localStorage.getItem('blackjackStatistics') === null) {
  stats = {
    numOfWins: 0,
    numOfLosses: 0,
    numOfBlackjacks: 0,
    numOfPushes: 0,
    lifetimeEarnings: 0
  };
  localStorage.setItem('blackjackStatistics', JSON.stringify(stats));
} else {
  stats = JSON.parse(localStorage.getItem('blackjackStatistics'));
}

var data = stats;
function save() {
  localStorage.setItem('blackjackStatistics', JSON.stringify(data));
}

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map