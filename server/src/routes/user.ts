import express, { Request, Response } from 'express';
import {
  deleteUserProfile,
  getUserProfile,
  inviteUser,
  listRelations,
  resendOTP,
  resetPassword,
  sendOTP,
  updateUserProfile,
  userLogin,
  userSignUp,
  verifyOTP,
} from '../controller/user';
import { body } from 'express-validator';
import {
  alphaCheck,
  authCheck,
  checkCountryCode,
  checkEitherEmailOrPhone,
  checkOTP,
  checkPassword,
  createQueryValidation,
  emptyAndRequiredCheckInBody,
  prisma,
  requiredCheck,
  routeMethodCheck,
  validateResult,
} from '../utils';
import { currencies } from '../utils/constants';
import multer from 'multer';
import path from 'path';
import { unlink } from 'fs/promises';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename(req, file, callback) {
    const ext = path.extname(file.originalname).toLowerCase();
    const fileName = file.originalname.split(ext)[0] + '-' + Date.now() + ext;
    callback(null, fileName);
  },
});

const uploadImageUrl = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb({
      message: 'Please upload a valid image file.',
      name: 'invalid file type',
    });
  },
}).single('imageUrl');

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
userRouter.get('/profile', getUserProfile);

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

/**
 * @openapi
 * '/api/user/invite':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Invite a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - emailOrPhoneArr
 *            properties:
 *              emailOrPhoneArr:
 *                type: array
 *                minItems: 1
 *                maxItems: 5
 *                items:
 *                 type: object
 *                 properties:
 *                  emailOrPhone:
 *                   type: string
 *                   default: prakashchoudhary0141@gmail.com
 *                  countryCode:
 *                   type: string
 *                   default: +91
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post(
  '/invite',
  [
    body('emailOrPhoneArr').isArray({ min: 1, max: 5 }),
    requiredCheck('emailOrPhoneArr.*.emailOrPhone', 'Email/Phone'),
    checkEitherEmailOrPhone('emailOrPhoneArr.*.emailOrPhone', 'Email/Phone'),
    checkCountryCode('emailOrPhoneArr.*.countryCode', 'Country code'),
  ],
  validateResult,
  inviteUser
);

/**
 * @openapi
 * '/api/user/related-users':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: Get logged in user's related users
 *     parameters:
 *      - name: pageNo
 *        in: query
 *        description: page number
 *        required: true
 *      - name: pageSize
 *        in: query
 *        description: page size
 *        required: true
 *      - name: sortBy
 *        in: query
 *        description: column name to sort by
 *      - name: sortOrder
 *        in: query
 *        schema:
 *          type: string
 *          enum: [asc, desc]
 *        description: >
 *          Sort order:
 *           * `asc` - Ascending, from A to Z
 *           * `desc` - Descending, from Z to A
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.get(
  '/related-users',
  authCheck(),
  createQueryValidation(['name']),
  validateResult,
  listRelations
);

/**
 * @openapi
 * '/api/user/update-profile':
 *  patch:
 *     tags:
 *     - User Controller
 *     summary: Update user's profile data
 *     consumes:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: The user's data to udpate.
 *        schema:
 *         type: object
 *         properties:
 *          firstName:
 *           type: string
 *          lastName:
 *           type: string
 *          password:
 *           type: string
 *          currency:
 *           type: string
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.patch(
  '/update-profile',
  [
    body('firstName').optional(),
    alphaCheck('firstName'),
    body('lastName').optional(),
    alphaCheck('lastName'),
    checkPassword('password', 'Password').optional(),
    body('currency')
      .optional()
      .isIn(currencies.map((el) => el.code)),
  ],
  validateResult,
  updateUserProfile
);

/**
 * @openapi
 * '/api/user/profile-image':
 *  post:
 *     tags:
 *     - User Controller
 *     summary: Update user's profile image
 *     requestBody:
 *      content:
 *       multipart/form-data:
 *        schema:
 *         type: object
 *         properties:
 *          imageUrl:
 *           type: string
 *           format: binary
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.post('/profile-image', async (req: Request, res: Response) => {
  uploadImageUrl(req, res, async function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err?.message,
      });
    } else {
      const file = req.file;
      const path = file?.path;

      const user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
      });

      if (user?.imageUrl) {
        await unlink(user.imageUrl);
      }

      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          imageUrl: path,
        },
      });

      res.status(200).json({
        success: true,
        message: 'Image uploaded successfully.',
      });
    }
  });
});

/**
 * @openapi
 * '/api/user/profile-image':
 *  delete:
 *     tags:
 *     - User Controller
 *     summary: Delete user's profile image
 *     responses:
 *      201:
 *        description: Created
 */
userRouter.delete('/profile-image', deleteUserProfile);

export default userRouter;
