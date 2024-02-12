import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePassword, cryptPassword, prisma } from '../utils';
import validator from 'validator';

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
      const expiresIn = 60 * 60;
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        process.env.JWT_SECRET_KEY ?? '',
        { expiresIn: expiresIn }
      );

      res.cookie('access-token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: false,
        sameSite: 'none',
        secure: true,
        path: '/',
        domain: 'localhost',
      });

      res.status(200).json({
        status: 'success',
        message: 'User logged in successfully.',
        token,
        user: {
          email: user.email,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
        },
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
