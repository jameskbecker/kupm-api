import { selectTasksByProjectId } from '../db/task';
import { Router } from 'express';

const taskRouter = Router();
const defaultBody = { success: false };
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
};

// projectRouter.get('/', async (req, res) => {
//   let projects;
//   let body: any = defaultBody;
//   res.set(defaultHeaders);
//   try {
//     projects = await selectAllProjects();

//     body.success = true;
//     body.data =
//       projects?.map((p) => ({
//         id: p.id,
//         name: p.name,
//         description: p.description,
//         isComplete: p.is_complete,
//         priority: p.priority,
//         createdAt: p.created_at,
//         completedAt: p.completed_at,
//         memberGroupId: null,
//       })) || [];
//     res.status(200);
//   } catch (e: any) {
//     console.log(e);
//     body.error = e?.message;
//     res.status(503);
//   }

//   res.json(body);
// });

// projectRouter.post('/', async (req, res) => {
//   let body: any = defaultBody;
//   res.set(defaultHeaders);

//   try {
//     await insertProject(req.body);
//     res.status(200);
//     //const project = await selectProjectById('last');
//     body.success = true;
//     body.data = {};
//   } catch (e: any) {
//     console.log(e);
//     res.status(503);
//     body.error = e?.message;
//   }

//   res.json(body);
// });

// projectRouter.delete('/:id', async (req, res) => {
//   const id = req.params.id;
//   let body: any = defaultBody;
//   res.set(defaultHeaders);

//   try {
//     const project = await deleteProjectById(id);
//     if (!project) {
//       res.status(404);
//       body.error = 'Project not Found.';
//     } else {
//       res.status(200);
//       body.data = {};
//     }
//   } catch (e: any) {
//     console.log(e);
//     res.status(503);
//     body.error = e?.message;
//   }

//   res.json(body);
// });

// projectRouter.put('/:id', async (req, res) => {
//   const id = req.params.id;
//   let body: any = defaultBody;
//   res.set(defaultHeaders);

//   try {
//     const project = await editProjectById(id, req.body);
//     if (!project) {
//       res.status(404);
//       body.error = 'Project not Found.';
//     } else {
//       res.status(200);
//       body.data = {};
//     }
//   } catch (e: any) {
//     console.log(e);
//     res.status(503);
//     body.error = e?.message;
//   }

//   res.json(body);
// });

export default taskRouter;
