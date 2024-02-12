import 'dotenv/config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import swaggerDocs from './swagger';
import userRouter from './routes/user';
import transactionRouter from './routes/transaction';
import categoryRouter from './routes/category';
import accountRouter from './routes/account';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//WHY
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://192.168.29.176:5173'],
  })
);

app.use((req, _, next) => {
  const accessToken = req.cookies['access-token'];
  if (accessToken) {
    const verifiedUser = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY ?? ''
    ) as JwtPayload;
    req.user = {
      id: verifiedUser.id,
      email: verifiedUser.email,
      phone: verifiedUser.phone,
      firstName: verifiedUser.firstName,
      lastName: verifiedUser.lastName,
    };
  }
  next();
});

app.get('/healthz', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Success!!',
  });
});
app.use('/api/user', userRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/category', categoryRouter);
app.use('/api/account', accountRouter);

const server = http.createServer(app);

server.listen(+`${process.env.PORT}`, '0.0.0.0', 3000, async () => {
  console.log('listening on port:' + process.env.PORT);
  swaggerDocs(app);
});
