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




 // IIFE

(function main() {
  'use strict';

  console.log('Main'); // Game constants

  var NUM_OF_DECKS = 1,
      BLACKJACK_RATIO = 3 / 2,
      NORMAL_RATIO = 1,
      MIN_WAGER = _page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.min,
      MAX_WAGER = _page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.max; // Create player, dealer, and deck

  var player, dealer, deck;
  _page__WEBPACK_IMPORTED_MODULE_4__["addListeners"]([{
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].startGame,
    eventType: 'click',
    fn: startGame
  }, {
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].makeWager,
    eventType: 'click',
    fn: validateWager
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
    element: _page__WEBPACK_IMPORTED_MODULE_4__["buttons"].newHand,
    eventType: 'click',
    fn: startNewHand
  }]);

  function startGame() {
    console.log('Start Game');
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](document.querySelector('.game-container'));
    player = new _player__WEBPACK_IMPORTED_MODULE_0__["Player"](), dealer = new _dealer__WEBPACK_IMPORTED_MODULE_1__["Dealer"](), deck = new _deck__WEBPACK_IMPORTED_MODULE_3__["Deck"]();
    player.renderMoney();
    startNewHand();
  }

  function validateWager() {
    var wager = parseInt(_page__WEBPACK_IMPORTED_MODULE_4__["inputs"].wager.value);

    if (wager >= MIN_WAGER && wager <= MAX_WAGER && wager % 1 === 0 && player.money >= wager) {
      placeWager(wager);
    } else {
      console.log('Invalid wager.');
      showHandResult('Invalid wager.');
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
      player.addToHand(deck.dealCard());
      dealer.addToHand(deck.dealCard());
    }

    dealer.hand.cards[1].isFaceUp = false;
    player.checkForBust(); // Calling this to check for 2 aces

    if (player.canSplitHand()) {
      _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);
    }

    player.renderHand();
    dealer.renderHand(); // player.hand.value = 21;

    checkForBlackjacks();
  }

  function checkForBlackjacks() {
    var playerBlackjack = player.checkForBlackjack(),
        dealerBlackjack = false,
        // Initialize to false
    dealerFaceUpCardValue = dealer.hand.cards[0].value; // Checks if dealer's hand is a blackjack only if their face up card is a 10, Face card, or an Ace

    if (dealerFaceUpCardValue >= 10) {
      dealerBlackjack = dealer.checkForBlackjack();
    }

    if (playerBlackjack && dealerBlackjack) {
      console.log('Tie!');
      flipDealerCard();
      handlePush();
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
    dealer.renderHand();
  }

  function handlePlayerBlackjack() {
    var winnings = player.wager * BLACKJACK_RATIO;
    console.log("Player wins $".concat(winnings.toFixed(2), " for Blackjack on wager of $").concat(player.wager.toFixed(2), "!"));
    player.money += winnings + player.wager;
    player.renderMoney();
    showHandResult("Player wins $".concat(winnings.toFixed(2), " for Blackjack on $").concat(player.wager, " wager! "));
    endCurrentHand();
  }

  function handlePlayerWin() {
    console.log('player win');
    var winnings = player.wager * NORMAL_RATIO;
    console.log("Player wins $".concat(winnings.toFixed(2), " for win on wager of $").concat(player.wager.toFixed(2), "!"));
    player.money += winnings + player.wager;
    player.renderMoney();
    showHandResult("Player wins $".concat(winnings.toFixed(2), " on $").concat(player.wager, " wager. "));
    endCurrentHand();
  }

  function handlePlayerBust() {
    console.log('handle player bust');
    showHandResult("Player bust! ");
    handlePlayerLoss();
    flipDealerCard();
    endCurrentHand();
  }

  function handlePlayerLoss() {
    var losses = player.wager;
    showHandResult("Player loses $".concat(losses.toFixed(2), " wager."));
  }

  function handleDealerBlackjack() {
    showHandResult('Dealer Blackjack! ');
    handlePlayerLoss();
    endCurrentHand();
  }

  function handlePush() {
    player.money += player.wager;
    console.log(player.money);
    endCurrentHand();
  }

  function beginPlayerTurn() {
    console.log('Begin Player Turn'); // Show user options

    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
  }

  function playerHit() {
    console.log('hit');
    player.addToHand(deck.dealCard());
    player.renderHand();
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].doubleDown);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);

    if (player.checkFor21()) {
      playerStand();
    } else if (player.checkForBust()) {
      console.log('player bust');
      handlePlayerBust();
    } else {
      console.log('Continue');
    }
  }

  function playerStand() {
    console.log('Player stands');

    if (player.hasSplitHand) {} else {
      hidePlayerOptions();
      beginDealerTurn();
    }
  }

  function playerDoubleDown() {
    player.money -= player.wager;
    player.wager += player.wager;
    player.renderAll();
    playerHit();

    if (player.hand.value < 21) {
      beginDealerTurn();
    }
  }

  function beginDealerTurn() {
    flipDealerCard();
    dealer.checkForBust(); // Check for dealer having 2 aces

    while (dealer.hand.value < dealer.minimumTotal || dealer.hand.value === 17 && dealer.hand.numOfHighAces > 0) {
      dealer.addToHand(deck.dealCard());
      dealer.checkForBust();
      dealer.renderHand();
    }

    dealer.renderHandValue(_page__WEBPACK_IMPORTED_MODULE_4__["displays"].dealerTotal);

    if (dealer.hand.value > player.hand.value && dealer.hand.value <= 21) {
      showHandResult("Dealer ".concat(dealer.hand.value, " beats player ").concat(player.hand.value, ". "));
      handlePlayerLoss();
      endCurrentHand();
    } else if (dealer.hand.value === player.hand.value) {
      showHandResult("Push! Player keeps wager of ".concat(player.wager));
      handlePush();
    } else {
      showHandResult("Dealer bust! ");
      handlePlayerWin();
    }
  }

  function startNewHand() {
    deck.addHandToDiscardPile(player.hand.cards);
    deck.addHandToDiscardPile(dealer.hand.cards);
    player.clearHand();
    player.clearWager();
    player.renderAll();
    dealer.clearHand();
    dealer.renderHand();
    dealer.renderHandValue();
    _page__WEBPACK_IMPORTED_MODULE_4__["clearUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult);
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].wager);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].newHand);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["buttons"].split);
  }

  function endCurrentHand() {
    if (player.money > MIN_WAGER) {
      player.clearWager();
      player.renderWager();
      dealer.renderHandValue();
      showNewHandOption();
    } else {
      console.log('Game over!');
      showHandResult('You do not have enough money to play. Game over! Start a new game to continue playing.');
    }

    hidePlayerOptions();
  }

  function showHandResult(result) {
    _page__WEBPACK_IMPORTED_MODULE_4__["displays"].handResult.innerHTML += result;
  }

  function showNewHandOption() {
    _page__WEBPACK_IMPORTED_MODULE_4__["showUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["containers"].newHand);
  }

  function hidePlayerOptions() {
    _page__WEBPACK_IMPORTED_MODULE_4__["hideUIElement"](_page__WEBPACK_IMPORTED_MODULE_4__["displays"].playerOptions);
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
}

Dealer.prototype = Object.create(_person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype);
Object.defineProperty(Dealer.prototype, 'constructor', {
  value: Dealer,
  enumerable: false,
  writable: true
});

Dealer.prototype.renderHand = function () {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype.renderHand.call(this, _page__WEBPACK_IMPORTED_MODULE_1__["displays"].dealerHand);
};

Dealer.prototype.renderHandValue = function () {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype.renderHandValue.call(this, _page__WEBPACK_IMPORTED_MODULE_1__["displays"].dealerTotal);
};



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
    this.restoreAceValues();
    this.shuffle();
  }
};

