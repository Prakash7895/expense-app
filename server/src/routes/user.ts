import express from 'express';
import {
  resendOTP,
  resetPassword,
  sendOTP,
  userLogin,
  userSignUp,
  verifyOTP,
} from '../controller/user';
import { body } from 'express-validator';
import {
  checkCountryCode,
  checkEitherEmailOrPhone,
  checkOTP,
  checkPassword,
  emptyAndRequiredCheckInBody,
  prisma,
  requiredCheck,
  routeMethodCheck,
  validateResult,
} from '../utils';

const userRouter = express.Router();

/**
 * @openapi
 * '/api/user/register':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - emailOrPhone
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *                default: John
 *              lastName:
 *                type: string
 *                default: Doe
 *              emailOrPhone:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.use(
  '/register',
  routeMethodCheck('POST'),
  [
    emptyAndRequiredCheckInBody('firstName', 'First Name'),
    emptyAndRequiredCheckInBody('lastName', 'Last Name'),
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkCountryCode('countryCode', 'Country code'),
    checkPassword('password', 'Password'),
  ],
  body('emailOrPhone').custom(async (val) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: val }, { phone: val }],
      },
    });
    if (existingUser) {
      throw new Error('E-mail/Phone already in use');
    }
    return true;
  }),
  validateResult,
  userSignUp
);

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhone
 *              - password
 *            properties:
 *              emailOrPhone:
 *                type: string
 *                default: prakashchoudhary0141@gmail.com
 *              password:
 *                type: string
 *                default: Demo@123
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.use(
  '/login',
  routeMethodCheck('POST'),
  [
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkPassword('password', 'Password'),
  ],
  validateResult,
  userLogin
);

/**
 * @openapi
 * '/api/user/profile':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get logged in user profile
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.get('/profile', (req, res) => {
  res.json({ success: true, data: req.user });
});

/**
 * @openapi
 * '/api/user/get-otp':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Get OTP to reset user password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhone
 *              - countryCode
 *            properties:
 *              emailOrPhone:
 *                type: string
 *                default: prakashchoudhary0141@gmail.com
 *              countryCode:
 *                type: string
 *                default: +91
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post(
  '/get-otp',
  [
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkCountryCode('countryCode', 'Country code'),
  ],
  validateResult,
  sendOTP
);

/**
 * @openapi
 * '/api/user/resend-otp':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Resend OTP to reset user password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhone
 *              - countryCode
 *            properties:
 *              emailOrPhone:
 *                type: string
 *                default: prakashchoudhary0141@gmail.com
 *              countryCode:
 *                type: string
 *                default: +91
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post(
  '/resend-otp',
  [
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkCountryCode('countryCode', 'Country code'),
  ],
  validateResult,
  resendOTP
);

/**
 * @openapi
 * '/api/user/verify-otp':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Verify OTP for reset password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhone
 *              - countryCode
 *              - otp
 *            properties:
 *              emailOrPhone:
 *                type: string
 *                default: prakashchoudhary0141@gmail.com
 *              countryCode:
 *                type: string
 *                default: +91
 *              otp:
 *                type: number
 *                default: 768745
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post(
  '/verify-otp',
  [
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkCountryCode('countryCode', 'Country code'),
    checkOTP('otp', 'OTP'),
  ],
  validateResult,
  verifyOTP
);

/**
 * @openapi
 * '/api/user/reset-password':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Change password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhone
 *              - countryCode
 *              - otp
 *              - password
 *            properties:
 *              emailOrPhone:
 *                type: string
 *                default: prakashchoudhary0141@gmail.com
 *              countryCode:
 *                type: string
 *                default: +91
 *              otp:
 *                type: number
 *                default: 768745
 *              password:
 *                type: string
 *                default: Demo@123
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post(
  '/reset-password',
  [
    requiredCheck('emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhone', 'Email/Phone'),
    checkCountryCode('countryCode', 'Country code'),
    checkOTP('otp', 'OTP'),
    checkPassword('password', 'Password'),
  ],
  validateResult,
  resetPassword
);

export default userRouter;
