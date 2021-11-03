import express from 'express';
import project from './mock-data/project';

const app = express();
const port = 8080;

app.get('/project', (req, res) => {
  res.json(project);
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});
