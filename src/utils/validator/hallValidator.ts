import { check } from 'express-validator';
import { validatorMiddleware } from '../../authorization/middelware/validatormiddelware';

export const addhallValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name required field')
    .isLength({ min: 5 })
    .withMessage('username must be at least 5 chars')
    .custom((_val, { req }) => {
      return true;
    }),

  check('capacity')
    .notEmpty()
    .withMessage('Capacity required field')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('city')
    .notEmpty()
    .withMessage('City required')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('location')
    .notEmpty()
    .withMessage('Location required')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('details')
    .notEmpty()
    .withMessage('Details required')
    .custom(async (_val, { req }) => {
      return true;
    }),

  check('user_id')
    .notEmpty()
    .withMessage('User id required')
    .custom(async (_val, { req }) => {
      return true;
    }),

  validatorMiddleware
];
