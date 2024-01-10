import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});
