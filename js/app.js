import { Player } from './player';
import { Dealer } from './dealer';
import { Card } from './card';
import { Deck } from './deck';
import * as Page from './page';

// IIFE
(function main() {
  'use strict';

  console.log('Main');
  // Game constants
  const NUM_OF_DECKS = 1,
        BLACKJACK_RATIO = 3 / 2,
        NORMAL_RATIO = 1,
        MIN_WAGER = Page.inputs.wager.min,
        MAX_WAGER = Page.inputs.wager.max;

  // Create player, dealer, and deck
  let player, dealer, deck;

  Page.addListeners([
    { element: Page.buttons.startGame, eventType: 'click', fn: startGame },
    { element: Page.buttons.makeWager, eventType: 'click', fn: validateWager },
    { element: Page.buttons.hit, eventType: 'click', fn: playerHit },
    { element: Page.buttons.stand, eventType: 'click', fn: playerStand },
    { element: Page.buttons.doubleDown, eventType: 'click', fn: playerDoubleDown },
    { element: Page.buttons.newHand, eventType: 'click', fn: startNewHand }
  ]);

  function startGame(){
    console.log('Start Game');
    Page.showUIElement(document.querySelector('.game-container'));
    player = new Player(),
    dealer = new Dealer(),
    deck = new Deck();
    player.renderMoney();
    startNewHand();
  }

  function validateWager(){
    let wager = parseInt(Page.inputs.wager.value);
    if (wager >= MIN_WAGER && wager <= MAX_WAGER && wager % 1 === 0 && player.money >= wager){
      placeWager(wager);
    } else {
      console.log('Invalid wager.');
      showHandResult('Invalid wager.');
    }
  }

  function placeWager(wager){
    Page.clearUIElement(Page.displays.handResult);
    Page.hideUIElement(Page.containers.wager);
    player.wager = wager;
    player.money -= wager;
    player.renderMoney();
    player.renderWager();

    // Show double down button if player has enough money to do so
    if (player.money >= wager){
      Page.showUIElement(Page.buttons.doubleDown);
    }

    dealCards();
  }

  function dealCards(){
    console.log('Deal Cards');
    for (let i = 0; i < 2; i++){
      player.addToHand(deck.dealCard());
      dealer.addToHand(deck.dealCard());
    }
    dealer.hand.cards[1].isFaceUp = false;
    player.checkForBust(); // Calling this to check for 2 aces
    if (player.canSplitHand()){
      Page.showUIElement(Page.buttons.split);
    }
    player.renderHand();
    dealer.renderHand();
    // player.hand.value = 21;
    checkForBlackjacks();
  }

  function checkForBlackjacks(){
    let playerBlackjack = player.checkForBlackjack(),
        dealerBlackjack = false, // Initialize to false
        dealerFaceUpCardValue = dealer.hand.cards[0].value;

    // Checks if dealer's hand is a blackjack only if their face up card is a 10, Face card, or an Ace
    if (dealerFaceUpCardValue >= 10){
      dealerBlackjack = dealer.checkForBlackjack();
    }

    if (playerBlackjack && dealerBlackjack){
      console.log('Tie!');
      flipDealerCard();
      handlePush();
    } else if (playerBlackjack){
      console.log('Player Blackjack!');
      flipDealerCard();
      handlePlayerBlackjack();
    } else if (dealerBlackjack){
      console.log('Dealer Blackjack!');
      flipDealerCard();
      handleDealerBlackjack();
    } else {
      beginPlayerTurn();
    }
  }

  function flipDealerCard(){
    dealer.hand.cards[1].isFaceUp = true;
    dealer.renderHand();
  }

  function handlePlayerBlackjack(){
    let winnings = player.wager * BLACKJACK_RATIO;
    console.log(`Player wins $${winnings.toFixed(2)} for Blackjack on wager of $${player.wager.toFixed(2)}!`);
    player.money += winnings + player.wager;
    player.renderMoney();
    showHandResult(`Player wins $${winnings.toFixed(2)} for Blackjack on $${player.wager} wager! `);
    endCurrentHand();
  }

  function handlePlayerWin(){
    console.log('player win');
    let winnings = player.wager * NORMAL_RATIO;
    console.log(`Player wins $${winnings.toFixed(2)} for win on wager of $${player.wager.toFixed(2)}!`);
    player.money += winnings + player.wager;
    player.renderMoney();
    showHandResult(`Player wins $${winnings.toFixed(2)} on $${player.wager} wager. `);
    endCurrentHand();
  }

  function handlePlayerBust(){
    console.log('handle player bust');
    showHandResult(`Player bust! `);
    handlePlayerLoss();
    flipDealerCard();
    endCurrentHand();
  }

  function handlePlayerLoss(){
    let losses = player.wager;
    showHandResult(`Player loses $${losses.toFixed(2)} wager.`);
  }

  function handleDealerBlackjack(){
    showHandResult('Dealer Blackjack! ');
    handlePlayerLoss();
    endCurrentHand();
  }

  function handlePush(){
    player.money += player.wager;
    console.log(player.money);
    endCurrentHand();
  }

  function beginPlayerTurn(){
    console.log('Begin Player Turn');
    // Show user options
    Page.showUIElement(Page.displays.playerOptions);
  }

  function playerHit(){
    console.log('hit');
    player.addToHand(deck.dealCard());
    player.renderHand();

    Page.hideUIElement(Page.buttons.doubleDown);
    Page.hideUIElement(Page.buttons.split);

    if (player.checkFor21()){
      playerStand();
    } else if (player.checkForBust()){
      console.log('player bust');

      handlePlayerBust();
    } else {
      console.log('Continue');
    }
  }

  function playerStand(){
    console.log('Player stands');
    if (player.hasSplitHand){

    } else {
      hidePlayerOptions();
      beginDealerTurn();
    }
  }

  function playerDoubleDown(){
    player.money -= player.wager;
    player.wager += player.wager;
    player.renderAll();
    playerHit();
    if (player.hand.value < 21){
      beginDealerTurn();
    }
  }

  function beginDealerTurn(){
    flipDealerCard();
    dealer.checkForBust(); // Check for dealer having 2 aces
    while (dealer.hand.value < dealer.minimumTotal || (dealer.hand.value === 17 && dealer.hand.numOfHighAces > 0)){
      dealer.addToHand(deck.dealCard());
      dealer.checkForBust();
      dealer.renderHand();
    }
    dealer.renderHandValue(Page.displays.dealerTotal);
    if (dealer.hand.value > player.hand.value && dealer.hand.value <= 21){
      showHandResult(`Dealer ${dealer.hand.value} beats player ${player.hand.value}. `);
      handlePlayerLoss();
      endCurrentHand();
    } else if (dealer.hand.value === player.hand.value){
      showHandResult(`Push! Player keeps wager of ${player.wager}`);
      handlePush();
    } else {
      showHandResult(`Dealer bust! `);
      handlePlayerWin();
    }
  }

  function startNewHand(){
    deck.addHandToDiscardPile(player.hand.cards);
    deck.addHandToDiscardPile(dealer.hand.cards);

    player.clearHand();
    player.clearWager();
    player.renderAll();

    dealer.clearHand();
    dealer.renderHand();
    dealer.renderHandValue();

    Page.clearUIElement(Page.displays.handResult);

    Page.showUIElement(Page.containers.wager);

    Page.hideUIElement(Page.containers.newHand);
    Page.hideUIElement(Page.displays.playerOptions);
    Page.hideUIElement(Page.buttons.split);
  }

  function endCurrentHand(){
    if (player.money > MIN_WAGER){
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

  function showHandResult(result){
    Page.displays.handResult.innerHTML += result;
  }

  function showNewHandOption(){
    Page.showUIElement(Page.containers.newHand);
  }

  function hidePlayerOptions(){
    Page.hideUIElement(Page.displays.playerOptions);
  }
})();
