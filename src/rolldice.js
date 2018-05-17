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

var scores, currentScore, preDiceNo, activePlayer, gameOver;
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
  currentScore = 0;
  preDiceNo = 0;
  activePlayer = 1;
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

function roll_dice() {
  const rollingCount = Math.floor(Math.random()*10);
  let diceNo;
  for (let i = 0; i <= rollingCount; i++) {
    diceNo = Math.floor(Math.random()*6) + 1;
  }
  DOM.dice.src = '../img/dice-' + diceNo + '.png';
  DOM.dice.alt = 'dice-' + diceNo;
  DOM.dice.style.display = 'block';

  if (diceNo === 1) {
    changePlayer()
  } else if (diceNo === preDiceNo) {
    if (diceNo === 6){
      gameIsOver('Loser');
    } else {
      scores[activePlayer] = 0;
      changePlayer();
    }
  } else {
    currentScore += diceNo;
    document.getElementById('current-score-'+activePlayer).innerHTML = currentScore;
    if ((scores[activePlayer] + currentScore) >= winScore ) {
      gameIsOver('Winner');
    } else {
      preDiceNo = diceNo;
    }
  }
}

function changePlayer() {
  currentScore = 0;
  preDiceNo = 0;
  document.querySelector('.player-'+activePlayer).classList.toggle('active');
  document.getElementById('total-score-'+activePlayer).innerHTML = scores[activePlayer];
  activePlayer = (activePlayer === 1) ? 2 : 1 ;
  document.querySelector('.player-'+activePlayer).classList.toggle('active');
  document.getElementById('current-score-'+activePlayer).innerHTML = '0' ;
}

function gameIsOver(result) {
  gameOver = true;
  document.getElementById('player-'+activePlayer).textContent = result;
}

document.querySelector('.btn-roll').addEventListener('click', () => {
  if (gameOver) {
    DOM.message.style.display = 'block'
  } else {
    roll_dice();
  }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
  if (gameOver) {
    DOM.message.style.display = 'block'
  } else {
    scores[activePlayer] += currentScore;
    changePlayer();
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
  document.getElementById('target-score').innerHTML = winScore;
  if (gameOver) {
    init();
  }
})
