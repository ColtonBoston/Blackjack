(function renderStats(){
  let stats = {};
  if (localStorage.getItem('blackjackStatistics') === null){
    stats = {
     numOfWins: 0,
     numOfLosses: 0,
     numOfBlackjacks: 0,
     numOfPushes: 0,
     lifetimeEarnings: 0
   };
 } else {
   stats = JSON.parse(localStorage.getItem('blackjackStatistics'));
 }

  let statsContainer = document.getElementById('stats-container');
  // let earningsString =
  statsContainer.innerHTML = `
    <table>
      <tr>
        <th class='text-shadow'>Number of wins:</th>
        <td>${stats.numOfWins}</td>
      </tr>
      <tr>
        <th class='text-shadow'>Number of losses:</th>
        <td>${stats.numOfLosses}</td>
      </tr>
      <tr>
        <th class='text-shadow'>Number of Blackjacks:</th>
        <td>${stats.numOfBlackjacks}</td>
      </tr>
      <tr>
        <th class='text-shadow'>Number of pushes:</th>
        <td>${stats.numOfPushes}</td>
      </tr>
      <tr>
        <th class='text-shadow'>Lifetime Earnings:</th>
        <td>${stats.lifetimeEarnings >= 0 ? '$' : '-$'}${Math.abs(stats.lifetimeEarnings).toFixed(2)}</td>
      </tr>
    </table>
  `;
})();
