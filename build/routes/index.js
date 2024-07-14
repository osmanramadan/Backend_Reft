"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./api/user"));
const hall_1 = __importDefault(require("./api/hall"));
const message_1 = __importDefault(require("./api/message"));
const checkout_1 = __importDefault(require("./api/checkout"));
const booking_1 = __importDefault(require("./api/booking"));
const routes = express_1.default.Router();
routes.use('/api/v1/users', user_1.default);
routes.use('/api/v1/halls', hall_1.default);
routes.use('/api/v1/messages', message_1.default);
routes.use('/api/v1/checkout', checkout_1.default);
routes.use('/api/v1/booking', booking_1.default);
routes.get('/', (_req, res) => {
    res.status(200);
    res.send('this main page of routes');
});
exports.default = routes;
