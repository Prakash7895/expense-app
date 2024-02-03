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
  addCategory,
  deleteCategory,
  listCategory,
  updateCategory,
} from '../controller/category';

const categoryRouter = express.Router();

/**
 * @openapi
 * '/api/category':
 *  post:
 *     tags:
 *     - Category Controller
 *     summary: Add new Category for current user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - type
 *            properties:
 *              name:
 *                type: string
 *                default: "Netflix Subscription"
 *              type:
 *                type: string
 *                default: credit
 *     responses:
 *      201:
 *        description: Created
 */
categoryRouter.post(
  '/',
  authCheck(),
  [
    requiredCheck('type', 'Type'),
    body('type')
      .isIn(['credit', 'debit'])
      .withMessage("Type must be either 'credit' or 'debit'"),
    body('name').trim().optional(),
    requiredCheck('name', 'Name'),
  ],
  validateResult,
  addCategory
);

/**
 * @openapi
 * '/api/category/list':
 *  get:
 *     tags:
 *     - Category Controller
 *     summary: List Category
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
categoryRouter.get(
  '/list',
  authCheck(),
  createQueryValidation(['name']),
  validateResult,
  listCategory
);

/**
 * @openapi
 * '/api/category/{categoryId}':
 *  put:
 *     tags:
 *     - Category Controller
 *     summary: update user's category
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: categoryId to update
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
 *              - type
 *            properties:
 *              name:
 *                type: string
 *                default: "Netflix Subscription"
 *              type:
 *                type: string
 *                default: credit
 *     responses:
 *      201:
 *        description: Created
 */
categoryRouter.put(
  '/:categoryId',
  authCheck(),
  [
    param('categoryId')
      .trim()
      .notEmpty()
      .withMessage('categoryId is required.')
      .custom(async (val, { req }) => {
        const categoryExists = await prisma.category.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!categoryExists) {
          throw new Error('Not a valid Category Id.');
        }
        return true;
      }),
    requiredCheck('type', 'Type'),
    body('type')
      .isIn(['credit', 'debit'])
      .withMessage("Type must be either 'credit' or 'debit'"),
    body('name').trim().optional(),
    requiredCheck('name', 'Name'),
  ],
  validateResult,
  updateCategory
);

/**
 * @openapi
 * '/api/category/{categoryId}':
 *  delete:
 *     tags:
 *     - Category Controller
 *     summary: delete user's category
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: categoryId to delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *     responses:
 *      201:
 *        description: Created
 */
categoryRouter.delete(
  '/:categoryId',
  authCheck(),
  [
    param('categoryId')
      .trim()
      .notEmpty()
      .withMessage('categoryId is required.')
      .custom(async (val, { req }) => {
        const categoryExists = await prisma.category.findFirst({
          where: {
            id: val,
            userId: req.user.id,
          },
        });
        if (!categoryExists) {
          throw new Error('Not a valid Category Id.');
        }
        return true;
      }),
  ],
  validateResult,
  deleteCategory
);

export default categoryRouter;
