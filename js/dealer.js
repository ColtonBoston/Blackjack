import { Person } from './person';

function Dealer(){
  Person.call(this);
}

Dealer.prototype = Object.create(Person.prototype);

Object.defineProperty(Dealer.prototype, 'constructor', {
    value: Dealer,
    enumerable: false,
    writable: true
});

export { Dealer };
