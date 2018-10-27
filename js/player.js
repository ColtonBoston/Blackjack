import { Person } from './person';

function Player(money){
  Person.call(this);

  this.money = money;
}

Player.prototype = Object.create(Person.prototype);

Object.defineProperty(Player.prototype, 'constructor', {
  value: Player,
  enumerable: false,
  writable: true
});

export { Player };
