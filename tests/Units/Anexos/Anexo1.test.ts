import { Anexo1 } from "../../../src/Core/Entities/Anexos/Anexo1"
import { AbstractAnexo } from "../../../src/Core/Support/AbstractAnexo"

test('Instanciar Anexo 1', function () {
    const anexo1 = new Anexo1(0)

    expect(anexo1).toBeInstanceOf(Anexo1)
    expect(anexo1).toBeInstanceOf(AbstractAnexo)
})

test('Calcular faixa de imposto Anexo 1', () => {
    const anexo1 = new Anexo1(110000)
    anexo1.calcularFaixaAtual()

    expect(anexo1.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 4,
        valorDeduzir: 0,
        aliquotaEfetiva: 34.00
    })
})

test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo1 = new Anexo1(110000)
    anexo1.calcularFaixaAtual()

    expect(anexo1.getAliquotaFaixaAtual()).toEqual(4)
    expect(anexo1.getValorDeducaoFaixaAtual()).toEqual(0)
})

test('Calcular Aliquota Efetiva', () => {
    const anexo1 = new Anexo1(390000)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularAliquotaEfetivaFaixaAtual(true))

    expect(anexo1.calcularAliquotaEfetivaFaixaAtual(true)).toEqual(5.95)
})

test('Calcular imposto', () => {
    const anexo1 = new Anexo1(110000, 100)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularImpostoAPagar())
    expect(anexo1.calcularImpostoAPagar()).toEqual(4)
})

test('Calcular valor ICMS', () => {
    const anexo1 = new Anexo1(110000, 100)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularValorAliquotaEfetiva(true))
    expect(anexo1.calcularValorAliquotaEfetiva(true)).toEqual(1.36)
})