export default function ehUmCPF(campo) { //exportando essa função
    const cpf = campo.value.replace(/\.|-/g, ""); //método replace recebe dois parâmetros, o primeiro é o que desejamos substituir e o segundo é pelo o que desejamos substituir
    if(validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse cpf não é válido')
    } 
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf); //método includes vai percorrer toda essa lista com os números repetidos e se ele achar o cpf ele irá retorna verdadeiro (true), caso contrário falso (false)
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for(let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador; //cpf[tamanho] trará o valor do cpf conforme posição do indice (de 1 a 9), depois multiplica por 10
        multiplicador--; //diminui o multiplicador a cada volta no laço
    }

    soma = (soma * 10) % 11;// multiplica valor da soma por 10, calcula o resto dividindo por 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[9];//compara com a posição 9 (primeiro digito), dentro do array
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for(let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador; //cpf[tamanho] trará o valor do cpf conforme posição do indice (de 1 a 10), depois multiplica por 10
        multiplicador--; //diminui o multiplicador a cada volta no laço
    }

    soma = (soma * 10) % 11;// multiplica valor da soma por 10, calcula o resto dividindo por 11

    if (soma == 10 || soma == 11) {
        soma = 0
    }

    return soma != cpf[10];//compara com a posição de índice 10 (segundo digito), dentro do array
}