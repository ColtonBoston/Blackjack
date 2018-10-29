import { Person } from './person';
import * as Page from './page';

function Player(){
  Person.call(this);

  this.name = 'Player';
  this.money = 100;
  this.wager = 0;
  this.hasSplitHand = false;
}

Player.prototype = Object.create(Person.prototype);

Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true
});

// Render all of player's data that changes
Player.prototype.renderAll = function(){
  this.renderHand();
  this.renderMoney();
  this.renderWager();
}

Player.prototype.renderHand = function(){
  Person.prototype.renderHand.call(this, Page.displays.playerHand);
  Person.prototype.renderHandValue.call(this, Page.displays.playerTotal);
}

Player.prototype.renderMoney = function(){
  Page.displays.playerMoney.innerHTML = `Player money: $${this.money.toFixed(2)}`;
}

Player.prototype.renderWager = function(){
  Page.displays.wager.innerHTML = `Current wager: $${this.wager}`;
}

Player.prototype.clearWager = function(){
  this.wager = 0;
}

Player.prototype.canSplitHand = function(){
  if (this.hand.cards.length === 2 && this.hand.cards[0].value === this.hand.cards[1].value){
    return true;
  } else {
    return false;
  }
}

export { Player };