Deck.prototype.restoreAceValues = function () {
  this.cards.forEach(function (card) {
    if (card.rank === 'Ace' && card.value === 1) {
      card.value = 11;
    }
  });
};

Deck.prototype.dealCard = function () {
  var cardToDeal = this.cards.pop();
  console.log("Dealt ".concat(cardToDeal.toString()));
  this.checkForOutOfCards();
  return cardToDeal;
};

Deck.prototype.addHandToDiscardPile = function (hand) {
  this.discardPile = this.discardPile.concat(hand);
};



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
  dealer: document.getElementById('dealer-container'),
  player: document.getElementById('player-container'),
  wager: document.getElementById('wager-container'),
  newHand: document.getElementById('new-hand-container')
};
var displays = {
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  playerTotal: document.getElementById('player-total'),
  dealerTotal: document.getElementById('dealer-total'),
  playerOptions: document.getElementById('player-options'),
  wager: document.getElementById('wager-display'),
  playerMoney: document.getElementById('player-money-display'),
  handResult: document.getElementById('hand-result-display')
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
function Person() {
  this.hand = {
    cards: [],
    value: 0,
    numOfHighAces: 0
  };
}

Person.prototype.addToHand = function (card) {
  this.hand.cards.push(card);
  this.updateHandValue();

  if (card.rank === 'Ace') {
    this.hand.numOfHighAces++;
  }
};

Person.prototype.updateHandValue = function () {
  this.hand.value = this.hand.cards.reduce(function (acc, card) {
    return acc + card.value;
  }, 0);
};

Person.prototype.reduceOneHighAce = function () {
  var index = this.hand.cards.findIndex(function (card) {
    return card.value === 11;
  });
  console.log("Reducing ".concat(this.name, "'s ").concat(this.hand.cards[index].rank, " of ").concat(this.hand.cards[index].suit, " to 1"));
  this.hand.cards[index].value = 1;
  this.hand.numOfHighAces--;
  this.updateHandValue();
  this.renderHand();
};

Person.prototype.renderHand = function (parentElement) {
  parentElement.innerHTML = '';
  this.hand.cards.forEach(function (card) {
    var cardDiv = document.createElement('div');

    if (!card.isFaceUp) {
      cardDiv.innerHTML = 'Hidden';
      console.log(card);
    } else {
      cardDiv.innerHTML = "".concat(card.rank, " of ").concat(card.suit);
    }

    parentElement.append(cardDiv);
  });
};

Person.prototype.renderHandValue = function (parentElement) {
  var value = this.hand.value > 0 ? this.hand.value : "";
  parentElement.innerHTML = value;
};

Person.prototype.checkForBust = function () {
  if (this.hand.value > 21) {
    if (this.hand.numOfHighAces > 0) {
      this.reduceOneHighAce();
      this.checkForBust();
    } else {
      console.log('Bust');
      return true;
    }
  } else {
    return false;
  }
};

Person.prototype.clearHand = function () {
  this.hand.cards = [];
  this.hand.value = 0;
  this.hand.numOfHighAces = 0;
};

Person.prototype.findFirstHighAceIndex = function () {
  var index = this.hand.cards.findIndex(function (card) {
    return card.value === 11;
  });
};

Person.prototype.checkForBlackjack = function () {
  if (this.hand.value === 21) {
    return true;
  } else {
    return false;
  }
};

Person.prototype.checkFor21 = Person.prototype.checkForBlackjack;


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
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ "./js/page.js");



