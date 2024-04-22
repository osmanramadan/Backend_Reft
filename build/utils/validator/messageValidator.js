"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageValidator = void 0;
const express_validator_1 = require("express-validator");
const validatormiddelware_1 = require("../../authorization/middelware/validatormiddelware");
exports.messageValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name required field')
        .isLength({ min: 5 })
        .withMessage('username must be at least 5 chars')
        .custom((_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('phone')
        .notEmpty()
        .withMessage('Phone required field')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email required field')
        .isEmail()
        .withMessage('Not Valid Email')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('message')
        .notEmpty()
        .withMessage('Message required field')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('user_id')
        .notEmpty()
        .withMessage('Userid required field')
        .custom(async (_val, { req }) => {
        return true;
    }),
    validatormiddelware_1.validatorMiddleware
];
