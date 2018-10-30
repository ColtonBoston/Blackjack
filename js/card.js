function Card(rank, suit){
  this.rank = rank;
  this.suit = suit;
  this.isFaceUp = true;

  switch (rank){
    case 'Ace': this.value = 11; break;
    case 'Jack':
    case 'Queen':
    case 'King': this.value = 10; break;
    default: this.value = rank
  }
}

Card.prototype.toString = function(){
  return `${this.rank} of ${this.suit}`;
}

Card.prototype.render = function(){
  let cardDiv = document.createElement('div');
  if (!this.isFaceUp){
    cardDiv.innerHTML = 'Hidden';
  } else {
    cardDiv.innerHTML = `${this.rank} of ${this.suit}`;
  }
  return cardDiv;
}

export { Card };
