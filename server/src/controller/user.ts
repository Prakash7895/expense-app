import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { comparePassword, cryptPassword } from '../utils';
import validator from 'validator';

const prisma = new PrismaClient();

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailOrPhone, password } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    const hash = cryptPassword(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hash,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User signed up',
      data: user,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, password } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email, phone: phone }],
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const hash = comparePassword(password, user?.password!);

    if (hash) {
      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully.',
      });
    } else {
      res.status(401).json({
        status: 'error',
        message: 'Wrong password',
      });
    }
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};
