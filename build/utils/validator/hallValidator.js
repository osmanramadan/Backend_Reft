"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addhallValidator = void 0;
const express_validator_1 = require("express-validator");
const validatormiddelware_1 = require("../../authorization/middelware/validatormiddelware");
exports.addhallValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name required field')
        .isLength({ min: 5 })
        .withMessage('username must be at least 5 chars')
        .custom((_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('capacity')
        .notEmpty()
        .withMessage('Capacity required field')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('city')
        .notEmpty()
        .withMessage('City required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('location')
        .notEmpty()
        .withMessage('Location required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('details')
        .notEmpty()
        .withMessage('Details required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('user_id')
        .notEmpty()
        .withMessage('User id required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    validatormiddelware_1.validatorMiddleware
];
