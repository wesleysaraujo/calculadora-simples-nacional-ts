import { Anexo2 } from "../../../src/Core/Entities/Anexos/Anexo2"
import { AbstractAnexo } from "../../../src/Core/Support/AbstractAnexo"

test('Instanciar Anexo 1', function () {
    const anexo2 = new Anexo2(0)

    expect(anexo2).toBeInstanceOf(Anexo2)
    expect(anexo2).toBeInstanceOf(AbstractAnexo)
})

test('Calcular faixa de imposto Anexo 1', () => {
    const anexo2 = new Anexo2(110000)
    anexo2.calcularFaixaAtual()

    expect(anexo2.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 4.5,
        valorDeduzir: 0,
        aliquotaEfetiva: 32.00
    })
})

test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo2 = new Anexo2(110000)
    anexo2.calcularFaixaAtual()

    expect(anexo2.getAliquotaFaixaAtual()).toEqual(4.5)
    expect(anexo2.getValorDeducaoFaixaAtual()).toEqual(0)
})

test('Calcular Aliquota Efetiva', () => {
    const anexo2 = new Anexo2(390000)
    anexo2.calcularFaixaAtual()

    console.log(anexo2.calcularAliquotaEfetivaFaixaAtual(true))

    expect(anexo2.calcularAliquotaEfetivaFaixaAtual(true)).toEqual(6.45)
})

test('Calcular imposto', () => {
    const anexo2 = new Anexo2(110000, 100)
    anexo2.calcularFaixaAtual()

    console.log(anexo2.calcularImpostoAPagar())
    expect(anexo2.calcularImpostoAPagar()).toEqual(4.5)
})

test('Calcular valor ICMS', () => {
    const anexo1 = new Anexo2(110000, 100)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularValorAliquotaEfetiva(true))
    expect(anexo1.calcularValorAliquotaEfetiva(true)).toEqual(1.44)
})