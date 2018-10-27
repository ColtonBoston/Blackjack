function Card(rank, suit){
  this.rank = rank;
  this.suit = suit;
  
  switch (rank){
    case 'Ace': this.value = 11; break;
    case 'Jack':
    case 'Queen':
    case 'King': this.value = 10; break;
    default: this.value = rank
  }
}

export { Card };
