/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//Declaring Variables
var scores, roundScore, activePlayer, gamePlaying;

// Global execution function
init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //ek random number loo
    var dice = Math.floor(Math.random() * 6 + 1);

    // us random number ko pechly numbers mein plus kr k roundScore mein save kiya
    roundScore += dice;

    if (dice !== 1) {
      //roundScore ko display kiya
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      //ek vaiable bnaya query selector ko use krny k liye
      //aur images change ki random number k mutabiq
      var diceDOM = document.querySelector(".dice");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice + ".png";
      diceDOM.classList.add("rotate-center");
    } else {
      changePlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // current score score array mein save kro
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    // check kro k kon jeeta
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER";
      var playerPanelDOM = document.querySelector(
        ".player-" + activePlayer + "-panel"
      );
      playerPanelDOM.classList.add("winner");
      playerPanelDOM.classList.remove("active");
      roundScore = 0;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;
    } else {
      changePlayer();
    }
  }
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

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");

  document.querySelector(".dice").style.display = "none";
}
