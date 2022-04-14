"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anexo3 = void 0;
const AbstractAnexo_1 = require("../../Support/AbstractAnexo");
const ConstantsFaixas_1 = require("../../Support/ConstantsFaixas");
class Anexo3 extends AbstractAnexo_1.AbstractAnexo {
    constructor() {
        super(...arguments);
        this.faixas = ConstantsFaixas_1.faixasAnexo3;
    }
}
exports.Anexo3 = Anexo3;
