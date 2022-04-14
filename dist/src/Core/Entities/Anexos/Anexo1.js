"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anexo1 = void 0;
const AbstractAnexo_1 = require("../../Support/AbstractAnexo");
const ConstantsFaixas_1 = require("../../Support/ConstantsFaixas");
class Anexo1 extends AbstractAnexo_1.AbstractAnexo {
    constructor() {
        super(...arguments);
        this.faixas = ConstantsFaixas_1.faixasAnexo1;
    }
}
exports.Anexo1 = Anexo1;
