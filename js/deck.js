import { Card } from './card';

function Deck(numOfDecks = 1){
  this.cards = [];
  this.discardPile = [];
  build.call(this);
  this.shuffle();

  function build() {
    for (let i = 1; i <= 13; i++){
      let rank;

      switch(i) {
        case 1: rank = 'Ace'; break;
        case 11: rank = 'Jack'; break;
        case 12: rank = 'Queen'; break;
        case 13: rank = 'King'; break;
        default: rank = i;
      }

      for (let j = 0; j < numOfDecks; j++){
        this.cards.push(
          new Card(rank, 'Spades'),
          new Card(rank, 'Clubs'),
          new Card(rank, 'Hearts'),
          new Card(rank, 'Diamonds'),
        );
      }
    }
  }
}

Deck.prototype.build = function(numOfDecks){
  this.cards = [];
  for (let i = 1; i <= 13; i++){
    let rank;

    switch(i) {
      case 1: rank = 'Ace'; break;
      case 11: rank = 'Jack'; break;
      case 12: rank = 'Queen'; break;
      case 13: rank = 'King'; break;
      default: rank = i;
    }

    for (let j = 0; j < numOfDecks; j++){
      this.cards.push(
        new Card(rank, 'Spades'),
        new Card(rank, 'Clubs'),
        new Card(rank, 'Hearts'),
        new Card(rank, 'Diamonds'),
      );
    }
  }
}

// Modern Fisher-Yates shuffle algorithm introduced by Richard Durstenfeld
// Time complexity: O(n)
Deck.prototype.shuffle = function(){
  let i, j, temp;

  for (i = this.cards.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    temp = this.cards[j];
    this.cards[j] = this.cards[i];
    this.cards[i] = temp;
  }
}

Deck.prototype.checkForOutOfCards = function(){
  if (this.cards.length === 0){
    console.log('Deck out of cards. Discard pile shuffled.')
    this.cards = this.discardPile;
    this.discardPile = [];
    this.restoreAceValues();
    this.shuffle();
  }
}

Deck.prototype.restoreAceValues = function(){
  this.cards.forEach(function(card){
    if (card.rank === 'Ace' && card.value === 1){
      card.value = 11;
    }
  });
}

Deck.prototype.dealCard = function(){
  let cardToDeal = this.cards.pop();
  console.log(`Dealt ${cardToDeal.toString()}`);
  this.checkForOutOfCards();
  return cardToDeal;
}

Deck.prototype.addHandToDiscardPile = function(hand){
  this.discardPile = this.discardPile.concat(hand);
}

export { Deck };
