export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value)
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade!')
    }
}

function validaIdade(data) {
    const dataAtual = new Date(); //data atual do projeto
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())
    //pega as informações inseridas no formulário (ano, mês e idade) e coloca 18 anos AMAIS, assim conseguimos ver quando (qual data) essa pessoa fez 18 anos

    return dataAtual >= dataMais18 //se a data atual for maior que a data que o usuário inseriu no input, ele é maior de idade
}