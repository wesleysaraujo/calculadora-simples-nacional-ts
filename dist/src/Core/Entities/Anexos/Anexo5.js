"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anexo5 = void 0;
const AbstractAnexo_1 = require("../../Support/AbstractAnexo");
const ConstantsFaixas_1 = require("../../Support/ConstantsFaixas");
class Anexo5 extends AbstractAnexo_1.AbstractAnexo {
    constructor() {
        super(...arguments);
        this.faixas = ConstantsFaixas_1.faixasAnexo5;
    }
}
exports.Anexo5 = Anexo5;
