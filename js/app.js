import { Player } from './player';
import { Dealer } from './dealer';
import { Card } from './card';
import { Deck } from './deck';
import * as Page from './page';
import * as Statistics from './statistics';

// console.log(Statistics.data);
// Statistics.data.numOfWins++;
// Statistics.save();
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
  let player, activePlayerHand, dealer, deck;

  Page.addListeners([
    { element: Page.buttons.startGame, eventType: 'click', fn: startGame },
    { element: Page.buttons.makeWager, eventType: 'click', fn: validateWager },
    { element: Page.inputs.wager, eventType: 'keypress', fn: wagerInputEventHandler },
    { element: Page.buttons.hit, eventType: 'click', fn: playerHit },
    { element: Page.buttons.stand, eventType: 'click', fn: playerStand },
    { element: Page.buttons.doubleDown, eventType: 'click', fn: playerDoubleDown },
    { element: Page.buttons.split, eventType: 'click', fn: playerSplitPair },
    { element: Page.buttons.newHand, eventType: 'click', fn: startNewHand }
  ]);

  function startGame(){
    console.log('Start Game');
    Page.showUIElement(Page.containers.game);
    player = new Player(),
    dealer = new Dealer(),
    deck = new Deck();
    activePlayerHand = player.getActiveHand();
    player.renderMoney();
    startNewHand();
  }

  function startNewHand(){
    clearPreviousHand();

    Page.showUIElement(Page.containers.wager);

    Page.hideUIElement(Page.containers.newHand);
    Page.hideUIElement(Page.displays.playerOptions);
    Page.hideUIElement(Page.buttons.split);
  }

  function clearPreviousHand(){
    deck.addHandToDiscardPile(player.hand.cards);
    deck.addHandToDiscardPile(dealer.hand.cards);

    if (player.hasSplitHand){
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

    Page.clearUIElement(Page.displays.handResult);
    Page.hideUIElement(Page.containers.playerSplit);
    activePlayerHand = player.getActiveHand();
  }

  function validateWager(){
    let wager = parseInt(Page.inputs.wager.value);
    if (wager >= MIN_WAGER && wager <= MAX_WAGER && wager % 1 === 0 && player.money >= wager){
      placeWager(wager);
    } else {
      console.log('Invalid wager.');
      Page.displays.handResult.innerHTML = '';
      addToResultsLog(`Invalid wager. Enter a wager between ${MIN_WAGER} and ${MAX_WAGER}. You must also have enough money!`);
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
      activePlayerHand.addCard(deck.dealCard());
      dealer.hand.addCard(deck.dealCard());
    }
    dealer.hand.cards[1].isFaceUp = false;
    if (player.canSplitPair()){
      Page.showUIElement(Page.buttons.split);
    }
    activePlayerHand.render();
    activePlayerHand.renderValue();
    dealer.hand.render();
    // player.hand.value = 21;
    checkForBlackjacks();
  }

  // Only run after initial deal
  function checkForBlackjacks(){
    let playerBlackjack = activePlayerHand.checkForBlackjack(),
        dealerBlackjack = false, // Initialize to false
        dealerFaceUpCardValue = dealer.hand.cards[0].value;

    // Checks if dealer's hand is a blackjack only if their face up card is a 10, Face card, or an Ace
    if (dealerFaceUpCardValue >= 10){
      dealerBlackjack = dealer.hand.checkForBlackjack();
    }

    if (playerBlackjack && dealerBlackjack){
      console.log('Tie!');
      flipDealerCard();
      handleTie();
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
    dealer.hand.render();
  }

  function handlePlayerBlackjack(){
    let winnings = player.wager * BLACKJACK_RATIO;
    console.log(`Player wins $${winnings.toFixed(2)} for Blackjack on wager of $${player.wager.toFixed(2)}!`);
    player.money += winnings + player.wager;
    player.renderMoney();
    addToResultsLog(`Player wins $${winnings.toFixed(2)} for Blackjack on $${player.wager} wager! `);
    Statistics.data.numOfBlackjacks++;
    Statistics.data.lifetimeEarnings += winnings;
    endCurrentHand();
  }

  function handlePlayerWin(){
    console.log('player win');
    let winnings = player.wager * NORMAL_RATIO;
    console.log(`Player wins $${winnings.toFixed(2)} for win on wager of $${player.wager.toFixed(2)}!`);
    player.money += winnings + player.wager;
    player.renderMoney();
    addToResultsLog(`Player wins $${winnings.toFixed(2)} on $${player.wager} wager. `);
    Statistics.data.numOfWins++;
    Statistics.data.lifetimeEarnings += winnings;
  }

  function handlePlayerBust(){
    console.log('handle player bust');
    addToResultsLog(`<br><b>Hand Result</b><br>Player bust! `);
    activePlayerHand.isCompleted = true;
    handlePlayerLoss();
    endPlayerHand();
  }

  function handlePlayerLoss(){
    let losses = player.wager;
    addToResultsLog(`Player loses $${losses.toFixed(2)} wager.`);
    Statistics.data.numOfLosses++;
    Statistics.data.lifetimeEarnings -= losses;
  }

  function handleDealerBlackjack(){
    addToResultsLog(`<b>Dealer Blackjack!</b> `);
    handlePlayerLoss();
    endCurrentHand();
  }

  function handleTie(){
    player.money += player.wager;
    Statistics.data.numOfPushes++;
    addToResultsLog(`<br><b>Hand Result</b><br>Push! Player keeps wager of $${player.wager}.`);
    endCurrentHand();
  }

  function handlePush(){
    player.money += player.wager;
    Statistics.data.numOfPushes = parseInt(Statistics.data.numOfPushes) + 1;
    console.log(Statistics.data.numOfPushes);
    addToResultsLog(`<br><b>Hand Result</b><br>Push! Player keeps wager of $${player.wager}.`);
    if (!player.hasHandToCompare()){
      endCurrentHand();
    }
  }

  function beginPlayerTurn(){
    console.log('Begin Player Turn');
    // Show user options
    Page.showUIElement(Page.displays.playerOptions);
  }

  function playerHit(){
    console.log('hit');
    activePlayerHand.addCard(deck.dealCard());
    activePlayerHand.render();
    activePlayerHand.renderValue();

    Page.hideUIElement(Page.buttons.doubleDown);
    Page.hideUIElement(Page.buttons.split);

    if (activePlayerHand.checkFor21()){
      playerStand();
    } else if (activePlayerHand.checkForBust()){
      console.log('player bust');
      handlePlayerBust();
    }
  }

  function playerStand(){
    console.log('Player stands');
    Page.hideUIElement(Page.displays.playerOptions);
    endPlayerHand();
  }

  function playerDoubleDown(){
    player.money -= player.wager;
    player.wager += player.wager;
    player.renderAll();
    playerHit();

    // Hand is checked for 21/bust in playerHit()
    if (activePlayerHand.value < 21){
      endPlayerHand();
    }
  }

  function playerSplitPair(){
    Page.hideUIElement(Page.buttons.split);
    Page.hideUIElement(Page.buttons.doubleDown);
    Page.showUIElement(Page.containers.playerSplit);
    addToResultsLog('Splitting player hand. Currently playing main hand.');
    player.splitPair();
  }

  function endPlayerHand(){
    activePlayerHand.setToInactive();
    console.log(player.hasActiveHand());
    if (player.hasActiveHand()){
      if (activePlayerHand.value <= 21){
        addToResultsLog(`Player stands on value of ${activePlayerHand.value}.`);
      }
      activePlayerHand = player.getActiveHand();
      console.log(activePlayerHand);
      addToResultsLog('<br>Player now playing split hand.');
      beginPlayerTurn();
    } else if (player.hasHandToCompare()){
      console.log('has hand');
      if (activePlayerHand.value <= 21){
        addToResultsLog(`Player stands on value of ${activePlayerHand.value}.`);
      }
      beginDealerTurn();
    } else {
      endCurrentHand();
    }
  }

  function beginDealerTurn(){
    flipDealerCard();
    addToResultsLog('<br>Beginning dealer\'s turn.');
    while (dealer.hand.value < dealer.minimumTotal || (dealer.hand.value === 17 && dealer.hand.numOfAces > 0)){
      dealer.hand.addCard(deck.dealCard());
      dealer.hand.render();
    }

    dealer.hand.renderValue();
    addToResultsLog(`Dealer draws to ${dealer.hand.value}.`);
    while (player.hasHandToCompare()){
      activePlayerHand = player.getHandToCompare();
      activePlayerHand.complete();
      compareHands();
    }
    endCurrentHand();
  }

  function compareHands(){
    console.log('comparing hands');

    if (dealer.hand.value > activePlayerHand.value && dealer.hand.value <= 21){
      addToResultsLog(`<br><b>Hand Result</b><br>Dealer ${dealer.hand.value} beats player ${activePlayerHand.value}. `);
      handlePlayerLoss();
      endCurrentHand();
    } else if (dealer.hand.value === activePlayerHand.value){
      handlePush();
    } else if (dealer.hand.checkForBust()){
      addToResultsLog(`Dealer bust! `);
      handlePlayerWin();
    } else {
      addToResultsLog(`<br><b>Hand Result</b><br>Player ${activePlayerHand.value} beats dealer ${dealer.hand.value}. `);
      handlePlayerWin();
    }
  }

  function endCurrentHand(){
    console.log('end current hand');
    Statistics.save();

    if (player.money >= MIN_WAGER){
      Page.showUIElement(Page.containers.newHand);
    } else {
      console.log('Game over!');
      addToResultsLog('You do not have enough money to play. Game over! Start a new game to continue playing.');
    }

    Page.hideUIElement(Page.displays.playerOptions);
  }

  function addToResultsLog(result){
    Page.displays.handResult.innerHTML += result + `<br>`;
  }

  function wagerInputEventHandler(e){
    if (e.keyCode === 13){
      validateWager();
    }
  }
})();
