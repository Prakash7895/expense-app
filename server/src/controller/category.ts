import { Request, Response } from 'express';
import { prisma } from '../utils';

export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    const created = await prisma.category.create({
      data: {
        name: name,
        type: type,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Category added successfully.',
      data: created,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    const categoryId = req.params.categoryId;

    const updated = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name,
        type: type,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Category updated successfully.',
      data: updated,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const listCategory = async (req: Request, res: Response) => {
  try {
    const { pageNo, pageSize, sortBy, sortOrder, getAll } = req.query;

    const skip = (Number(pageNo) - 1) * Number(pageSize);

    const whereQuery = {
      OR: [{ userId: null }, { userId: req.user.id }],
    };

    const transactions = await prisma.category.findMany({
      where: {
        ...whereQuery,
      },
      ...(getAll ? {} : { take: Number(pageSize), skip }),
      orderBy: {
        [sortBy as string]: sortOrder,
      },
    });

    const total = await prisma.category.count({
      where: {
        ...whereQuery,
      },
    });

    res.status(200).json({
      success: true,
      data: transactions,
      total: total,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    const updated = await prisma.category
      .delete({
        where: {
          id: categoryId,
        },
      })
      .catch((err) => {
        if (err?.code === 'P2003') {
          throw new Error(
            'Category cannot be deleted as it has some related transaction(s).'
          );
        }
        throw new Error(err?.message);
      });

    return res.status(201).json({
      success: true,
      message: 'Category deleted successfully.',
      data: updated,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};
