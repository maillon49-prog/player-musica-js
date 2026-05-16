// =====================================================
// 1. PEGANDO ELEMENTOS DO HTML
// =====================================================

const audio = document.getElementById("audio");
const nomeMusica = document.getElementById("nomeMusica");
const capa = document.getElementById("capa");

const progresso = document.querySelector(".progresso");
const progressoContainer = document.querySelector(".progresso-container");

const botaoPlay = document.getElementById("play");
const botaoProxima = document.getElementById("proxima");
const botaoVoltar = document.getElementById("voltar");
const volume = document.getElementById("volume");
const botaoAleatorio = document.getElementById("aleatorio");
const botaoRepetir = document.getElementById("repetir");

const playlist = document.getElementById("playlist");

const tempoAtualTexto = document.getElementById("tempoAtual");
const duracaoTexto = document.getElementById("duracao");


// =====================================================
// 2. LISTA DE MÚSICAS
// =====================================================

const musica = [
    {
        nome: "Música 1",
        arquivo: "musicas/musica1.mpeg",
        capa: "capas/capa1.jpeg"
    },
    {
        nome: "Música 2",
        arquivo: "musicas/musica2.mpeg",
        capa: "capas/capa2.jpeg"
    },
    {
        nome: "Música 3",
        arquivo: "musicas/musica3.mpeg",
        capa: "capas/capa3.jpeg"
    },
    {
        nome: "Música 4",
        arquivo: "musicas/musica4.mpeg",
        capa: "capas/capa4.jpeg"
    },
    {
        nome: "Música 5",
        arquivo: "musicas/musica5.mpeg",
        capa: "capas/capa5.jpeg"
    },
    {
        nome: "Música 6",
        arquivo: "musicas/musica6.mpeg",
        capa: "capas/capa6.jpeg"
    }
];


// =====================================================
// 3. VARIÁVEIS DE CONTROLE
// =====================================================

let musicaAtual = 0;
let tocando = false;
let modoAleatorio = false;
let modoRepetir = false;


// =====================================================
// 4. FUNÇÃO PARA FORMATAR TEMPO
// Transforma segundos em formato de relógio.
// Exemplo: 90 segundos vira 1:30
// =====================================================

function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    if (segundosRestantes < 10) {
        return minutos + ":0" + segundosRestantes;
    } else {
        return minutos + ":" + segundosRestantes;
    }
}


// =====================================================
// 5. FUNÇÃO PARA CARREGAR MÚSICA
// Troca o arquivo de áudio e atualiza o nome na tela.
// =====================================================

function carregarMusica() {
    audio.src = musica[musicaAtual].arquivo;
    nomeMusica.textContent = musica[musicaAtual].nome;
    capa.src = musica[musicaAtual].capa;
}


// =====================================================
// 6. FUNÇÃO PLAY / PAUSE
// Se estiver parado, toca.
// Se estiver tocando, pausa.
// =====================================================

function tocarOuPausar() {
    if (tocando === false) {
        audio.play();
        botaoPlay.textContent = "⏸";
        tocando = true;
    } else {
        audio.pause();
        botaoPlay.textContent = "▶";
        tocando = false;
    }
}


// =====================================================
// 7. FUNÇÃO PRÓXIMA MÚSICA
// Avança para a próxima música.
// Se chegar no final da lista, volta para a primeira.
// =====================================================

function proximaMusica() {
    if (modoAleatorio === true) {

        musicaAtual = Math.floor(Math.random() * musica.length);

    } else {
        musicaAtual++;
    }


    if (musicaAtual >= musica.length) {
        musicaAtual = 0;
    }

    carregarMusica();
    mostrarPlaylist();

    audio.play();
    botaoPlay.textContent = "⏸";
    tocando = true;
}


// =====================================================
// 8. FUNÇÃO VOLTAR MÚSICA
// Volta para a música anterior.
// Se estiver na primeira, vai para a última.
// =====================================================

function voltarMusica() {
    musicaAtual--;

    if (musicaAtual < 0) {
        musicaAtual = musica.length - 1;
    }

    carregarMusica();
    mostrarPlaylist();

    audio.play();
    botaoPlay.textContent = "⏸";
    tocando = true;
}

function alternarRepetir() {

    modoRepetir = !modoRepetir;

    botaoRepetir.classList.toggle("botao-ativo");
}


// =====================================================
// 9. FUNÇÃO MOSTRAR PLAYLIST
// Cria visualmente a lista de músicas na tela.
// A música atual recebe a classe "musica-ativa".
// =====================================================

function mostrarPlaylist() {
    playlist.innerHTML = "";

    musica.forEach(function (item, index) {
        const div = document.createElement("div");

        div.classList.add("musica-item");

        if (index === musicaAtual) {
            div.classList.add("musica-ativa");
        }

        div.textContent = item.nome;

        div.addEventListener("click", function () {
            musicaAtual = index;

            carregarMusica();
            mostrarPlaylist();

            audio.play();

            botaoPlay.textContent = "⏸";
            tocando = true;

        })

        playlist.appendChild(div);
    });
}

function alternarAleatorio() {

    modoAleatorio = !modoAleatorio;

    botaoAleatorio.classList.toggle("botao-ativo");
}


// =====================================================
// 10. EVENTOS DOS BOTÕES
// Aqui conectamos os botões às funções.
// =====================================================

botaoPlay.addEventListener("click", tocarOuPausar);
botaoProxima.addEventListener("click", proximaMusica);
botaoVoltar.addEventListener("click", voltarMusica);
botaoAleatorio.addEventListener("click", alternarAleatorio);
botaoRepetir.addEventListener("click", alternarRepetir);

// =====================================================
// 11. EVENTO DO VOLUME
// Muda o volume do áudio conforme o usuário mexe no slider.
// =====================================================

volume.addEventListener("input", function () {
    audio.volume = volume.value;
});


// =====================================================
// 12. EVENTO QUANDO A MÚSICA ACABA
// Quando uma música termina, toca a próxima automaticamente.
// =====================================================

audio.addEventListener("ended", function () {

    if (modoRepetir === true) {

        audio.currentTime = 0;

        audio.play();

    } else {
    proximaMusica();
    }
});


// =====================================================
// 13. EVENTO DE ATUALIZAÇÃO DO TEMPO
// Atualiza barra de progresso e tempo da música.
// =====================================================

audio.addEventListener("timeupdate", function () {
    const duracao = audio.duration;
    const tempoAtual = audio.currentTime;

    if (isNaN(duracao)) {
        return;
    }

    const porcentagem = (tempoAtual / duracao) * 100;

    progresso.style.width = porcentagem + "%";

    tempoAtualTexto.textContent = formatarTempo(tempoAtual);
    duracaoTexto.textContent = formatarTempo(duracao);
});


// =====================================================
// 14. EVENTO DE CLIQUE NA BARRA
// Permite clicar na barra para avançar ou voltar a música.
// =====================================================

progressoContainer.addEventListener("click", function (evento) {
    const larguraBarra = progressoContainer.clientWidth;
    const posicaoClique = evento.offsetX;
    const porcentagemClique = posicaoClique / larguraBarra;

    audio.currentTime = porcentagemClique * audio.duration;
});


// =====================================================
// 15. INICIALIZAÇÃO DO PLAYER
// Carrega a primeira música e mostra a playlist.
// =====================================================

carregarMusica();
mostrarPlaylist();