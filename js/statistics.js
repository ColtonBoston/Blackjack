let stats = {};
if (localStorage.getItem('blackjackStatistics') === null){
  stats = {
   numOfWins: 0,
   numOfLosses: 0,
   numOfBlackjacks: 0,
   numOfPushes: 0,
   lifetimeEarnings: 0
 };
  localStorage.setItem('blackjackStatistics', JSON.stringify(stats));
} else {
  stats = JSON.parse(localStorage.getItem('blackjackStatistics'));
}

export let data = stats;

export function save(){
  localStorage.setItem('blackjackStatistics', JSON.stringify(data));
}
