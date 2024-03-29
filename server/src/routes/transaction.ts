import express from 'express';
import {
  authCheck,
  createQueryValidation,
  prisma,
  requiredCheck,
  validateResult,
} from '../utils';
import { body, param, query } from 'express-validator';
import {
  addTransaction,
  deleteTransaction,
  getBalanceInfo,
  getStats,
  listTransactions,
  updateTransaction,
} from '../controller/transaction';
import { DateTime } from 'luxon';

const transactionRouter = express.Router();

/**
 * @openapi
 * '/api/transaction':
 *  post:
 *     tags:
 *     - Transaction Controller
 *     summary: Add a transaction
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - amount
 *              - type
 *              - categoryId
 *              - description
 *              - relatedUserId
 *              - accountId
 *            properties:
 *              amount:
 *                type: number
 *                default: 20
 *              type:
 *                type: string
 *                default: credit
 *              categoryId:
 *                type: uuid
 *                default: d34e7fd7-dcfa-4925-ad47-e3f04b3d35c8
 *              date:
 *                type: Date
 *                default: 2024-02-06T07:09:03.000Z
 *              description:
 *                type: string
 *                default: This is description
 *              relatedUserId:
 *                type: uuid
 *                default: d34e7fd7-dcfa-4925-ad47-e3f04b3d35c8
 *              accountId:
 *                type: uuid
 *                default: d34e7fd7-dcfa-4925-ad47-e3f04b3d35c8
 *     responses:
 *      201:
 *        description: Created
 */
transactionRouter.post(
  '/',
  authCheck(),
  [
    requiredCheck('amount', 'Amount'),
    body('amount').isNumeric().withMessage('Amount must be a number.'),
    body('amount').customSanitizer((val) => Number(val)),
    requiredCheck('type', 'Type'),
    body('type')
      .isIn(['credit', 'debit'])
      .withMessage("Type must be either 'credit' or 'debit'"),
    body('description').trim().optional(),
    requiredCheck('categoryId', 'Category Id'),
    requiredCheck('date', 'Date'),
    body('date').isISO8601(),
    body('categoryId').custom(async (val, { req }) => {
      const categoryExists = await prisma.category.findFirst({
        where: {
          id: val,
        },
      });
      if (!categoryExists) {
        throw new Error('Not a valid category.');
      }
      if (
        categoryExists &&
        categoryExists.userId &&
        categoryExists.userId !== req.user.id
      ) {
        throw new Error('Category does not exist.');
      }

      return true;
    }),
    body('accountId').custom(async (val, { req }) => {
      const accountExists = await prisma.account.findFirst({
        where: {
          id: val,
        },
      });
      if (accountExists && accountExists.userId !== req.user.id) {
        throw new Error('Not a valid account id.');
      }
      return true;
    }),
    body('relatedUserId').trim().optional(),
    body('relatedUserId').custom(async (val) => {
      if (val) {
        const userExists = await prisma.user.findFirst({
          where: {
            id: val,
          },
        });
        if (!userExists) {
          throw new Error('Renter does not exist.');
        }
      }

      return true;
    }),
  ],
  validateResult,
  addTransaction
);

/**
 * @openapi
 * '/api/transaction/list':
 *  get:
 *     tags:
 *     - Transaction Controller
 *     summary: List transactions
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
transactionRouter.get(
  '/list',
  authCheck(),
  createQueryValidation(['date']),
  validateResult,
  listTransactions
);

/**
 * @openapi
 * '/api/transaction/{transactionId}':
 *  put:
 *     tags:
 *     - Transaction Controller
 *     summary: update user's transaction
 *     parameters:
 *      - name: transactionId
 *        in: path
 *        description: transactionId to update
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
 *              - amount
 *              - type
 *              - categoryId
 *              - description
 *              - relatedUserId
 *            properties:
 *              amount:
 *                type: number
 *                default: 20
 *              type:
 *                type: string
 *                default: credit
 *              categoryId:
 *                type: uuid
 *                default: d34e7fd7-dcfa-4925-ad47-e3f04b3d35c8
 *              date:
 *                type: Date
 *                default: 2024-02-06T07:09:03.000Z
 *              description:
 *                type: string
 *                default: This is description
 *              relatedUserId:
 *                type: uuid
 *                default: d34e7fd7-dcfa-4925-ad47-e3f04b3d35c8
 *     responses:
 *      201:
 *        description: Created
 */
