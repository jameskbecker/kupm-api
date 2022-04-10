import express from 'express';
import router from './routes';
import cors from 'cors';

const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});
