import bcrypt from 'bcrypt';
import validator from 'validator';
import { Request, Response } from 'express';
import { body, query, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';
import { Novu } from '@novu/node';
import { countries } from './constants';

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
        message: 'Not Found.',
      });
    }
    next();
  };

export const authCheck = () => (req: Request, res: Response, next: any) => {
  if (!req.user) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
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

export const checkCountryCode = (field: string, label?: string) =>
  body(field).custom((val, { req }) => {
    if (
      validator.isMobilePhone(req.body?.emailOrPhone, 'en-IN') &&
      !countries.find((c) => c.countryCode === val?.trim())
    ) {
      throw new Error(`${label ? label : field} is not a valid country code.`);
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

export const checkOTP = (field: string, label?: string) =>
  requiredCheck(field, label)
    .isLength({ min: 6, max: 6 })
    .withMessage(`${label} must be of 6 numbers.`)
    .isNumeric({ no_symbols: true })
    .withMessage(`${label} must only be numbers.`);

export const createQueryValidation = (sortByColumnArr?: string[]) => [
  (req: Request, res: Response, next: any) => {
    req.query.sortOrder = req.query.sortOrder ?? '';
    req.query.sortBy = req.query.sortBy ?? '';
    next();
  },
  query('pageNo')
    .trim()
    .notEmpty()
    .withMessage('Page no is required.')
    .customSanitizer((val) => Number(val))
    .isInt({ min: 1 })
    .withMessage('Page number must be integer and greater than 1.'),
  query('pageSize')
    .custom((val, { req }) => {
      val;
      return true;
    })
    .trim()
    .notEmpty()
    .withMessage('Page size is required.')
    .customSanitizer((val) => Number(val))
    .isInt({ min: 1, max: 100 })
    .withMessage('Page size must be integer and greater than 1.'),

  query('sortOrder')
    .default('desc')
    .optional()
    .trim()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order can only be "asc" or "desc".'),

  query('sortBy')
    .default('createdAt')
    .optional()
    .trim()
    .isIn(['createdAt', ...(sortByColumnArr ?? [])])
    .withMessage(
      `Sort order can be one of the following: "createdAt"${
        sortByColumnArr?.length ? ', "' : ''
      }${sortByColumnArr?.length ? sortByColumnArr.join('", "') : ''}${
        sortByColumnArr?.length ? '"' : ''
      }.`
    ),
];

export const novu = new Novu(process.env.NOVU_API_KEY!);

export const subscribeToNovu = async (user: {
  id: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}) => {
  try {
    const response = await novu.subscribers.identify(user.id, {
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};

export const sendOnboardMessage = async (
  subscriberId: string,
  toMail: boolean = true
) => {
  try {
    const response = await novu.trigger(
      (toMail ? process.env.NOVU_ONBOARD_EMAIL : process.env.NOVU_ONBOARD_SMS)!,
      {
        to: {
          subscriberId: subscriberId,
        },
        payload: {},
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};

export const novuSendOtp = async (
  subscriberId: string,
  otp: string,
  toMail: boolean = true
) => {
  try {
    const response = await novu.trigger(
      (toMail
        ? process.env.NOVU_PASSWORD_RESET_EMAIL
        : process.env.NOVU_PASSWORD_RESET_SMS)!,
      {
        to: {
          subscriberId,
        },
        payload: {
          otp: otp,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
    };
  }
};
