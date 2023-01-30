import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]"); //seleciona data required dos elementos
const formulario = document.querySelector("[data-formulario]")

formulario.addEventListener("submit", (e) => {
    e.preventDefault()

    const listaRespostas = { //buscando informações encaminhadas pelo usuário
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas))//salvando no localStorage

    window.location.href = './abrir-conta-form-2.html'//redireciona pro segundo form

})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo)) //evento blur é quando tira o foco do input, disparando o evento

    campo.addEventListener("invalid", evento => evento.preventDefault()) //desativamos as mensagens padrões de erro do javascript, utilizando o método preventDefault()
})

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');

    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo)
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo)
    }

    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem)
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')//seleciona span com a classe erro dentro do campo input específico
    const validadorDeInput = campo.checkValidity()//método que valida se o campo está valido ou não

    if (!validadorDeInput) { //printa mensagem de erro
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}