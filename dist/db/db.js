"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const { connect } = require('mongoose');
const { join } = require('path');
const dotenv = require("dotenv");
const path = join(__dirname, '../env/config.env');
dotenv.config({ path });
// let connectionString : string = "mongodb://localhost:27017/exampleDb"
let connectionString = process.env.DB_CONNECTION;
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect(connectionString, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                // Note that mongoose will **not** pull `bufferCommands` from the query string
            });
        }
        catch (err) {
            // outputs green text
        }
    });
}
exports.connectDB = connectDB;
