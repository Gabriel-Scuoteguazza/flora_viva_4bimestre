// Lista de perguntas com respostas sobre relações ecológicas
const perguntasRespostas = [
    {
        pergunta: "Como é chamada a relação em que um organismo se beneficia e o outro é prejudicado?",
        resposta: "parasitismo"
    },
    {
        pergunta: "Qual é a relação em que ambos os organismos se beneficiam?",
        resposta: "mutualismo"
    },
    {
        pergunta: "Como se chama a relação em que um organismo se alimenta do outro causando sua morte?",
        resposta: "predacao"
    },
    {
        pergunta: "Qual é a relação em que um organismo se beneficia enquanto o outro não é prejudicado nem beneficiado?",
        resposta: "comensalismo"
    },
    {
        pergunta: "Como é chamada a relação em que espécies diferentes competem por recursos limitados?",
        resposta: "competicao"
    },
    {
        pergunta: "Qual é a relação em que uma planta libera substâncias químicas que inibem o crescimento de outras?",
        resposta: "amensalismo"
    }
];

let perguntaEscolhida;
let respostaEscolhida;
let exibicaoPalavra;
let letrasChutadas;
let tentativasRestantes;
let numerosErros;

function iniciarJogo() {
    // Sorteia uma pergunta e resposta correspondente
    const sorteio = perguntasRespostas[Math.floor(Math.random() * perguntasRespostas.length)];
    perguntaEscolhida = sorteio.pergunta;
    respostaEscolhida = sorteio.resposta;

    // Exibe a pergunta no h1
    document.querySelector(".coverCard__title").innerText = perguntaEscolhida;

    // Exibe underscores no lugar das letras
    exibicaoPalavra = Array(respostaEscolhida.length).fill('_');

    letrasChutadas = [];
    tentativasRestantes = 7;
    numerosErros = 0;

    // Limpa mensagens antigas
    document.getElementById('mensagem').style.display = "none";
    document.getElementById('botao-reiniciar').style.display = "none";
    document.getElementById('entrada-letra').disabled = false;

    atualizarExibição();
}

function atualizarExibição() {
    document.getElementById("exibicao-palavra").innerText = exibicaoPalavra.join(' ');
    document.getElementById("letras-chutadas").innerText = `${letrasChutadas.join(', ')}`;

    document.getElementById("imagem").src = `./img/Macaco${numerosErros}.png`;

    if (tentativasRestantes === 0) {
        encerrarJogo('VOCÊ PERDEU!');
    } else if (!exibicaoPalavra.includes('_')) {
        encerrarJogo('PARABÉNS! VOCÊ VENCEU!');
    }
}

function chutarLetra() {
    const entradaLetra = document.getElementById('entrada-letra');
    const letra = entradaLetra.value.toLowerCase();

    if (!letra.match(/[a-zà-ùç]/i)) {
        alert('Por favor, insira uma letra válida');
        entradaLetra.value = '';
        return;
    }

    if (letrasChutadas.includes(letra)) {
        alert('Você já tentou essa letra');
        entradaLetra.value = '';
        return;
    }

    letrasChutadas.push(letra);

    if (respostaEscolhida.includes(letra)) {
        for (let i = 0; i < respostaEscolhida.length; i++) {
            if (respostaEscolhida[i] === letra) {
                exibicaoPalavra[i] = letra;
            }
        }
    } else {
        tentativasRestantes--;
        numerosErros++;

        const somErro = document.getElementById('som-erro');
        somErro.volume = 0.3;
        somErro.currentTime = 0;
        somErro.play();

        setTimeout(() => {
            somErro.pause();
            somErro.currentTime = 0;
        }, 1000);
    }

    entradaLetra.value = '';
    atualizarExibição();
}

function encerrarJogo(mensagem) {
    document.getElementById('entrada-letra').disabled = true;
    document.getElementById('mensagem').innerText = mensagem;
    document.getElementById('mensagem').style.display = "block";
    document.getElementById('botao-reiniciar').style.display = 'block';
}

// Inicializa o jogo e configura o botão de reiniciar
window.onload = () => {
    iniciarJogo();

    const botaoReiniciar = document.getElementById('botao-reiniciar');
    botaoReiniciar.addEventListener("click", () => {
        iniciarJogo();
    });
};
