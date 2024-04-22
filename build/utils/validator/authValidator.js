"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.verifyPasswordValidator = exports.forgetPasswordValidator = exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const validatormiddelware_1 = require("../../authorization/middelware/validatormiddelware");
const slugify_1 = __importDefault(require("slugify"));
const user_1 = require("../../model/user");
const userobject = new user_1.User();
exports.signupValidator = [
    (0, express_validator_1.check)('username')
        .notEmpty()
        .withMessage('username required field')
        .isLength({ min: 5 })
        .withMessage('username must be at least 5 chars')
        .custom((val, { req }) => {
        req.body.slug = (0, slugify_1.default)(val);
        return true;
    }),
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email required field')
        .isEmail()
        .withMessage('من فضلك ادخل ايميل صحيح')
        .custom(async (_val, { req }) => {
        const existemail = await userobject.emailExists(req.body.email);
        if (existemail) {
            throw new Error(`الايميل موجود بالفعل`);
        }
        return true;
    }),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 chars'),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty()
        .withMessage('passwordConfirm is required field')
        .custom((val, { req }) => {
        if (val !== req.body.password) {
            throw new Error(`فم بتاكيد كلمة السر`);
        }
        return true;
    }),
    (0, express_validator_1.check)('phone')
        .optional()
        .isMobilePhone('ar-EG')
        .withMessage('accept only Egypt phone numbers')
        .custom(async (_val, { req }) => {
        const existphone = await userobject.phoneExists(req.body.phone);
        if (existphone) {
            throw new Error('الرقم موجود بالفعل');
        }
        return true;
    }),
    (0, express_validator_1.check)('city')
        .notEmpty()
        .withMessage('city required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    (0, express_validator_1.check)('role')
        .notEmpty()
        .withMessage('role required')
        .custom(async (_val, { req }) => {
        return true;
    }),
    validatormiddelware_1.validatorMiddleware
];
exports.loginValidator = [
    (0, express_validator_1.check)('email').isEmpty().withMessage('Email required field'),
    // .isEmail()
    // .withMessage('Invalid email format'),
    (0, express_validator_1.check)('password').isEmpty().withMessage('Password required'),
    // .isLength({ min: 8 })
    // .withMessage('password must be at least 8 chars'),
    validatormiddelware_1.validatorMiddleware
];
exports.forgetPasswordValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email required field')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async (_val, { req }) => {
        const existemail = await userobject.emailExists(req.body.email);
        if (!existemail) {
            throw new Error('Email doesnt exist');
        }
        return true;
    }),
    validatormiddelware_1.validatorMiddleware
];
exports.verifyPasswordValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('الايميل حقل ضروري')
        .isEmail()
        .withMessage('من فضلك ادخل ايميل صحيح')
        .custom(async (_val, { req }) => {
        const existemail = await userobject.emailExists(req.body.email);
        if (!existemail) {
            throw new Error(`الايميل غير موجود لدينا`);
        }
        return true;
    }),
    (0, express_validator_1.check)('resetCode')
        .notEmpty()
        .withMessage('من فضلك ادخل الكود')
        .isInt()
        .withMessage('الكود يجب أن يحتوي على أرقام فقط')
        .isLength({ min: 6 })
        .withMessage('الكود لا يقل عن سته ارقام'),
    validatormiddelware_1.validatorMiddleware
];
exports.resetPasswordValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email required field')
        .isEmail()
        .withMessage('من فضلك ادخل ايميل صحيح')
        .custom(async (_val, { req }) => {
        const existemail = await userobject.emailExists(req.body.email);
        if (!existemail) {
            throw new Error(`الايميل غير موجود لدينا`);
        }
        return true;
    }),
    (0, express_validator_1.check)('newpassword')
        .notEmpty()
        .withMessage('password required')
        .isLength({ min: 8 })
        .withMessage('يجب الا تقل كلمه عن تماني احرف'),
    (0, express_validator_1.check)('confirmPassword')
        .notEmpty()
        .withMessage('من فضلك تاكد من كلمه السر')
        .custom((val, { req }) => {
        if (val !== req.body.newpassword) {
            throw new Error(`قم بتاكيد كلمة السر`);
        }
        return true;
    }),
    validatormiddelware_1.validatorMiddleware
];
