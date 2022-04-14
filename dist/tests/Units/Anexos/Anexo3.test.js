"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anexo3_1 = require("../../../src/Core/Entities/Anexos/Anexo3");
const AbstractAnexo_1 = require("../../../src/Core/Support/AbstractAnexo");
test('Instanciar Anexo 1', function () {
    const anexo3 = new Anexo3_1.Anexo3();
    expect(anexo3).toBeInstanceOf(Anexo3_1.Anexo3);
    expect(anexo3).toBeInstanceOf(AbstractAnexo_1.AbstractAnexo);
});
test('Calcular faixa de imposto Anexo 1', () => {
    const anexo3 = new Anexo3_1.Anexo3();
    anexo3.setReceitaBrutaTotal12(110000);
    anexo3.calcularFaixaAtual();
    expect(anexo3.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 6,
        valorDeduzir: 0
    });
});
test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo3 = new Anexo3_1.Anexo3();
    anexo3.setReceitaBrutaTotal12(110000);
    anexo3.calcularFaixaAtual();
    expect(anexo3.getAliquotaFaixaAtual()).toEqual(6);
    expect(anexo3.getValorDeducaoFaixaAtual()).toEqual(0);
});
test('Calcular Aliquota Efetiva', () => {
    const anexo3 = new Anexo3_1.Anexo3();
    anexo3.setReceitaBrutaTotal12(390000);
    anexo3.calcularFaixaAtual();
    console.log(anexo3.calcularAliquotaEfetivaFaixaAtual());
    expect(anexo3.calcularAliquotaEfetivaFaixaAtual()).toEqual(13.45);
});
test('Calcular imposto', () => {
    const anexo3 = new Anexo3_1.Anexo3();
    anexo3.setReceitaBrutaTotal12(110000);
    anexo3.calcularFaixaAtual();
    console.log(anexo3.calcularImpostoAPagar(12000));
    expect(anexo3.calcularImpostoAPagar(100)).toEqual(6);
});
