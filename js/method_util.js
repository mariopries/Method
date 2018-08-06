
// -- Função que torna possível a execução sequencial de funções JS sem correr o risco de haver falta de sincronia entre elas


// Passar por parâmetro uma função e uma array com os seus argumentos
export function makeAsync(inFunction, args) {
    return new Promise((resolve, reject) => inFunction.apply(inFunction, args));
}
