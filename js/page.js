// Takes array of objects with element, eventType, and fn properties and adds an event listener to each element
export function addListeners(items){
  items.forEach((item) => item.element.addEventListener(item.eventType, item.fn));
}

export function hideUIElement(element){
  element.classList.add('display-none');
}

export function showUIElement(element){
  element.classList.remove('display-none');
}

export function clearUIElement(element){
  element.innerHTML = "";
}

// DOM Elements Object
export const buttons = {
    startGame: document.getElementById('btn-start-game'),
    makeWager: document.getElementById('btn-make-wager'),
    hit: document.getElementById('btn-hit'),
    stand: document.getElementById('btn-stand'),
    split: document.getElementById('btn-split'),
    doubleDown: document.getElementById('btn-double-down'),
    surrender: document.getElementById('btn-surrender'),
    newHand: document.getElementById('btn-new-hand')
};

export const inputs = {
  wager: document.getElementById('wager-input')
};

export const containers = {
  dealer: document.getElementById('dealer-container'),
  player: document.getElementById('player-container'),
  wager: document.getElementById('wager-container'),
  newHand: document.getElementById('new-hand-container')
};

export const displays = {
  playerHand: document.getElementById('player-hand'),
  dealerHand: document.getElementById('dealer-hand'),
  playerTotal: document.getElementById('player-total'),
  dealerTotal: document.getElementById('dealer-total'),
  playerOptions: document.getElementById('player-options'),
  wager: document.getElementById('wager-display'),
  playerMoney: document.getElementById('player-money-display'),
  handResult: document.getElementById('hand-result-display')
};
