import { check } from 'express-validator';
import { validatorMiddleware } from '../../authorization/middelware/validatormiddelware';

export const messageValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name required field')
    .isLength({ min: 5 })
    .withMessage('username must be at least 5 chars')
    .custom((_val, { req }) => {
      return true;
    }),

  check('phone')
    .notEmpty()
    .withMessage('Phone required field')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('email')
    .notEmpty()
    .withMessage('Email required field')
    .isEmail()
    .withMessage('Not Valid Email')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('message')
    .notEmpty()
    .withMessage('Message required field')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('user_id')
    .notEmpty()
    .withMessage('Userid required field')
    .custom(async (_val, { req }) => {
      return true;
    }),

  validatorMiddleware
];
