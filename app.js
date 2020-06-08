/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Declaring Variables
var scores, roundScore, activePlayer;
scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
  //ek random number loo
  var dice = Math.floor(Math.random() * 6 + 1);

  // us random number ko pechly numbers mein plus kr k roundScore mein save kiya
  roundScore += dice;

  if (dice !== 1) {
    //roundScore ko display kiya
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    //ek vaiable bnaya query selector ko use krny k liye
    //aur images change ki random number k mutabiq
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
  } else {
    changePlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // current score score array mein save kro
  scores[activePlayer] += roundScore;
  document.getElementById("score-" + activePlayer).textContent =
    scores[activePlayer];
  changePlayer();
});

function changePlayer() {
  // round score zero kr k show kro
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;
  //active Player change kro
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //class toggel kro
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}
