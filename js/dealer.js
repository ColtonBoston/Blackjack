import { Person } from './person';
import * as Page from './page';

function Dealer(){
  Person.call(this);

  this.name = 'Dealer';
  this.minimumTotal = 17;
}

Dealer.prototype = Object.create(Person.prototype);

Object.defineProperty(Dealer.prototype, 'constructor', {
    value: Dealer,
    enumerable: false,
    writable: true
});

Dealer.prototype.renderHand = function(){
  Person.prototype.renderHand.call(this, Page.displays.dealerHand);
}

Dealer.prototype.renderHandValue = function(){
  Person.prototype.renderHandValue.call(this, Page.displays.dealerTotal);
}

export { Dealer };
