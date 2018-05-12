/*
GAME RULES:

-   The game has 2 players, playing in rounds.

-   The players set the target score to start game(50 is default).

-   In each turn, a player rolls a dice as many times as he whishes.
    Each result get added to his ROUND score (current score).

-   BUT, 
    if the player rolls a 1, all his ROUND score gets lost. After that,
    it's the next player's turn.

    If the player rolls the same number twice in a row, all his/her total score
    After that, it's the next player's turn.

    If the player rolls two 6s, he/she will lose the game.           

-   The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
    After that, it's the next player's turn

-   The first player to reach target points on GLOBAL score wins the game

-   The player can choose 'New Game' to restart a New Game.
*/

var scores, roundScore, preDice, activePlayer, currentScore, gameOver;
var winScore = 30;
var lastWinScore = winScore;
var DOM = {
  dice: document.getElementById('dice'),
  message: document.querySelector('.message'),
  target: document.getElementById('target-score'),
}

init();

function init() {
  scores = [null, 0, 0];
  roundScore = 0;
  preDice = 0;
  activePlayer = 1;
  currentScore = 0;
  gameOver = false;

  DOM.dice.style.display = 'none';
  DOM.message.style.display = 'none';
  DOM.target.innerHTML = "Target : " + winScore;

  document.getElementById('player-1').innerHTML = 'Player 1';
  document.getElementById('total-score-1').textContent = '0';
  document.getElementById('current-score-1').textContent = '0';
  document.getElementById('player-2').innerHTML = 'Player 2';
  document.getElementById('total-score-2').innerHTML = '0';
  document.getElementById('current-score-2').innerText = '0';

  document.querySelector('.player-1').classList.add('active');
  document.querySelector('.player-2').classList.remove('active');
}

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gameOver) {
    DOM.message.style.display = 'block'
    return
  }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gameOver) {
    DOM.message.style.display = 'block'
    return
  }
})

document.querySelector('.btn-new').addEventListener('click', ()=> {
  document.querySelector('.modal').style.display = 'block';
} )

document.getElementById('cancel').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';  
})

document.getElementById('submit').addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';  
  const inputValue = document.getElementsByTagName('input')[0].value;
  winScore = (parseInt(inputValue) > 20) ? parseInt(inputValue) : lastWinScore ;
  lastWinScore = winScore;
  init();
})
