(function renderStats(){
  let stats = JSON.parse(localStorage.getItem('blackjackStatistics'));
  console.log(stats);
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
