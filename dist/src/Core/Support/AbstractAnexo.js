"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractAnexo = void 0;
class AbstractAnexo {
    constructor() {
        this.setReceitaBrutaTotal12 = (receitaBrutaTotalUltimos12Meses) => {
            this.receitaBrutaTotal12 = receitaBrutaTotalUltimos12Meses;
        };
        this.calcularFaixaAtual = () => {
            if (typeof this.faixas !== undefined) {
                let faixaAtual = this.faixas.filter((faixa) => {
                    return this.receitaBrutaTotal12 >= faixa.de
                        && this.receitaBrutaTotal12 <= faixa.ate;
                }).reduce((faixa) => faixa);
                this.setFaixaAtual(faixaAtual);
                return;
            }
            throw new Error('Faixas não declaradas no anexo');
        };
        this.setFaixaAtual = (faixa) => {
            this._faixaAtual = faixa;
        };
        this.getFaixaAtual = () => {
            return this._faixaAtual;
        };
        this.calcularAliquotaEfetivaFaixaAtual = () => {
            const aliquotaEfetiva = (this.receitaBrutaTotal12 * this.getAliquotaFaixaAtual()
                - this.getValorDeducaoFaixaAtual()) / this.receitaBrutaTotal12;
            return parseFloat(aliquotaEfetiva.toFixed(2));
        };
        this.getAliquotaFaixaAtual = function () {
            return this._faixaAtual.aliquota;
        };
        this.getValorDeducaoFaixaAtual = function () {
            return this._faixaAtual.valorDeduzir;
        };
    }
    calcularImpostoAPagar(valorDaNota) {
        return valorDaNota * this.calcularAliquotaEfetivaFaixaAtual() / 100;
    }
}
exports.AbstractAnexo = AbstractAnexo;
