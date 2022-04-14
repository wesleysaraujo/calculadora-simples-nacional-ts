"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Anexos_1 = require("../../../src/Core/Entities/Anexos");
const AbstractAnexo_1 = require("../../../src/Core/Support/AbstractAnexo");
test('Instanciar Anexo 1', function () {
    const anexo5 = new Anexos_1.Anexo5();
    expect(anexo5).toBeInstanceOf(Anexos_1.Anexo5);
    expect(anexo5).toBeInstanceOf(AbstractAnexo_1.AbstractAnexo);
});
test('Calcular faixa de imposto Anexo 1', () => {
    const anexo5 = new Anexos_1.Anexo5();
    anexo5.setReceitaBrutaTotal12(110000);
    anexo5.calcularFaixaAtual();
    expect(anexo5.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 15.50,
        valorDeduzir: 0
    });
});
test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo5 = new Anexos_1.Anexo5();
    anexo5.setReceitaBrutaTotal12(110000);
    anexo5.calcularFaixaAtual();
    expect(anexo5.getAliquotaFaixaAtual()).toEqual(15.50);
    expect(anexo5.getValorDeducaoFaixaAtual()).toEqual(0);
});
test('Calcular Aliquota Efetiva', () => {
    const anexo5 = new Anexos_1.Anexo5();
    anexo5.setReceitaBrutaTotal12(490000);
    anexo5.calcularFaixaAtual();
    console.log(anexo5.calcularAliquotaEfetivaFaixaAtual());
    expect(anexo5.calcularAliquotaEfetivaFaixaAtual()).toEqual(19.48);
});
test('Calcular imposto', () => {
    const anexo5 = new Anexos_1.Anexo5();
    anexo5.setReceitaBrutaTotal12(110000);
    anexo5.calcularFaixaAtual();
    console.log(anexo5.calcularImpostoAPagar(12000));
    expect(anexo5.calcularImpostoAPagar(100)).toEqual(15.50);
});
