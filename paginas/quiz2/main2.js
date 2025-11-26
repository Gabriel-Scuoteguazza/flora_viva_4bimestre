const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.querySelector('.score');
const gameBoard = document.querySelector('.game-board');

const gameOverScreen = document.getElementById('gameOverScreen');
const gameOverText = document.getElementById('gameOverText');

let score = 0;
let gameOver = false;

const jump = () => {
  if (!gameOver) {
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
};

const loop = setInterval(() => {
  if (gameOver) return;

  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  // aumenta score
  score++;
  scoreElement.textContent = `Score: ${score}`;

  // colisão
  if (pipePosition <= 145 && pipePosition > 0 && marioPosition <= 50) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './arquivos/wolf_sit_right.png';

    gameOver = true;
    clearInterval(loop);

    showGameOverMessage(); // aparece a tela final
  }

  // mudar cenário e obstáculo
  if (score >= 1000 && score < 2000) {
    gameBoard.style.backgroundImage = "url('./arquivos/back3.png')";
    pipe.src = "./arquivos/pipe3.png";
  } else if (score >= 2000 && score < 3000) {
    gameBoard.style.backgroundImage = "url('./arquivos/back4.png')";
    pipe.src = "./arquivos/pipe4.png";
  } else if (score >= 3000 && score < 4000) {
    gameBoard.style.backgroundImage = "url('./arquivos/back5.png')";
    pipe.src = "./arquivos/pipe5.png";
  } else if (score >= 4000 && score < 5000) {
    gameBoard.style.backgroundImage = "url('./arquivos/back6.png')";
    pipe.src = "./arquivos/pipe6.png";
  }

}, 10);

document.addEventListener('keydown', jump);

// Mensagem de fim de jogo
function showGameOverMessage() {
  let message = "";

  if (score < 1000) {
    message = "COMPETIÇÃO INTRAESPECÍFICA - O lobo perdeu seu território para o lobo inimigo.";
  } else if (score >= 1000 && score < 2000) {
    message = "PREDATISMO - O lobo predou o coelho!";
  } else if (score >= 2000 && score < 3000) {
    message = "COMPETIÇÃO - O lobo encontrou outro desafio.";
  } else if (score >= 3000 && score < 4000) {
    message = "INQUILINISMO – O lobo encontrou um abrigo, a árvore!";
  } else if (score >= 4000 && score < 5000) {
    message = "COMPETIÇÃO INTERESPECÍFICA - O lobo perdeu sua caça para um urso.";
  }

  else {
    message = "O lobo explorou todos os cenários!";
  }

  gameOverText.textContent = message;
  gameOverScreen.style.display = "block";
}

// Reiniciar jogo
function restartGame() {
  location.reload();
}

const restartBtn = document.getElementById("restartBtn");
const backBtn = document.getElementById("backBtn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    console.log("oi")
    location.reload(); // recarrega a página
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "../jogos.html"; // volta para a página de jogos
  });
}