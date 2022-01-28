import express from 'express';
import taskRouter from './routes/taskRouter';
import projectRouter from './routes/projectRouter';

const port = process.env.PORT || 8081;
const app = express();

app.use(express.json());
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
  console.log('Listening on port:', port);
});
