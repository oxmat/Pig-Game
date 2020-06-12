/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// Variables Declare krro
var scores, roundScore, activePlayer, gamePlaying;

inIt();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //jb click hu tu aik randon number generate hu 1-6 k darmayan
    var dice = Math.floor(Math.random() * 6 + 1);

    //dice k number ko roundScore variable mein store krro aur pehly waly mein plus kro
    roundScore += dice;

    if (dice !== 1) {
      //current score update kro
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;

      //Image number k mutabiq change krro
      var imageDOM = document.querySelector(".dice");
      imageDOM.style.display = "block";
      imageDOM.src = "dice-" + dice + ".png";
    } else {
      switchPlayer();
    }
  }
});

//jabb hold button click hu tu round score total score mein stor hu jaye aur activePlayer change hu jaye
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      document.querySelector(".dice").style.display = "none";
      gamePlaying = false;
    } else {
      switchPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", inIt);

function switchPlayer() {
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

function inIt() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.getElementById("current-0").textContent = roundScore;
  document.getElementById("current-1").textContent = roundScore;
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.add("active");
}
