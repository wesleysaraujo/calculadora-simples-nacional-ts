const { Contabilidade } = require('./Core/Entities/Contabilidade');

const anexo1 = new Contabilidade(1, 3500000, 300000);
const anexo2 = new Contabilidade(2, 3500000, 300000);
const anexo3 = new Contabilidade(3, 3500000, 300000);
const anexo4 = new Contabilidade(4, 3500000, 300000);
const anexo5 = new Contabilidade(5, 3500000, 300000);

console.log("Anexo 1:", anexo1.toString());
console.log("Anexo 2:", anexo2.toString());
console.log("Anexo 3:", anexo3.toString());
console.log("Anexo 4:", anexo4.toString());
console.log("Anexo 5:", anexo5.toString());
