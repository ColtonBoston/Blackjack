function Person(){
  this.hand = [];
}

Person.prototype.addToHand = function(card){
  this.hand.push(card);
}

export { Person };
