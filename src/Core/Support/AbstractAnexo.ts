interface AnexoInterface {
    faixas: Array<Faixa> | undefined
}

export type Faixa = {
    numeroFaixa: number
    de: number
    ate: number
    aliquota: number
    valorDeduzir: number
}

export abstract class AbstractAnexo implements AnexoInterface {
    public faixas: Faixa[] | undefined
    protected _faixaAtual: Faixa | undefined
    protected receitaBrutaTotal12: number
    
    readonly setReceitaBrutaTotal12 = (receitaBrutaTotalUltimos12Meses: number): void => {
        this.receitaBrutaTotal12 = receitaBrutaTotalUltimos12Meses
    }

    readonly calcularFaixaAtual  = (): void => {
        if (typeof this.faixas !== undefined) {
            let faixaAtual = this.faixas.filter((faixa: Faixa) => {
                return this.receitaBrutaTotal12 >= faixa.de 
                && this.receitaBrutaTotal12 <= faixa.ate
            }).reduce((faixa: Faixa) => faixa)

            this.setFaixaAtual(faixaAtual)

            return
        }

        throw new Error('Faixas não declaradas no anexo')
    }

    readonly setFaixaAtual = (faixa: Faixa) => {
        this._faixaAtual = faixa
    }

    readonly getFaixaAtual = (): Faixa  => {
        return this._faixaAtual
    }

    readonly calcularAliquotaEfetivaFaixaAtual = (): number => {
        const aliquotaEfetiva: number = (this.receitaBrutaTotal12 * this.getAliquotaFaixaAtual() 
            - this.getValorDeducaoFaixaAtual())/this.receitaBrutaTotal12
        
        return parseFloat(aliquotaEfetiva.toFixed(2))
    }

    readonly getAliquotaFaixaAtual = function (): number {
        return this._faixaAtual.aliquota
    }

    readonly getValorDeducaoFaixaAtual = function (): number {
        return this._faixaAtual.valorDeduzir
    }

    public calcularImpostoAPagar(valorDaNota: number): number {
        return valorDaNota * this.calcularAliquotaEfetivaFaixaAtual() / 100
    }
}
