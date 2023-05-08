interface AnexoInterface {
    faixas: Array<Faixa> | undefined
}

export type Faixa = {
    numeroFaixa: number
    de: number
    ate: number
    aliquota: number
    valorDeduzir: number
    aliquotaEfetiva: number
}

export abstract class AbstractAnexo implements AnexoInterface {
    constructor(rbt12: number, valorDaNota: number = 0) {
        this.receitaBrutaTotal12 = rbt12;
        this.valorDaNota = valorDaNota;
    }

    public faixas: Faixa[] | undefined
    protected _faixaAtual: Faixa | undefined
    protected receitaBrutaTotal12: number
    protected valorDaNota: number
    protected anexo: number

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

    readonly calcularAliquotaEfetivaFaixaAtual = (toFixed: boolean = false): number => {
        const aliquotaEfetiva = (((this.receitaBrutaTotal12 / 100) * this.getAliquotaFaixaAtual()
            - this.getValorDeducaoFaixaAtual()) / this.receitaBrutaTotal12) * 100;

        return toFixed ? this.toFixed(aliquotaEfetiva) : aliquotaEfetiva;
    }

    readonly getAliquotaFaixaAtual = (): number => {
        return this._faixaAtual.aliquota
    }

    readonly getValorDeducaoFaixaAtual = (): number => {
        return this._faixaAtual.valorDeduzir
    }

    readonly getAliquotaEfetivaFaixaAtual = (): number => {
        return this._faixaAtual.aliquotaEfetiva;
    }

    readonly toFixed = (value: number, digits: number = 2): number => {
        return parseFloat(value.toFixed(digits));
    }

    public calcularImpostoAPagar(toFixed: boolean = false): number {
        const value = (this.valorDaNota * this.calcularAliquotaEfetivaFaixaAtual()) / 100;

        return toFixed ? this.toFixed(value) : value;
    }

    public calcularAliquotaEfetiva(toFixed: boolean = false): number {
        const valor_icms = (this.getAliquotaEfetivaFaixaAtual() * this.calcularImpostoAPagar()) / 100;
        const icms = (valor_icms * 100) / this.valorDaNota;
        const value = this.anexo > 2 && icms > 5 ? 5 : icms;

        return toFixed ? this.toFixed(value, 3) : value;
    }

    public calcularValorAliquotaEfetiva(toFixed: boolean = false): number {
        const value = (this.valorDaNota / 100) * this.calcularAliquotaEfetiva();

        return toFixed ? this.toFixed(value) : value;
    }

    public calcularPorcentagemAliquotaEfetiva(): number {
        if (this._faixaAtual.numeroFaixa > 2)
            return this.toFixed((this.calcularValorAliquotaEfetiva() * 100) / this.calcularImpostoAPagar());

        return this.getAliquotaEfetivaFaixaAtual();
    }

    public toJson(): any {
        const valor = this.calcularValorAliquotaEfetiva(true);
        const aliquota = this.calcularPorcentagemAliquotaEfetiva();
        const aliquotaEfetiva = this.calcularAliquotaEfetiva(true);

        let json = {
            numeroFaixa: this.getFaixaAtual().numeroFaixa,
            aliquotaNominal: this.getAliquotaFaixaAtual(),
            aliquotaEfetiva: this.calcularAliquotaEfetivaFaixaAtual(true),
            deducao: this.getValorDeducaoFaixaAtual(),
            valorDas: this.calcularImpostoAPagar(true),
        };

        if (this.anexo > 2) {
            Object.assign(json, {
                valorIss: valor,
                aliquotaIss: aliquota,
                aliquotaEfetivaIss: aliquotaEfetiva
            });
        } else {
            Object.assign(json, {
                valorIcms: valor,
                aliquotaIcms: aliquota,
                aliquotaEfetivaIcms: aliquotaEfetiva
            });
        }

        return json;
    }

    public toString(): string {
        const tipo = this.anexo > 2 ? "ISS" : "ICMS";
        const json = this.toJson();

        let str = "{\n";

        str += `  Alíquota Nominal = ${json.aliquotaNominal}\n`;
        str += `  Faixa = ${json.numeroFaixa}\n`;
        str += `  Alíquota Efetiva = ${json.aliquotaEfetiva}\n`;
        str += `  Dedução = ${json.deducao}\n`;
        str += `  Valor do DAS = ${json.valorDas}\n`;
        str += `  Alíquota ${tipo} = ${json.aliquotaIss || json.aliquotaIcms}\n`;
        str += `  Valor ${tipo} = ${json.valorIss || json.valorIcms}\n`;
        str += `  Alíq. Efet. ${tipo} = ${json.aliquotaEfetivaIss || json.aliquotaEfetivaIcms}\n`;
        str += "}";

        return str;
    }
}
