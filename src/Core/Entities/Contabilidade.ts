import { AbstractAnexo, Faixa } from "../Support/AbstractAnexo";
import * as faixas from "../Support/ConstantsFaixas";

export class Contabilidade extends AbstractAnexo {
    constructor(anexo: number, rbt12: number, valorDaNota: number = 0) {
        super(rbt12, valorDaNota);

        if (anexo === 1)
            this.faixas = faixas.faixasAnexo1;
        else if (anexo === 2)
            this.faixas = faixas.faixasAnexo2;
        else if (anexo === 3)
            this.faixas = faixas.faixasAnexo3;
        else if (anexo === 4)
            this.faixas = faixas.faixasAnexo4;
        else
            this.faixas = faixas.faixasAnexo5;

        this.anexo = anexo;

        this.calcularFaixaAtual();
    }

    public getAliquota() {
        return this.calcularPorcentagemAliquotaEfetiva();
    }
}