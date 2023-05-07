import { Anexo5 } from "../../../src/Core/Entities/Anexos"
import { AbstractAnexo } from "../../../src/Core/Support/AbstractAnexo"

test('Instanciar Anexo 1', function () {
    const anexo5 = new Anexo5(0)

    expect(anexo5).toBeInstanceOf(Anexo5)
    expect(anexo5).toBeInstanceOf(AbstractAnexo)
})

test('Calcular faixa de imposto Anexo 1', () => {
    const anexo5 = new Anexo5(110000)
    anexo5.calcularFaixaAtual()

    expect(anexo5.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 15.50,
        valorDeduzir: 0,
        aliquotaEfetiva: 14.00
    })
})

test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo5 = new Anexo5(110000)
    anexo5.calcularFaixaAtual()

    expect(anexo5.getAliquotaFaixaAtual()).toEqual(15.50)
    expect(anexo5.getValorDeducaoFaixaAtual()).toEqual(0)
})

test('Calcular Aliquota Efetiva', () => {
    const anexo5 = new Anexo5(490000)
    anexo5.calcularFaixaAtual()

    console.log(anexo5.calcularAliquotaEfetivaFaixaAtual(true))

    expect(anexo5.calcularAliquotaEfetivaFaixaAtual(true)).toEqual(17.48)
})

test('Calcular imposto', () => {
    const anexo5 = new Anexo5(110000, 100)
    anexo5.calcularFaixaAtual()

    console.log(anexo5.calcularImpostoAPagar())
    expect(anexo5.calcularImpostoAPagar()).toEqual(15.50)
})

test('Calcular valor ICMS', () => {
    const anexo1 = new Anexo5(110000, 100)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularValorAliquotaEfetiva(true))
    expect(anexo1.calcularValorAliquotaEfetiva(true)).toEqual(2.17)
})