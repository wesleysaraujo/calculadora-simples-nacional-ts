"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anexo1_1 = require("../../../src/Core/Entities/Anexos/Anexo1");
const AbstractAnexo_1 = require("../../../src/Core/Support/AbstractAnexo");
test('Instanciar Anexo 1', function () {
    const anexo1 = new Anexo1_1.Anexo1();
    expect(anexo1).toBeInstanceOf(Anexo1_1.Anexo1);
    expect(anexo1).toBeInstanceOf(AbstractAnexo_1.AbstractAnexo);
});
test('Calcular faixa de imposto Anexo 1', () => {
    const anexo1 = new Anexo1_1.Anexo1();
    anexo1.setReceitaBrutaTotal12(110000);
    anexo1.calcularFaixaAtual();
    expect(anexo1.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 4,
        valorDeduzir: 0
    });
});
test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo1 = new Anexo1_1.Anexo1();
    anexo1.setReceitaBrutaTotal12(110000);
    anexo1.calcularFaixaAtual();
    expect(anexo1.getAliquotaFaixaAtual()).toEqual(4);
    expect(anexo1.getValorDeducaoFaixaAtual()).toEqual(0);
});
test('Calcular Aliquota Efetiva', () => {
    const anexo1 = new Anexo1_1.Anexo1();
    anexo1.setReceitaBrutaTotal12(390000);
    anexo1.calcularFaixaAtual();
    console.log(anexo1.calcularAliquotaEfetivaFaixaAtual());
    expect(anexo1.calcularAliquotaEfetivaFaixaAtual()).toEqual(9.46);
});
test('Calcular imposto', () => {
    const anexo1 = new Anexo1_1.Anexo1();
    anexo1.setReceitaBrutaTotal12(110000);
    anexo1.calcularFaixaAtual();
    console.log(anexo1.calcularImpostoAPagar(12000));
    expect(anexo1.calcularImpostoAPagar(100)).toEqual(4);
});
