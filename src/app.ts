import express from 'express';
import router from './routes';
import cors from 'cors';
import env from 'dotenv';
import defaultHeaders from './middleware/headers';

env.config();
const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
//app.use(cors());
app.use(defaultHeaders);
app.use('/api', router);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
