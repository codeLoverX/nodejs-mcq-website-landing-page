export function addPlusToHandleBars (lvalue: string, operator: string, rvalue: string) {
    let lvalue_ = parseFloat(lvalue);
    let rvalue_ = parseFloat(rvalue);
    return {
        "+": lvalue_ + rvalue_,
    }[operator];
}