transactionRouter.put(
  '/:transactionId',
  authCheck(),
  [
    param('transactionId')
      .trim()
      .notEmpty()
      .withMessage('transactionId is required.')
      .custom(async (val, { req }) => {
        const categoryExists = await prisma.transaction.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!categoryExists) {
          throw new Error('Not a valid Transaction Id.');
        }
        return true;
      }),
    requiredCheck('amount', 'Amount'),
    body('amount').isNumeric().withMessage('Amount must be a number.'),
    body('amount').customSanitizer((val) => Number(val)),
    requiredCheck('type', 'Type'),
    body('type')
      .isIn(['credit', 'debit'])
      .withMessage("Type must be either 'credit' or 'debit'"),
    body('description').trim().optional(),
    requiredCheck('date', 'Date'),
    body('date').isISO8601(),
    requiredCheck('categoryId', 'Category Id'),
    body('categoryId').custom(async (val, { req }) => {
      const categoryExists = await prisma.category.findFirst({
        where: {
          id: val,
        },
      });
      if (!categoryExists) {
        throw new Error('Not a valid category.');
      }
      if (
        categoryExists &&
        categoryExists.userId &&
        categoryExists.userId !== req.user.id
      ) {
        throw new Error('Category does not exist.');
      }

      return true;
    }),
    body('relatedUserId').trim().optional(),
    body('relatedUserId').custom(async (val) => {
      if (val) {
        const userExists = await prisma.user.findFirst({
          where: {
            id: val,
          },
        });
        if (!userExists) {
          throw new Error('Renter does not exist.');
        }
      }

      return true;
    }),
  ],
  validateResult,
  updateTransaction
);

/**
 * @openapi
 * '/api/transaction/{transactionId}':
 *  delete:
 *     tags:
 *     - Transaction Controller
 *     summary: delete user's transaction
 *     parameters:
 *      - name: transactionId
 *        in: path
 *        description: transactionId to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *      201:
 *        description: Created
 */
transactionRouter.delete(
  '/:transactionId',
  authCheck(),
  [
    param('transactionId')
      .trim()
      .notEmpty()
      .withMessage('transactionId is required.')
      .custom(async (val, { req }) => {
        const transactionExists = await prisma.transaction.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!transactionExists) {
          throw new Error('Not a valid Transaction Id.');
        }
        return true;
      }),
  ],
  validateResult,
  deleteTransaction
);

/**
 * @openapi
 * '/api/transaction/balance-info':
 *  get:
 *     tags:
 *     - Transaction Controller
 *     summary: Balance info for all transactions
 *     responses:
 *      201:
 *        description: Created
 */
transactionRouter.get('/balance-info', authCheck(), getBalanceInfo);

/**
 * @openapi
 * '/api/transaction/stats':
 *  get:
 *     tags:
 *     - Transaction Controller
 *     summary: Transaction Stats
 *     parameters:
 *      - name: startDate
 *        in: query
 *        required: true
 *        type: string
 *        format: date
 *      - name: endDate
 *        in: query
 *        required: true
 *        type: string
 *        format: date
 *      - name: accountId
 *        in: query
 *      - name: type
 *        in: query
 *        schema:
 *          type: string
 *          enum: [debit, credit]
 *        description: >
 *          Sort order:
 *           * `debit` - Get all debit transactions
 *           * `credit` - Get all credit transactions
 *     responses:
 *      201:
 *        description: Created
 */
transactionRouter.get(
  '/stats',
  authCheck(),
  [
    query('startDate')
      .trim()
      .notEmpty()
      .withMessage('Start date is required.')
      .isDate({ format: 'YYYY-MM-DD' })
      .customSanitizer((val) => {
        const start = DateTime.fromJSDate(new Date(val)).startOf('day').toISO();
        return start;
      }),
    query('endDate')
      .trim()
      .notEmpty()
      .withMessage('Start date is required.')
      .isDate({ format: 'YYYY-MM-DD' })
      .customSanitizer((val) => {
        const end = DateTime.fromJSDate(new Date(val)).endOf('day').toISO();
        return end;
      })
      .custom((val, { req }) => {
        const startDate = new Date(req.query?.startDate);
        const endDate = new Date(val);

        if (endDate < startDate) {
          throw new Error('End date should be greater than start date.');
        }
        return true;
      }),
    query('accountId')
      .custom(async (val, { req }) => {
        if (val) {
          const accountExists = await prisma.account.findFirst({
            where: {
              id: val,
              userId: req.user.id,
            },
          });
          if (!accountExists) {
            throw new Error('Not a valid Account Id.');
          }
        }
        return true;
      })
      .optional(),
    query('type')
      .optional()
      .trim()
      .isIn(['credit', 'debit'])
      .withMessage('Type can only be "credit" or "debit".'),
  ],
  validateResult,
  getStats
);

export default transactionRouter;
