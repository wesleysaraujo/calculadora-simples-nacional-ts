"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anexo2 = void 0;
const AbstractAnexo_1 = require("../../Support/AbstractAnexo");
const ConstantsFaixas_1 = require("../../Support/ConstantsFaixas");
class Anexo2 extends AbstractAnexo_1.AbstractAnexo {
    constructor() {
        super(...arguments);
        this.faixas = ConstantsFaixas_1.faixasAnexo2;
    }
}
exports.Anexo2 = Anexo2;
