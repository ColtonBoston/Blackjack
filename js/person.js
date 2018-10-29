function Person(){
  this.hand = {
    cards: [],
    value: 0,
    numOfHighAces: 0
  };
}

Person.prototype.addToHand = function(card){
  this.hand.cards.push(card);
  this.updateHandValue();
  if (card.rank === 'Ace'){
    this.hand.numOfHighAces++;
  }
}

Person.prototype.updateHandValue = function(){
  this.hand.value = this.hand.cards.reduce((acc, card) => acc + card.value, 0);
}

Person.prototype.reduceOneHighAce = function(){
  let index = this.hand.cards.findIndex((card) => card.value === 11);
  console.log(`Reducing ${this.name}'s ${this.hand.cards[index].rank} of ${this.hand.cards[index].suit} to 1`);

  this.hand.cards[index].value = 1;
  this.hand.numOfHighAces--;
  this.updateHandValue();
  this.renderHand();
}

Person.prototype.renderHand = function(parentElement){
  parentElement.innerHTML = '';
  this.hand.cards.forEach(function(card){
    let cardDiv = document.createElement('div');
    if (!card.isFaceUp){
      cardDiv.innerHTML = 'Hidden';
      console.log(card);
    } else {
      cardDiv.innerHTML = `${card.rank} of ${card.suit}`;
    }
    parentElement.append(cardDiv);
  });
}

Person.prototype.renderHandValue = function(parentElement){
  let value = this.hand.value > 0 ? this.hand.value : "";
  parentElement.innerHTML = value;
}

Person.prototype.checkForBust = function(){
  if (this.hand.value > 21){
    if (this.hand.numOfHighAces > 0){
      this.reduceOneHighAce();
      this.checkForBust();
    } else {
      console.log('Bust');
      return true;
    }
  } else {
    return false;
  }
}

Person.prototype.clearHand = function(){
  this.hand.cards = [];
  this.hand.value = 0;
  this.hand.numOfHighAces = 0;
}

Person.prototype.findFirstHighAceIndex = function(){
  let index = this.hand.cards.findIndex((card) => card.value === 11);
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
