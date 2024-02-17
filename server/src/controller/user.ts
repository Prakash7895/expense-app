import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  comparePassword,
  cryptPassword,
  novuInvite,
  novuSendOtp,
  prisma,
  sendOnboardMessage,
  subscribeToNovu,
} from '../utils';
import validator from 'validator';
import { generate as OtpGenerator } from 'otp-generator';

export const userSignUp = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, emailOrPhone, password, countryCode } =
      req.body;

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
        countryCode: countryCode ?? null,
      },
    });

    await subscribeToNovu({
      id: user.id,
      email,
      phone: phone ? `${countryCode}${phone}` : '',
      firstName,
      lastName,
    });

    sendOnboardMessage(user.id, !!email);

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
    } else if (!user.password) {
      return res.status(400).json({
        status: 'error',
        message: "User hasn't onboarded.",
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
          countryCode: user.countryCode,
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
      res.status(400).json({
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

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, countryCode } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    let whereQuery: any = { email: email };

    if (phone) {
      whereQuery = {
        phone: phone,
        countryCode: countryCode,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        ...whereQuery,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const otp = OtpGenerator(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    const otpSent = await novuSendOtp(user.id, otp, !!email);

    if (otpSent.success) {
      await prisma.otp.create({
        data: {
          otp: otp,
          userId: user.id,
        },
      });

      return res.status(200).json({
        status: 'success',
        message: 'OTP sent successfully.',
        data: user,
      });
    }

    res.status(400).json({
      status: 'error',
      message: 'Error sending OTP.',
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, otp, countryCode } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    let whereQuery: any = { email: email };

    if (phone) {
      whereQuery = {
        phone: phone,
        countryCode: countryCode,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        ...whereQuery,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const time = new Date(new Date().getTime() - 10 * 60 * 1000);

    const savedOTP = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gt: time,
        },
      },
    });

    if (savedOTP?.otp === otp) {
      return res.status(200).json({
        status: 'success',
        message: 'OTP verified successfully.',
        data: user,
      });
    }

    res.status(400).json({
      status: 'error',
      message: 'Invalid OTP.',
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const resendOTP = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, countryCode } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    let whereQuery: any = { email: email };

    if (phone) {
      whereQuery = {
        phone: phone,
        countryCode: countryCode,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        ...whereQuery,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const time = new Date(new Date().getTime() - 10 * 60 * 1000);

    const savedOTP = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gt: time,
        },
      },
    });

    let otp = savedOTP?.otp;

    if (!otp) {
      otp = OtpGenerator(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
    }

    const otpSent = await novuSendOtp(user.id, otp, !!email);

    if (otpSent.success) {
      if (!savedOTP?.otp) {
        await prisma.otp.create({
          data: {
            otp: otp,
            userId: user.id,
          },
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'OTP resent successfully.',
        data: user,
      });
    }

    res.status(400).json({
      status: 'error',
      message: 'Error sending OTP.',
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, otp, password, countryCode } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    let whereQuery: any = { email: email };

    if (phone) {
      whereQuery = {
        phone: phone,
        countryCode: countryCode,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        ...whereQuery,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'User not found',
      });
    }

    const time = new Date(new Date().getTime() - 10 * 60 * 1000);

    const savedOTP = await prisma.otp.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gt: time,
        },
      },
    });

    if (savedOTP?.otp === otp) {
      const hash = cryptPassword(password);

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hash,
        },
      });

      await prisma.otp.delete({
        where: {
          id: savedOTP?.id,
        },
      });

      return res.status(200).json({
        status: 'success',
        message: 'Password updated successfully.',
        data: user,
      });
    }

    res.status(400).json({
      status: 'error',
      message: 'OTP is not valid.',
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  try {
    const { emailOrPhone, countryCode } = req.body;

    const email = validator.isEmail(emailOrPhone) ? emailOrPhone : null;
    const phone = validator.isMobilePhone(emailOrPhone) ? emailOrPhone : null;

    let whereQuery: any = { email: email };

    if (phone) {
      whereQuery = {
        phone: phone,
        countryCode: countryCode,
      };
    }

    const user = await prisma.user.findFirst({
      where: {
        ...whereQuery,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          email,
          phone,
          countryCode: countryCode ?? null,
        },
      });

      const subs = await subscribeToNovu({
        id: newUser.id,
        email,
        phone: phone ? `${countryCode}${phone}` : '',
      });

      if (subs.success) {
        await novuInvite(
          newUser,
          `${req.user.firstName} ${req.user.lastName}`,
          !!email
        );
      }
    }

    return res.status(200).json({
      status: 'success',
      message: 'User invited successfully.',
      data: user,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};
