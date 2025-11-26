const questoes = [
    {
        question: "O que diferencia uma relação ecológica harmônica de uma desarmônica?",
        respostas: [
            { text: "A presença de predadores", correct: false},
            { text: "O benefício ou prejuízo entre os envolvidos", correct: true},
            { text: "A quantidade de espécies envolvidas", correct: false},
            { text: "A competição entre seres humanos", correct: false},
        ]
    },
    {
        question: "“Um solo saudável e biodiverso inclui vertebrados, invertebrados, vírus, bactérias, fungos, líquens e plantas que fornecem uma infinidade de funções e serviços ecossistêmicos.” Sobre os invertebrados é correto afirmar que:",
        respostas: [
            { text: "Os escorpiões, classificados como miriápodes, são predadores e atuam na decomposição da matéria orgânica.", correct: false},
            { text: "Os embuás ou piolhos-de-cobra são classificados como anelídeos, pois apresentam tagmas, são sésseis e atuam no controle biológico de pragas.", correct: false},
            { text: "Os moluscos terrestres contribuem para a fertilidade física do solo, porque constroem e mantêm a estrutura do solo.", correct: false},
            { text: "As minhocas liberam os nutrientes contidos na matéria orgânica do solo e a protegem fisicamente nos coprólitos.", correct: true},
        ]
    },
    {
        question: "Os casos locais de raiva humana no Pará ocorrem, basicamente, por transmissão de morcegos hematófagos. Essa situação é exemplo de:",
        respostas: [
            { text: "Interespecífica do tipo predatismo.", correct: false},
            { text: "Interespecífica do tipo parasitismo.", correct: true},
            { text: "Intraespecífica do tipo canibalismo.", correct: false},
            { text: "Intraespecífica do tipo competição.", correct: false},
        ]
    },
    {
        question: "A rêmora é um peixe que se alimenta de restos deixados pelo tubarão, sem prejudicá-lo. Essa relação é chamada de:",
        respostas: [
            { text: "Comensalismo", correct: true},
            { text: "Mutualismo", correct: false},
            { text: "Predação", correct: false},
            { text: "Inquilinismo", correct: false},
        ]
    },
    {
        question: "Quando indivíduos da mesma espécie competem por recursos, essa relação é chamada de:",
        respostas: [
            { text: "Competição interespecífica", correct: false},
            { text: "Canibalismo", correct: false},
            { text: "Competição intraespecífica", correct: true},
            { text: "Sociedade", correct: false},
        ]
    },
    {
        question: "Todas as relações ecológicas listadas abaixo são interespecíficas, exceto:",
        respostas: [
            { text: "Comensalismo", correct: false},
            { text: "Mutualismo", correct: false},
            { text: "Colônia", correct: true},
            { text: "Parasitismo", correct: false},
        ]
    },
    {
        question: "Considerando a espécie dos indivíduos em uma relação ecológica, elas podem ser classificadas em:",
        respostas: [
            { text: "Simpátricas ou alopátricas.", correct: false},
            { text: "Harmônicas ou desarmônicas.", correct: false},
            { text: "Autotróficas ou heterotróficas.", correct: false},
            { text: "Intra-específicas ou interespecíficas.", correct: true},
        ]
    },
    {
        question: "A relação em que uma espécie mata e consome a outra é chamada de:",
        respostas: [
            { text: "Competição", correct: false},
            { text: "Herbivoria", correct: false},
            { text: "Colônia", correct: false},
            { text: "Predação", correct: true},
        ]
    },
    {
        question: "Qual é a principal diferença entre mutualismo e protocooperação?",
        respostas: [
            { text: "Qual é a principal diferença entre mutualismo e protocooperação?", correct: false},
            { text: "No mutualismo a relação é obrigatória; na protocooperação, não.", correct: true},
            { text: "No mutualismo ambos são prejudicados.", correct: false},
            { text: "Na protocooperação apenas um se beneficia.", correct: false},
        ]
    },
    {
        question: "O que ocorre na relação de parasitismo?",
        respostas: [
            { text: "Um se beneficia e o outro é prejudicado.", correct: true},
            { text: "Ambos se beneficiam.", correct: false},
            { text: "Ambos são prejudicados.", correct: false},
            { text: "Nenhum é afetado.", correct: false},
        ]
    },
];

const elementoQuestao = document.getElementById("question");
const botaoResposta = document.getElementById("botaoResposta");
const nextButton = document.getElementById("next-btn");

let indexQuestaoAtual = 0;
let pontuacao = 0;

function comecarQuiz() {
    indexQuestaoAtual = 0;
    pontuacao = 0;
    nextButton.innerHTML = "Próxima Pergunta";
    mostrarQuestao();
}

function resetarEstado() {
    nextButton.style.display = "none";
    botaoResposta.innerHTML = "";
}

function mostrarQuestao() {
    resetarEstado();
    let questaoAtual = questoes[indexQuestaoAtual];
    elementoQuestao.innerHTML = `${indexQuestaoAtual + 1}. ${questaoAtual.question}`;

    questaoAtual.respostas.forEach(resposta => {
        const button = document.createElement("button");
        button.innerHTML = resposta.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selecionarResposta(button, resposta.correct));
        botaoResposta.appendChild(button);
    });
}

function selecionarResposta(botao, correta) {
    const botoes = botaoResposta.querySelectorAll("button");
    botoes.forEach(btn => btn.disabled = true);

    if (correta) {
        botao.style.backgroundColor = "#4CAF50"; // verde
        pontuacao++;
    } else {
        botao.style.backgroundColor = "#f44336"; // vermelho
    }

    nextButton.style.display = "block";
}

function mostrarResultado() {
    resetarEstado();
    elementoQuestao.innerHTML = `Você acertou ${pontuacao} de ${questoes.length} questões!`;
    nextButton.innerHTML = "Reiniciar Quiz";
    nextButton.style.display = "block";
}

function proximaQuestao() {
    indexQuestaoAtual++;
    if (indexQuestaoAtual < questoes.length) {
        mostrarQuestao();
    } else {
        mostrarResultado();
    }
}

nextButton.addEventListener("click", () => {
    if (indexQuestaoAtual < questoes.length) {
        proximaQuestao();
    } else {
        comecarQuiz();
    }
});

comecarQuiz();
