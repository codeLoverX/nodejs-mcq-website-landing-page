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
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "\\env\\config.env" });
// let connectionString:string = "mongodb+srv://new-user-net-ninja-2016:new-user-net-ninja-2016@cluster0.9xruk.mongodb.net/green-leaf-system"
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
            console.log('Connected to Database'); // outputs green text
        }
        catch (err) {
            console.log(err);
            console.log(__dirname + "\\env\\config.env");
            console.log(connectionString);
            console.log('Failed to connect to Database'); // outputs green text
        }
    });
}
exports.connectDB = connectDB;
