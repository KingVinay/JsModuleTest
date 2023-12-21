let check = false;
let computerch = '';
const ruleBook = document.querySelector('.ruleBook');
const rulesButton = document.querySelector('.rulesButton');
const closeButton = document.querySelector('.closeButton');
const result = document.querySelector('.result');
const r1 = document.getElementById('result1');
const r2 = document.getElementById('result2');
const userTagconnect = document.querySelector('#playertag');
const computerTagconnect = document.querySelector('#computertag');

window.onload = updateScoreUI();

function handleRuleMenuClick() {
	ruleBook.classList.toggle('open');
}

rulesButton.addEventListener('click', handleRuleMenuClick);
closeButton.addEventListener('click', handleRuleMenuClick);

// Function to get the score from local storage
function getScoreFromLocalStorage() {
  const playerScore = parseInt(localStorage.getItem('playerscore')) || 0;
  const computerScore = parseInt(localStorage.getItem('computerscore')) || 0;
  return { playerScore, computerScore };
}

// Function to update the score in the UI and local storage
function updateScoreUI() {
  const { playerScore, computerScore } = getScoreFromLocalStorage();
  document.getElementById('playerscore').innerText = playerScore;
  document.getElementById('computerscore').innerText = computerScore;
}

// Function to play the game
function playGame(playerChoice) {
  if (check) {
		return;
	}
  ClickedCircle(playerChoice);
  var choices = ['rock', 'paper', 'scissor'];
  var computerChoice = choices[Math.floor(Math.random() * choices.length)];
  computerch = computerChoice;

  if (playerChoice === computerChoice) {
    r1.innerText = 'TIE UP';
		r2.innerText = '';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissor') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissor' && computerChoice === 'paper')
  ) {
    r1.innerText = 'You Win';
		r2.innerText = 'Against PC';
    updateScore('player');
  } else {
    r1.innerText = 'You Lose';
		r2.innerText = 'Against PC';
    updateScore('computer');
  }
  result.style.display = 'flex';
  updateScoreUI();
}

// Function to update the score in local storage
function updateScore(winner) {
  const { playerScore, computerScore } = getScoreFromLocalStorage();
  if (winner === 'player') {
    localStorage.setItem('playerscore', playerScore + 1);
  } else {
    localStorage.setItem('computerscore', computerScore + 1);
  }
}

function ClickedCircle(clickedOption){
	if (check) {
		return;
	}
	check = true;
	const clickedCircle = document.querySelector(`.${clickedOption}`);
	console.log(clickedCircle);

	const allCircles = document.querySelectorAll('.circle');
	allCircles.forEach((circle) => {
		if (circle !== clickedCircle) {
			circle.style.cursor;
			circle.style.transition = 'all 0.5s ease';
			circle.style.opacity = '0';
			circle.style.pointerEvents = 'none';
		}
	});

	const allconnects = document.querySelectorAll('.connect');
	allconnects.forEach((connect) => {
		connect.style.opacity = '0';
	});

	clickedCircle.style.transition = 'all 1s ease';
	if (clickedOption === 'rock') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'paper') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	} else if (clickedOption === 'scissor') {
		clickedCircle.style.top = '50%';
		clickedCircle.style.left = '-50%';
	}

  const choices = document.querySelector('.choices');

	const pcLoader = document.createElement('div');
	pcLoader.classList.add('pcLoader');
	choices.appendChild(pcLoader);

	setTimeout(() => {
		choices.removeChild(pcLoader);
		const computerCircle = generateComputerCircle()},0);
}

function generateComputerCircle() {
	const option = computerch;
	const circle = document.createElement('div');
	circle.classList.add('computerOption', 'circle', option);

	const bigcircle = document.createElement('div');
	bigcircle.classList.add('bigcircle');

	const smallcircle = document.createElement('div');
	smallcircle.classList.add('smallcircle');

	const image = document.createElement('div');
	image.classList.add('image');

	const img = document.createElement('img');
	img.src = `Images/${option+'icon'}.png`;

	userTagconnect.innerText = 'You picked';
	computerTagconnect.innerText = 'PC picked';

	const shade1 = document.createElement('div');
	const shade2 = document.createElement('div');
	const shade3 = document.createElement('div');
	shade1.classList.add('shade', 'shade1');
	shade2.classList.add('shade', 'shade2');
	shade3.classList.add('shade', 'shade3');

	const shades = document.createElement('div');
	shades.classList.add('shades');
	shades.appendChild(shade1);
	shades.appendChild(shade2);
	shades.appendChild(shade3);

	image.appendChild(img);
	smallcircle.appendChild(image);
	bigcircle.appendChild(smallcircle);
	circle.appendChild(bigcircle);
	circle.appendChild(shades);

	setTimeout(() => {
		document.querySelector('.choices').appendChild(circle);
	}, 10);
	return circle;
}

function resetGame() {
	location.reload();
}
