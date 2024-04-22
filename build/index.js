"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 3003;
const corsoptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
const options = {
    uploadDir: path_1.default.join(__dirname, 'uploads'),
    autoClean: true
};
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
    console.log(`Open ${url} to review the project...`);
});
exports.default = app;
