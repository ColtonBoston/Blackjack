export function buildDeck(){
  let deck = [];

  for (var i = 1; i <= 13; i++){
    var rank;

    switch(i) {
      case 1: rank = 'Ace'; break;
      case 11: rank = 'Jack'; break;
      case 12: rank = 'Queen'; break;
      case 13: rank = 'King'; break;
      default: rank = i;
    }

    deck.push(rank + ' of Spades',
      rank + ' of Hearts',
      rank + ' of Diamonds',
      rank + ' of Clubs');
  }

  return deck;
}

export function shuffle(deck){
  console.log('shuffle');
}

Array.prototype.drawCard = Array.prototype.pop;
