import connection from './connection';

export const selectTasksByProjectId = async (id: string) => {
  try {
    const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
    console.log(idValue);

    const taskColumns = [
      'Task.id',
      'Task.name',
      'Task.description',
      'Task.created_at',
    ];
    const projectColumns = [
      'Project.id AS project_id',
      'Project.name AS project_name',
    ];
    const columns = [...taskColumns, ...projectColumns].join(',');

    const innerJoin = 'INNER JOIN Project ON Task.project_id = Project.id';

    const statement = `SELECT ${columns} FROM Task ${innerJoin} WHERE project_id = ${idValue}`;
    const [tasks]: any = await connection.promise().query(statement);

    return tasks;
  } catch (e) {
    console.error('selectTasksByProjectId', e);
  }
};

export const selectSubTasks = async (id: string) => {
  try {
    const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
    console.log(idValue);

    // const taskColumns = [
    //   'Task.id',
    //   'Task.name',
    //   'Task.description',
    //   'Task.created_at AS dueAt',
    // ];

    // const parentColumns = [
    //   'Task.id AS parentTaskId',
    //   'Task.name AS parentTaskName',
    // ];

    // const projectColumns = [
    //   'Project.id AS projectId',
    //   'Project.name AS projectName',
    // ];
    // const columns = [...taskColumns, ...projectColumns].join(',');

    // const innerJoin = 'INNER JOIN Task ON Task.parent_task_id = Task.id';

    const statement = `
    SELECT 
	    SubTask.name,
      SubTask.description,
      SubTask.created_at,
      ParentTask.name AS parent_name,
      Project.name AS project_name

    FROM Task AS SubTask
 
    # Join id or parent task and parent_task_id of subtask
    INNER JOIN Task as ParentTask 
      ON ParentTask.id = SubTask.parent_task_id
    
    # Access Project Data
    INNER JOIN Project
	    ON Project.id = SubTask.project_id

    # Condition to find filter belonging to parent task
    WHERE SubTask.parent_task_id = ${idValue}
    `;
    console.log(statement);
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
    const statement = `INSERT INTO Task (${columns}) VALUES (${values})`;
    console.log('<<', statement, '>>');
    const results = await connection.promise().query(statement);

    return results[0];
  } catch (e) {
    throw e;
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    const statement = `DELETE FROM Task WHERE id = "${id}"`;
    const [[task]]: any = await connection.promise().query(statement);

    return task;
  } catch (e) {
    console.error('deleteTaskById', e);
  }
};

export const editTaskById = async (id: string, payload: any) => {
  const values: string[] = [];
  const editableColumns = ['name', 'description'];

  editableColumns.forEach(
    (k) => payload[k] && values.push(`${k} = "${payload[k]}"`)
  );

  try {
    const data = values.join(',');
    const statement = `UPDATE Task SET ${data} WHERE id = "${id}"`;
    const [[task]]: any = await connection.promise().query(statement);

    return task;
  } catch (e) {
    console.error('editTaskById', e);
  }
};
