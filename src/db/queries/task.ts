import connection from '../connection';

export const selectParentNameById = async (parentId: string) => {
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
    const [rows]: unknown[] = await connection.promise().query(statement);
    return (<any>rows)[0];
  } catch (e) {
    console.error('selectParentNameById', e);
  }
};

export const selectTasksByProjectId = async (id: string) => {
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
    `;
    const [tasks]: any = await connection.promise().query(statement);

    return tasks;
  } catch (e) {
    console.error('selectTasksByProjectId', e);
  }
};

export const selectSubTasks = async (id: string) => {
  try {
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

    const [tasks]: any = await connection.promise().query(statement);

    return tasks;
  } catch (e) {
    console.error('selectSubTasks', e);
  }
};

export const insertTask = async (payload: any) => {
  const { name, description, priority, projectId, parentId } = payload;
  const data = {
    id: 'uuid()',
    name: `"${name}"`,
    description: `"${description}"`,
    is_main: !!parentId,
    is_complete: 'false',
    order_number: priority,
    created_at: 'unix_timestamp()',
    completed_at: 'NULL',
    // parent_task_id: `"${parentId ? parentId : 'NULL'}"`,
    project_id: `"${projectId}"`,
  };

  const columns = Object.keys(data).join(',');
  const values = Object.values(data).join(',');

  try {
    const statement = `
    INSERT INTO Task (
      ${columns}
    ) 
    VALUES (
      ${values}
    )`;

    const results = await connection.promise().query(statement);

    return results[0];
  } catch (e) {
    throw e;
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    const statement = `
    DELETE FROM Task
    WHERE id = "${id}"
    `;
    const [[task]]: any = await connection.promise().query(statement);

    return task;
  } catch (e) {
    console.error('deleteTaskById', e);
  }
};

export const deleteTaskByProjectId = async (id: string) => {
  try {
    const statement = `
    DELETE FROM TASK WHERE Task.project_id = "${id}"
    `;
    await connection.promise().query(statement);
  } catch (e) {
    console.error('deleteTaskByProjectId', e);
  }
};

export const updateTask = async (id: string, payload: any) => {
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

  try {
    const data = values.join(',');
    const statement = `
    UPDATE Task SET ${data} 
    WHERE id = "${id}"
    `;
    const [[task]]: any = await connection.promise().query(statement);

    return task;
  } catch (e) {
    console.error('editTaskById', e);
  }
};
