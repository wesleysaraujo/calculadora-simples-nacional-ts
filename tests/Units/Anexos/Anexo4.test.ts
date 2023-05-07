import { Anexo4 } from "../../../src/Core/Entities/Anexos/Anexo4"
import { AbstractAnexo } from "../../../src/Core/Support/AbstractAnexo"

test('Instanciar Anexo 1', function () {
    const anexo4 = new Anexo4(0)

    expect(anexo4).toBeInstanceOf(Anexo4)
    expect(anexo4).toBeInstanceOf(AbstractAnexo)
})

test('Calcular faixa de imposto Anexo 1', () => {
    const anexo4 = new Anexo4(110000)
    anexo4.calcularFaixaAtual()

    expect(anexo4.getFaixaAtual()).toMatchObject({
        numeroFaixa: 1,
        de: 0,
        ate: 180000,
        aliquota: 4.50,
        valorDeduzir: 0,
        aliquotaEfetiva: 44.50
    })
})

test('Resgatar aliquota e valor dedução da faixa atual', () => {
    const anexo4 = new Anexo4(110000)
    anexo4.calcularFaixaAtual()

    expect(anexo4.getAliquotaFaixaAtual()).toEqual(4.50)
    expect(anexo4.getValorDeducaoFaixaAtual()).toEqual(0)
})

test('Calcular Aliquota Efetiva', () => {
    const anexo4 = new Anexo4(490000)
    anexo4.calcularFaixaAtual()

    console.log(anexo4.calcularAliquotaEfetivaFaixaAtual(true))

    expect(anexo4.calcularAliquotaEfetivaFaixaAtual(true)).toEqual(7.67)
})

test('Calcular imposto', () => {
    const anexo4 = new Anexo4(110000, 100)
    anexo4.calcularFaixaAtual()

    console.log(anexo4.calcularImpostoAPagar())
    expect(anexo4.calcularImpostoAPagar()).toEqual(4.50)
})

test('Calcular valor ICMS', () => {
    const anexo1 = new Anexo4(110000, 100)
    anexo1.calcularFaixaAtual()

    console.log(anexo1.calcularValorAliquotaEfetiva(true))
    expect(anexo1.calcularValorAliquotaEfetiva(true)).toEqual(2)
})