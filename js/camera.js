const botaoIniciarCamera = document.querySelector("[data-video-botao]")
const campoCamera = document.querySelector("[data-camera]")
const video = document.querySelector("[data-video]")
const botaoTirarFoto = document.querySelector("[data-tirar-foto]")
const canvas = document.querySelector("[data-video-canvas]")
const mensagem = document.querySelector("[data-mensagem]")
const botaoEnviarFoto = document.querySelector("[data-enviar]")

let imagemURL = ""

botaoIniciarCamera.addEventListener("click", async function () { //precisamos esperar o usuário aceitar esse acesso à câmera, por isso é uma função assíncrona
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})  //solicitando somente o vídeo

    botaoIniciarCamera.style.display = "none"; //retira o botao de iniciar a câmera
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo; //tag de vídeo de html recebe o Iniciar Video como origem
    
})

botaoTirarFoto.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height) //desenha imagem 2d do vídeo na posição 0 do mesmo, utilizando a largura e altura definidas no elemento html do mesmo

    imagemURL = canvas.toDataURL("image/jpeg") //salva a imagem na variável

    campoCamera.style.display = "none"
    mensagem.style.display = "block"
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro") //pega o localStorage cadastro
    const converteRetorno = JSON.parse(receberDadosExistentes)//converte de string pra json de novo

    converteRetorno.imagem = imagemURL //add url da imagem no localstorage dentro de cadastro

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))//converte pra string de novo e manda pro localStorage

    window.location.href = "./abrir-conta-form-3.html"

})