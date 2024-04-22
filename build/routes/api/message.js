"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_1 = __importDefault(require("../../controller/message"));
// import { messageValidator } from '../../utils/validator/messageValidator';
const messagecontroller = new message_1.default();
const message = express_1.default.Router();
message.get('/', messagecontroller.index);
message.post('/', messagecontroller.create);
message.post('/delete/:id', messagecontroller.delete);
exports.default = message;
