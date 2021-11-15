import express from 'express';
import projectRouter from './routes/projectRouter';

const port = 8080;
const app = express();

app.use(express.json());
app.use('/projects', projectRouter);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
