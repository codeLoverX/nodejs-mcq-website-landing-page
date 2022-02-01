"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPlusToHandleBars = void 0;
function addPlusToHandleBars(lvalue, operator, rvalue) {
    let lvalue_ = parseFloat(lvalue);
    let rvalue_ = parseFloat(rvalue);
    return {
        "+": lvalue_ + rvalue_,
    }[operator];
}
exports.addPlusToHandleBars = addPlusToHandleBars;
