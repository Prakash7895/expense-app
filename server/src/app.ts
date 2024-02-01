import 'dotenv/config';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user';
import swaggerDocs from './swagger';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

//WHY
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use('/api/user', userRouter);

const server = http.createServer(app);

server.listen(process.env.PORT, async () => {
  console.log('listening on port:' + process.env.PORT);
  swaggerDocs(app);
});
