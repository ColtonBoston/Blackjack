import { Person } from './person';
import { Hand } from './hand';
import * as Page from './page';

function Player(){
  Person.call(this);

  this.name = 'Player';
  this.money = 100;
  this.wager = 0;
  this.hasSplitHand = false;
  this.splitHand = {};
  this.hand.setDisplays(Page.displays.playerHand, Page.displays.playerTotal);
}

Player.prototype = Object.create(Person.prototype);

Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true
});

// Render all of player's data that changes
Player.prototype.renderAll = function(){
  this.hand.render();
  this.hand.renderValue();
  this.renderMoney();
  this.renderWager();
}

Player.prototype.renderMoney = function(){
  Page.displays.playerMoney.innerHTML = `<span class='text-shadow'>Money:</span> <span class='player-money'>$${this.money.toFixed(2)}</span>`;
}

Player.prototype.renderWager = function(){
  if (this.hasSplitHand){
    Page.displays.wager.innerHTML = `<span class='text-shadow'>Current wager:</span> <span class='player-wager'>$${this.wager * 2}</span> (split)`;
  } else {
    Page.displays.wager.innerHTML = `<span class='text-shadow'>Current wager:</span> <span class='player-wager'>$${this.wager}</span>`;
  }
}

Player.prototype.clearWager = function(){
  this.wager = 0;
}

Player.prototype.hasActiveHand = function(){
  if (this.hasSplitHand){
    return this.hand.isActive || this.splitHand.isActive;
  } else {
    return this.hand.isActive;
  }
}

Player.prototype.getActiveHand = function(){
  if (this.hasSplitHand) {
    return this.hand.isActive ? this.hand : this.splitHand;
  } else {
    return this.hand;
  }
}

Player.prototype.hasHandToCompare = function(){
  if (this.hasSplitHand){
    return !this.hand.isCompleted || !this.splitHand.isCompleted;
  } else {
    return !this.hand.isCompleted;
  }
}

Player.prototype.getHandToCompare = function(){
  if (this.hasSplitHand) {
    return !this.hand.isCompleted ? this.hand : this.splitHand;
  } else {
    return this.hand;
  }
}

Player.prototype.canSplitPair = function(){
  if (this.hand.cards.length === 2 &&
      this.hand.cards[0].value === this.hand.cards[1].value &&
      this.money >= this.wager &&
      this.hand.cards[0].rank !== 'Ace'){
    return true;
  } else {
    return false;
  }
}

Player.prototype.splitPair = function(){
  this.splitHand = new Hand();
  this.splitHand.setDisplays(Page.displays.playerSplitHand, Page.displays.playerSplitTotal);
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
}

Player.prototype.renderSplitHand = function(){
  let display = this.splitHand.display;
  display.innerHTML = '';
  this.splitHand.cards.forEach(function(card){
    display.appendChild(card.render());
  });
}

Player.prototype.renderSplitHandValue = function(){
  let value = this.splitHand.value;
  this.splitHand.totalDisplay.innerHTML = value;
}

export { Player };
