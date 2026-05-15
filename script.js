const audio = document.getElementById("audio");
const nomeMusica = document.getElementById("nomeMusica");

const progresso = document.querySelector(".progresso");

const botaoPlay = document.getElementById("play");
const botaoProxima = document.getElementById("proxima");
const botaoVoltar = document.getElementById("voltar");
const volume = document.getElementById("volume");

const tempoAtualTexto = document.getElementById("tempoAtual");
const duracaoTexto = document.getElementById("duracao");

console.log(audio);
console.log(nomeMusica);
console.log(botaoPlay);

function formatarTempo(segundos) {

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    if (segundosRestantes < 10) {
        return minutos + ":0" + segundosRestantes;
    } else {
        return minutos + ":" + segundosRestantes;
    }

}

const musica = [
    {
        nome: "Música 1",
        arquivo: "musicas/musica1.mpeg"
    },

    {
        nome: "Música 2",
        arquivo: "musicas/musica2.mpeg"
    }
];
console.log(musica);

let musicaAtual = 0;

console.log(musica[musicaAtual]);

function carregarMusica() {

    audio.src = musica[musicaAtual].arquivo;

    nomeMusica.textContent = musica[musicaAtual].nome;
}

carregarMusica();

let tocando = false;

function tocarOuPauzar() {

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

botaoPlay.addEventListener("click", tocarOuPauzar);

function proximaMusica() {

    musicaAtual++;

    if (musicaAtual >= musica.length) {

        musicaAtual = 0;
    }

    carregarMusica();

    audio.play();
    
    botaoPlay.textContent = "⏸";

    tocando = true;
}

botaoProxima.addEventListener("click", proximaMusica);

function voltarMusica() {

    musicaAtual--;

    if (musicaAtual <0) {

        musicaAtual = musica.length - 1;
    }

    carregarMusica();

    audio.play();

    botaoPlay.textContent = "⏸";

    tocando = true;
}

botaoVoltar.addEventListener("click", voltarMusica);

volume.addEventListener("input", function() {

    audio.volume = volume.value;
});

audio.addEventListener("ended", function() {

    proximaMusica();
});

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

