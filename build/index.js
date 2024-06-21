"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
const port = process.env.PORT;
dotenv_1.default.config();
const corsoptions = {
    origin: process.env.FRONT_LINK,
    optionsSuccessStatus: 200
};
// const options = {
//   uploadDir: path.join(__dirname, 'uploads'),
//   autoClean: true
// };
// Use express-form-data middleware with the provided options
// app.use(formData.parse(options));
// app.use(formData.format());
// app.use(formData.stream());
// app.use(formData.union());
app.use((0, cors_1.default)(corsoptions));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(routes_1.default);
app.listen(port, async () => {
    const url = `http://localhost:${port}`;
    console.log(`Open ${url} to review the project..`);
});
exports.default = app;
