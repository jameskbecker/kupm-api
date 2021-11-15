import express from 'express';
import projectData from './mock-data/project';

const app = express();
const port = 8080;

app.get('/projects', (req, res) => {
  res.json(projectData);
});

app.get('/projects/:id', (req, res) => {
  const id = req.params.id;
  const project = projectData.find((p) => p.id === id);

  if (!project) {
    res.json({
      error: 'Project not Found.',
    });
  }

  res.json(project);
});

app.listen(port, () => {
  console.log('Listening on port:', port);
});
