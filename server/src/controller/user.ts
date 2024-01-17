import express from 'express';

export const userSignUp = (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, phone, password } = req.body;

  res.status(200).json({
    status: 'success',
    message: 'User signed up',
    data: req.body,
  });
};
