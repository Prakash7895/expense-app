import { Request, Response } from 'express';
import { prisma } from '../utils';

export const addAccount = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const created = await prisma.account.create({
      data: {
        name: name,
        userId: req.user.id,
        description: description,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Account added successfully.',
      data: created,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const accountId = req.params.accountId;

    const updated = await prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        name: name,
        description: description,
      },
    });

    return res.status(204).json({
      success: true,
      message: 'Account updated successfully.',
      data: updated,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const listAccount = async (req: Request, res: Response) => {
  try {
    const { pageNo, pageSize, sortBy, sortOrder } = req.query;

    const skip = (Number(pageNo) - 1) * Number(pageSize);

    const whereQuery = {
      userId: req.user.id,
    };

    const accounts = await prisma.account.findMany({
      where: {
        ...whereQuery,
      },
      take: Number(pageSize),
      skip,
      orderBy: {
        [sortBy as string]: sortOrder,
      },
    });

    const total = await prisma.account.count({
      where: {
        ...whereQuery,
      },
    });

    res.status(200).json({
      success: true,
      data: accounts,
      total: total,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const accountId = req.params.accountId;

    const updated = await prisma.account.delete({
      where: {
        id: accountId,
      },
    });

    return res.status(204).json({
      success: true,
      message: 'Account deleted successfully.',
      data: updated,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};