function Player() {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].call(this);
  this.name = 'Player';
  this.money = 100;
  this.wager = 0;
  this.hasSplitHand = false;
}

Player.prototype = Object.create(_person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype);
Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true
}); // Render all of player's data that changes

Player.prototype.renderAll = function () {
  this.renderHand();
  this.renderMoney();
  this.renderWager();
};

Player.prototype.renderHand = function () {
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype.renderHand.call(this, _page__WEBPACK_IMPORTED_MODULE_1__["displays"].playerHand);
  _person__WEBPACK_IMPORTED_MODULE_0__["Person"].prototype.renderHandValue.call(this, _page__WEBPACK_IMPORTED_MODULE_1__["displays"].playerTotal);
};

Player.prototype.renderMoney = function () {
  _page__WEBPACK_IMPORTED_MODULE_1__["displays"].playerMoney.innerHTML = "Player money: $".concat(this.money.toFixed(2));
};

Player.prototype.renderWager = function () {
  _page__WEBPACK_IMPORTED_MODULE_1__["displays"].wager.innerHTML = "Current wager: $".concat(this.wager);
};

Player.prototype.clearWager = function () {
  this.wager = 0;
};

Player.prototype.canSplitHand = function () {
  if (this.hand.cards.length === 2 && this.hand.cards[0].value === this.hand.cards[1].value) {
    return true;
  } else {
    return false;
  }
};



/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map