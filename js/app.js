import { Person } from './person';
import { Player } from './player';
import { Dealer } from './dealer';
import { Card } from './card';
import * as Game from './functions';

let btnNewGame = document.getElementById('btn-new-game');

// Begin game when 'Create New Game' btn is clicked
btnNewGame.addEventListener('click', main);

function main(){
  // Game constants
  const NUM_OF_DECKS = 6,
        BLACKJACK_RATIO = 3 / 2,
        NORMAL_RATIO = 1,
        MIN_WAGER = 5,
        MAX_WAGER = 100;

  console.log('Creating new game.');
  // Create player and dealer
  let player = new Player(100);
  let dealer = new Dealer();

  // Build and concatenate a num of decks, then shuffle the entire deck.
  let deck = [];

  for (let i = 0; i < NUM_OF_DECKS; i++){
    deck = deck.concat(Game.buildDeck());
  }

  Game.shuffle(deck);

  // User choose wager

}
