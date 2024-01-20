import 'dotenv/config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user';
import swaggerDocs from './swagger';
import sequelize from './utils/sequelize';

const app = express();

app.use(express.json());
app.use(bodyParser.json());

//WHY
app.use(
  cors({
    credentials: true,
  })
);

app.use('/api/user', userRouter);

const server = http.createServer(app);

sequelize
  .authenticate()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log('listening on port ' + process.env.PORT);
      swaggerDocs(app);
    });
  })
  .catch((err: any) => {
    console.log('PPPERROR', err);
  });
