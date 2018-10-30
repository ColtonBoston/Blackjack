function Person(){
  this.hand = {
    cards: [],
    value: 0,
    numOfAces: 0
  };
}

Person.prototype.addToHand = function(card){
  this.hand.cards.push(card);
  if (card.rank === 'Ace'){
    this.hand.numOfAces++;
  }
  this.updateHandValue();

}

Person.prototype.updateHandValue = function(){
  let value = this.hand.cards.reduce((acc, card) => acc + card.value, 0);
  if (this.hand.numOfAces > 0 && value > 21){
    for (let i = 0; i < this.hand.numOfAces; i++){
      value -= 10;
      if (value <=21) break;
    }
  }
  this.hand.value = value;
}

Person.prototype.renderHand = function(parentElement){
  parentElement.innerHTML = '';
  this.hand.cards.forEach(function(card){
    parentElement.appendChild(card.render());
  });
}

Person.prototype.renderHandValue = function(parentElement){
  let value = this.hand.value > 0 ? this.hand.value : "";
  parentElement.innerHTML = value;
}

Person.prototype.checkForBust = function(){
  return this.hand.value > 21;
}

Person.prototype.clearHand = function(){
  this.hand.cards = [];
  this.hand.value = 0;
  this.hand.numOfAces = 0;
}

Person.prototype.checkForBlackjack = function(){
  if (this.hand.value === 21){
    return true;
  } else {
    return false;
  }
}

Person.prototype.checkFor21 = Person.prototype.checkForBlackjack;

export { Person };
