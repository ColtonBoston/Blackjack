import { Person } from './person';
import * as Page from './page';

function Dealer(){
  Person.call(this);

  this.name = 'Dealer';
  this.minimumTotal = 17;
  this.hand.setDisplays(Page.displays.dealerHand, Page.displays.dealerTotal);
}

Dealer.prototype = Object.create(Person.prototype);

Object.defineProperty(Dealer.prototype, 'constructor', {
    value: Dealer,
    enumerable: false,
    writable: true
});

export { Dealer };
