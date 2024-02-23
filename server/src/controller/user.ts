import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
  bulkSubscribeToNovu,
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
import { Prisma } from '@prisma/client';

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
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
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
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  try {
    const { emailOrPhoneArr } = req.body;

    const whereQuery: {
      email?: string;
      phone?: string;
      countryCode?: string;
    }[] = emailOrPhoneArr?.map((el: any) => {
      const email = validator.isEmail(el.emailOrPhone) ? el.emailOrPhone : null;
      const phone = validator.isMobilePhone(el.emailOrPhone)
        ? el.emailOrPhone
        : null;
      if (phone) {
        return {
          phone: phone,
          countryCode: el.countryCode,
        };
      }
      return { email: email };
    });

    const users = await prisma.user.findMany({
      where: {
        OR: whereQuery,
      },
    });

    const newUsers = whereQuery?.filter((el: any) => {
      const idx = users?.findIndex(
        (user: any) =>
          el.email === user.email ||
          (el.phone === user.phone && el.countryCode === user.countryCode)
      );

      return idx === -1;
    });

    const relationToAdd: any[] = [];

    if (users.length) {
      const existingRelations = await prisma.userRelations.findMany({
        where: {
          OR: [
            {
              userId: req.user.id,
              invitedUserId: { in: users?.map((user) => user.id) },
            },
            {
              invitedUserId: req.user.id,
              userId: { in: users?.map((user) => user.id) },
            },
          ],
        },
      });

      const newRelations = users.filter((user) => {
        const idx = existingRelations.findIndex(
          (relations) =>
            user.id === relations.userId || user.id === relations.invitedUserId
        );

        return idx === -1;
      });

      relationToAdd.push(
        ...newRelations.map((el) => ({
          userId: req.user.id,
          invitedUserId: el.id,
        }))
      );
    }

    if (newUsers.length) {
      await prisma.user.createMany({
        data: newUsers,
      });
      const usersAdded = await prisma.user.findMany({
        where: {
          OR: newUsers,
        },
      });

      await bulkSubscribeToNovu(
        usersAdded.map((user) => ({
          id: user.id,
          email: user.email as string,
          phone: user.phone ? `${user.countryCode}${user.phone}` : '',
          firstName: user.firstName as string,
          lastName: user.lastName as string,
        }))
      );

      relationToAdd.push(
        ...usersAdded.map((el) => ({
          userId: req.user.id,
          invitedUserId: el.id,
        }))
      );

      [...users, ...usersAdded].map(async (user) => {
        await novuInvite(
          user,
          `${req.user.firstName} ${req.user.lastName}`,
          !!user.email
        );
      });
    }

    if (relationToAdd.length) {
      await prisma.userRelations.createMany({
        data: relationToAdd,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User invited successfully.',
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const listRelations = async (req: Request, res: Response) => {
  try {
    const { pageNo, pageSize, sortBy, sortOrder, name = '' } = req.query;

    const skip = (Number(pageNo) - 1) * Number(pageSize);

    const loggedInUserId = req.user.id;

    const direction =
      sortOrder === 'asc' ? Prisma.sql(['ASC']) : Prisma.sql(['DESC']);

    const column =
      sortBy === 'createdAt'
        ? Prisma.sql(['"UserRelations"."createdAt"'])
        : Prisma.sql(['"relatedUserName"']);

    const toSearch = `'%${name ? (name as string)?.toLowerCase() : ''}%'`;

    const searchVal = Prisma.sql([`${toSearch}`]);

    const relations = await prisma.$queryRaw<any[]>`SELECT * FROM (
      SELECT
        "UserRelations"."userId",
        "UserRelations"."invitedUserId",
        "UserRelations"."createdAt",
        "currentUser"."id",
        "currentUser"."firstName",
        "currentUser"."lastName",
        "currentUser"."email",
        "currentUser"."phone",
        "currentUser"."countryCode",
        "relatedUser"."id",
        "relatedUser"."firstName",
        "relatedUser"."lastName",
        "relatedUser"."email",
        "relatedUser"."phone",
        "relatedUser"."countryCode",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN "currentUser"."id"
          ELSE "relatedUser"."id"
        END AS "id",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN "currentUser"."email"
          ELSE "relatedUser"."email"
        END AS "relatedUserEmail",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN "currentUser"."phone"
          ELSE "relatedUser"."phone"
        END AS "relatedUserPhone",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN "currentUser"."countryCode"
          ELSE "relatedUser"."countryCode"
        END AS "relatedUserCountryCode",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN CONCAT(
            "currentUser"."firstName",
            ' ',
            "currentUser"."lastName"
          )
          ELSE CONCAT(
            "relatedUser"."firstName",
            ' ',
            "relatedUser"."lastName"
          )
        END AS "relatedUserName"
      FROM
        "UserRelations"
        LEFT JOIN "User" AS "currentUser" ON "UserRelations"."userId" = "currentUser"."id"
        LEFT JOIN "User" AS "relatedUser" ON "UserRelations"."invitedUserId" = "relatedUser"."id"
      WHERE
        "UserRelations"."userId" = ${loggedInUserId}
        OR "UserRelations"."invitedUserId" = ${loggedInUserId}
      ORDER BY
        ${column} ${direction}
    ) AS "relatedUserTable" WHERE LOWER("relatedUserName") LIKE ${searchVal} 
      LIMIT ${pageSize} OFFSET ${skip};`;

    const total = await prisma.$queryRaw<any[]>`SELECT COUNT(*) FROM (
      SELECT
        "UserRelations"."userId",
        "UserRelations"."invitedUserId",
        "UserRelations"."createdAt",
        "currentUser"."id",
        "currentUser"."firstName",
        "currentUser"."lastName",
        "relatedUser"."id",
        "relatedUser"."firstName",
        "relatedUser"."lastName",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN "currentUser"."id"
          ELSE "relatedUser"."id"
        END AS "id",
        CASE
          WHEN "relatedUser"."id" = ${loggedInUserId} THEN CONCAT(
            "currentUser"."firstName",
            ' ',
            "currentUser"."lastName"
          )
          ELSE CONCAT(
            "relatedUser"."firstName",
            ' ',
            "relatedUser"."lastName"
          )
        END AS "relatedUserName"
      FROM
        "UserRelations"
        LEFT JOIN "User" AS "currentUser" ON "UserRelations"."userId" = "currentUser"."id"
        LEFT JOIN "User" AS "relatedUser" ON "UserRelations"."invitedUserId" = "relatedUser"."id"
      WHERE
        "UserRelations"."userId" = ${loggedInUserId}
        OR "UserRelations"."invitedUserId" = ${loggedInUserId}
      ORDER BY
        ${column} ${direction}
    ) AS "relatedUserTable" WHERE LOWER("relatedUserName") LIKE ${searchVal};`;

    res.status(200).json({
      success: true,
      data: relations.map((el) => ({
        id: el.id,
        name: el.relatedUserName,
        email: el.relatedUserEmail,
        phone: el.relatedUserPhone,
        countryCode: el.relatedUserCountryCode,
        createdAt: el.createdAt,
      })),
      total: Number(total?.[0].count ?? 0),
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};
