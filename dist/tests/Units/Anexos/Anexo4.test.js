"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anexo4_1 = require("../../../src/Core/Entities/Anexos/Anexo4");
const AbstractAnexo_1 = require("../../../src/Core/Support/AbstractAnexo");
test('Instanciar Anexo 1', function () {
    const anexo4 = new Anexo4_1.Anexo4();
    expect(anexo4).toBeInstanceOf(Anexo4_1.Anexo4);
    expect(anexo4).toBeInstanceOf(AbstractAnexo_1.AbstractAnexo);
});
test('Calcular faixa de imposto Anexo 1', () => {
    const anexo4 = new Anexo4_1.Anexo4();
    anexo4.setReceitaBrutaTotal12(110000);
    anexo4.calcularFaixaAtual();
    expect(anexo4.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 4.50,
        valorDeduzir: 0
    });
});
test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo4 = new Anexo4_1.Anexo4();
    anexo4.setReceitaBrutaTotal12(110000);
    anexo4.calcularFaixaAtual();
    expect(anexo4.getAliquotaFaixaAtual()).toEqual(4.50);
    expect(anexo4.getValorDeducaoFaixaAtual()).toEqual(0);
});
test('Calcular Aliquota Efetiva', () => {
    const anexo4 = new Anexo4_1.Anexo4();
    anexo4.setReceitaBrutaTotal12(490000);
    anexo4.calcularFaixaAtual();
    console.log(anexo4.calcularAliquotaEfetivaFaixaAtual());
    expect(anexo4.calcularAliquotaEfetivaFaixaAtual()).toEqual(10.17);
});
test('Calcular imposto', () => {
    const anexo4 = new Anexo4_1.Anexo4();
    anexo4.setReceitaBrutaTotal12(110000);
    anexo4.calcularFaixaAtual();
    console.log(anexo4.calcularImpostoAPagar(12000));
    expect(anexo4.calcularImpostoAPagar(100)).toEqual(4.50);
});
