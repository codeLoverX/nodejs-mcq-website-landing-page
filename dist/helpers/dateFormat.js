"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskDate = void 0;
function taskDate(dateMilli) {
    var d = (dateMilli + '').split(' ');
    d[2] = d[2] + ',';
    return [d[0], d[1], d[2], d[3]].join(' ');
}
exports.taskDate = taskDate;
