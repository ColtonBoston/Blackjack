import { Card } from './card';

export function buildDeck(){
  let deck = [];

  for (let i = 1; i <= 13; i++){
    let rank;

    switch(i) {
      case 1: rank = 'Ace'; break;
      case 11: rank = 'Jack'; break;
      case 12: rank = 'Queen'; break;
      case 13: rank = 'King'; break;
      default: rank = i;
    }

    deck.push(
      new Card(rank, 'Spades'),
      new Card(rank, 'Clubs'),
      new Card(rank, 'Hearts'),
      new Card(rank, 'Diamonds'),
    );
  }

  return deck;
}

// Modern Fisher-Yates shuffle algorithm introduced by Richard Durstenfeld
// Time complexity: O(n)
export function shuffle(array){
  let i, j, temp;

  for (i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
}

export function drawCard(deck){
  return deck.pop();
}
