import { Card } from './card';

function Hand(){
  this.cards = [],
  this.value = 0,
  this.numOfAces = 0,
  this.isActive = true, // Do not change this value in the dealer's hand,
  this.isCompleted = false
}

Hand.prototype.setDisplays = function(display, totalDisplay){
  this.display = display;
  this.totalDisplay = totalDisplay;
}

Hand.prototype.addCard = function(card){
  this.cards.push(card);
  if (card.rank === 'Ace'){
    this.numOfAces++;
  }
  this.updateValue();
}

Hand.prototype.updateValue = function(){
  let value = this.cards.reduce((acc, card) => acc + card.value, 0);
  if (this.numOfAces > 0 && value > 21){
    for (let i = 0; i < this.numOfAces; i++){
      value -= 10;
      if (value <= 21) break;
    }
  }
  this.value = value;
}

Hand.prototype.render = function(){
  let display = this.display;
  this.display.innerHTML = '';
  this.cards.forEach(function(card){
    display.appendChild(card.render());
  });
}

Hand.prototype.renderValue = function(){
  let value = this.value > 0 ? this.value : "";
  this.totalDisplay.innerHTML = value;
}

Hand.prototype.checkForBust = function(){
  return this.value > 21;
}

Hand.prototype.clear = function(){
  this.cards = [];
  this.value = 0;
  this.numOfAces = 0,
  this.isActive = true, // Do not change this value in the dealer's hand,
  this.isCompleted = false;
}

Hand.prototype.checkForBlackjack = function(){
  if (this.value === 21){
    return true;
  } else {
    return false;
  }
}

Hand.prototype.setToActive = function(){
  this.isActive = true;
}

Hand.prototype.setToInactive = function(){
  this.isActive = false;
}

Hand.prototype.complete = function(){
  this.isCompleted = true;
}

Hand.prototype.checkFor21 = Hand.prototype.checkForBlackjack;

export { Hand };
