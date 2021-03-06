import connection from '../connection';

export const selectAllUserTasks = async (userId: string) => {
  const client = connection();
  try {
    const statement = `
    SELECT
      Task.id,
      Task.name,
      Task.description,
      Task.created_at,
      Project.id AS project_id,
      Project.name AS project_name,
      Project.due_at as project_due_at
    FROM Task
    INNER JOIN Project
      ON Task.project_id = Project.id
    WHERE Project.created_by_user_id = "${userId}"
      AND Task.parent_task_id IS NULL
    ORDER BY Project.due_at ASC
    LIMIT 25
    `;
    const [tasks]: any = await client.query(statement);
    client.end();
    return tasks;
  } catch (e) {
    console.error('selectAllUserTasks', e);
    client.end();
  }
};

export const selectParentNameById = async (parentId: string) => {
  const client = connection();
  try {
    const statement = `
    SELECT 
      ParentTask.name,
      Project.id as project_id,
      Project.name as project_name
    FROM Task AS ParentTask

    INNER JOIN Project
    ON Project.id = ParentTask.project_id

    WHERE ParentTask.id = "${parentId}" 
    `;
    const [rows]: unknown[] = await client.query(statement);
    client.end();
    return (<any>rows)[0];
  } catch (e) {
    console.error('selectParentNameById', e);
    client.end();
  }
};

export const selectTasksByProjectId = async (id: string) => {
  const client = connection();
  try {
    const statement = `
    SELECT
      Task.id,
      Task.name,
      Task.description,
      Task.created_at,
      Task.is_complete,

      Project.id AS project_id,
      Project.name AS project_name

    FROM Task 

    INNER JOIN Project 
      ON Task.project_id = Project.id

    WHERE project_id = "${id}" 
      AND Task.parent_task_id IS NULL

    ORDER BY Task.created_at ASC
    `;
    const [tasks]: any = await client.query(statement);
    client.end();
    return tasks;
  } catch (e) {
    console.error('selectTasksByProjectId', e);
    client.end();
  }
};

export const selectSubTasks = async (id: string) => {
  const client = connection();
  const statement = `
  SELECT 
    SubTask.id,
    SubTask.name,
    SubTask.description,
    SubTask.created_at,

    ParentTask.name AS parent_name,
    Project.name AS project_name

  FROM Task AS SubTask

  INNER JOIN Task AS ParentTask 
    ON ParentTask.id = SubTask.parent_task_id
  
  INNER JOIN Project
    ON Project.id = SubTask.project_id

  WHERE SubTask.parent_task_id = "${id}"
  `;
  try {
    const [tasks]: any = await client.query(statement);
    client.end();
    return tasks;
  } catch (e) {
    console.error('selectSubTasks', e);
    client.end();
  }
};

export const insertTask = async (payload: any) => {
  const client = connection();
  const { name, description, priority, projectId, parentId } = payload;
  const data = {
    id: 'uuid()',
    name: `"${name}"`,
    description: `"${description}"`,
    priority: priority,
    is_complete: 'false',
    completed_at: 'NULL',
    created_at: 'current_time()',
    updated_at: 'current_time()',
    parent_task_id: `${parentId ? `"${parentId}"` : 'NULL'}`,
    project_id: `"${projectId}"`,
  };

  const columns = Object.keys(data).join(',');
  const values = Object.values(data).join(',');
  const statement = `
  INSERT INTO Task ( ${columns} ) 
  VALUES ( ${values} )
  `;

  try {
    console.log(statement);
    const results = await client.query(statement);
    client.end();
    return results[0];
  } catch (e) {
    console.log(e);
    client.end();
  }
};

export const deleteTaskById = async (id: string) => {
  const client = connection();
  const statement = `
  DELETE FROM Task
  WHERE id = "${id}"
  `;
  try {
    const [[task]]: any = await client.query(statement);
    client.end();
    return task;
  } catch (e) {
    console.error('deleteTaskById', e);
    client.end();
  }
};

export const deleteTaskByProjectId = async (id: string) => {
  const client = connection();
  const statement = `
  DELETE FROM TASK WHERE Task.project_id = "${id}"
  `;
  try {
    await client.query(statement);
    client.end();
  } catch (e) {
    console.error('deleteTaskByProjectId', e);
    client.end();
  }
};

export const updateTask = async (id: string, payload: any) => {
  const client = connection();
  const values: string[] = [];
  const editableColumns = ['name', 'description', 'is_complete'];

  editableColumns.forEach(
    (k) =>
      payload.hasOwnProperty(k) &&
      values.push(
        `${k} = "${
          typeof payload[k] === 'boolean' ? Number(payload[k]) : payload[k]
        }"`
      )
  );
  const data = values.join(',');
  const statement = `
  UPDATE Task SET ${data} 
  WHERE id = "${id}"
  `;

  try {
    const [[task]]: any = await client.query(statement);
    client.end();
    return task;
  } catch (e) {
    console.error('editTaskById', e);
    client.end();
  }
};
