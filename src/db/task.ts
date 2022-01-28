import connection from './connection';

export const selectTasksByProjectId = async (id: string) => {
  try {
    const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
    console.log(idValue);

    const taskColumns = [
      'Task.id',
      'Task.name',
      'Task.description',
      'Task.created_at AS dueAt',
    ];
    const projectColumns = [
      'Project.id AS projectId',
      'Project.name AS projectName',
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
