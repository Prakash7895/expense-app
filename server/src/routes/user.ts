import express from 'express';
import { userLogin, userSignUp } from '../controller/user';
import { body } from 'express-validator';
import {
  checkCountryCode,
  checkEitherEmailOrPhone,
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

userRouter.use('/profile', routeMethodCheck('GET'), (req, res) => {
  res.json({ success: true, data: req.user });
});

export default userRouter;
