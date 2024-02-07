import { Request, Response } from 'express';
import { prisma } from '../utils';

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, type, categoryId, description, renterId, accountId } =
      req.body;

    const sumCredit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'credit',
        userId: req.user.id,
        accountId: accountId ?? null,
      },
    });

    const sumDebit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'debit',
        userId: req.user.id,
        accountId: accountId ?? null,
      },
    });

    const total = (sumCredit._sum.amount ?? 0) - (sumDebit._sum.amount ?? 0);
    const balance = total + (type === 'debit' ? -amount : +amount);

    const created = await prisma.transaction.create({
      data: {
        amount: amount,
        type: type,
        description: description ?? null,
        categoryId: categoryId,
        userId: req.user.id,
        balance: balance,
        renterId: renterId ?? null,
        accountId: accountId ?? null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Transaction added successfully.',
      data: created,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const listTransactions = async (req: Request, res: Response) => {
  try {
    const { pageNo, pageSize, sortBy, sortOrder } = req.query;

    const skip = (Number(pageNo) - 1) * Number(pageSize);

    const whereQuery = {
      userId: req.user.id,
    };

    const transactions = await prisma.transaction.findMany({
      where: {
        ...whereQuery,
      },
      include: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        renter: true,
      },
      take: Number(pageSize),
      skip,
      orderBy: {
        [sortBy as string]: sortOrder,
      },
    });

    const total = await prisma.transaction.count({
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
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { amount, type, categoryId, description, renterId, accountId } =
      req.body;

    const transactionId = req.params.transactionId;

    const sumCredit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'credit',
        userId: req.user.id,
        accountId: accountId ?? null,
      },
    });

    const sumDebit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'debit',
        userId: req.user.id,
        accountId: accountId ?? null,
      },
    });

    const total = (sumCredit._sum.amount ?? 0) - (sumDebit._sum.amount ?? 0);
    const balance = total + (type === 'debit' ? -amount : +amount);

    const created = await prisma.transaction.update({
      where: {
        id: transactionId,
      },
      data: {
        amount: amount,
        type: type,
        description: description ?? null,
        userId: req.user.id,
        categoryId: categoryId,
        balance: balance,
        renterId: renterId ?? null,
        accountId: accountId ?? null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Transaction updated successfully.',
      data: created,
    });
  } catch (err: any) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transactionId = req.params.transactionId;

    const updated = await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Transaction deleted successfully.',
      data: updated,
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};

export const getBalanceInfo = async (req: Request, res: Response) => {
  try {
    const sumCredit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'credit',
        userId: req.user.id,
      },
    });

    const sumDebit = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'debit',
        userId: req.user.id,
      },
    });

    const sumByCategoryCredit = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: {
        amount: true,
      },
      where: {
        type: 'credit',
        userId: req.user.id,
      },
    });

    const sumByCategoryDebit = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: {
        amount: true,
      },
      where: {
        type: 'debit',
        userId: req.user.id,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalCredit: sumCredit,
        totalDebit: sumDebit,
        sumByCategoryCredit,
        sumByCategoryDebit,
      },
    });
  } catch (err: any) {
    res.status(300).json({
      status: 'error',
      message: err.message,
    });
  }
};
