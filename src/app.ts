import express from 'express';
import router from './routes';

const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
