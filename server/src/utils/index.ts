import bcrypt from 'bcrypt';
import validator from 'validator';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const cryptPassword = (password: string) => {
  try {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  } catch (err) {
    throw new Error('Could not generate encrypted password');
  }
};

export const comparePassword = (
  plainPassword: string,
  hashPassword: string
) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

export const routeMethodCheck =
  (method: string) => (req: Request, res: Response, next: any) => {
    if (req.method !== method) {
      return res.status(404).json({
        status: 'error',
        message: 'Not Found',
      });
    }
    next();
  };

export const validateResult = (req: Request, res: Response, next: any) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).send({ errors: result.array() });
  }

  next();
};

export const requiredCheck = (field: string, label?: string) =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label ? label : field} is required.`);

export const emptyAndRequiredCheckInBody = (field: string, label?: string) =>
  body(field)
    .trim()
    .custom((val) => /^[a-zA-Z ]*$/.test(val))
    .withMessage(`${label ? label : field} must contain only alphabets.`)
    .notEmpty()
    .withMessage(`${label ? label : field} is required.`)
    .escape();

export const checkEitherEmailOrPhone = (field: string, label?: string) =>
  body(field).custom((val) => {
    if (!(validator.isEmail(val) || validator.isMobilePhone(val, 'en-IN'))) {
      throw new Error(
        `${label ? label : field} is not a valid email or phone number.`
      );
    }
    return true;
  });

export const checkPassword = (field: string, label?: string) =>
  body(field)
    .isStrongPassword({
      minLength: 8,
      minSymbols: 1,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      `${label} must be at least 8 characters including special character, lowercase, uppercase and numbers`
    );
