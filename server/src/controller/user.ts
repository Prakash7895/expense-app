import { PrismaClient } from '@prisma/client';
import express from 'express';
import { cryptPassword } from '../utils';

const prisma = new PrismaClient();

export const userSignUp = async (
  req: express.Request,
  res: express.Response
) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
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
  } catch (err) {
    res.status(300).json({
      status: 'error',
      message: err,
    });
  }
};
