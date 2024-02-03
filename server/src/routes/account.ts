import express from 'express';
import {
  authCheck,
  createQueryValidation,
  prisma,
  requiredCheck,
  validateResult,
} from '../utils';
import { body, param } from 'express-validator';
import {
  addAccount,
  deleteAccount,
  listAccount,
  updateAccount,
} from '../controller/account';

const accountRouter = express.Router();

/**
 * @openapi
 * '/api/account':
 *  post:
 *     tags:
 *     - Account Controller
 *     summary: Add new Account for current user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: Home
 *              description:
 *                type: string
 *                default: family expenses related to home
 *     responses:
 *      201:
 *        description: Created
 */
accountRouter.post(
  '/',
  authCheck(),
  [requiredCheck('name', 'Name'), body('description').trim().optional()],
  validateResult,
  addAccount
);

/**
 * @openapi
 * '/api/account/list':
 *  get:
 *     tags:
 *     - Account Controller
 *     summary: List Account
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
accountRouter.get(
  '/list',
  authCheck(),
  createQueryValidation(['name']),
  validateResult,
  listAccount
);

/**
 * @openapi
 * '/api/account/{accountId}':
 *  put:
 *     tags:
 *     - Account Controller
 *     summary: update user's account
 *     parameters:
 *      - name: accountId
 *        in: path
 *        description: accountId to update
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - description
 *            properties:
 *              name:
 *                type: string
 *                default: Home
 *              description:
 *                type: string
 *                default: family expenses related to home
 *     responses:
 *      201:
 *        description: Created
 */
accountRouter.put(
  '/:accountId',
  authCheck(),
  [
    param('accountId')
      .trim()
      .notEmpty()
      .withMessage('accountId is required.')
      .custom(async (val, { req }) => {
        const accountExists = await prisma.account.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!accountExists) {
          throw new Error('Not a valid Account Id.');
        }
        return true;
      }),
    requiredCheck('name', 'Name'),
    body('description').trim().optional(),
  ],
  validateResult,
  updateAccount
);

/**
 * @openapi
 * '/api/account/{accountId}':
 *  delete:
 *     tags:
 *     - Account Controller
 *     summary: delete user's account
 *     parameters:
 *      - name: accountId
 *        in: path
 *        description: accountId to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *      201:
 *        description: Created
 */
accountRouter.delete(
  '/:accountId',
  authCheck(),
  [
    param('accountId')
      .trim()
      .notEmpty()
      .withMessage('accountId is required.')
      .custom(async (val, { req }) => {
        const accountExists = await prisma.account.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!accountExists) {
          throw new Error('Not a valid Account Id.');
        }
        return true;
      }),
  ],
  validateResult,
  deleteAccount
);

export default accountRouter;
