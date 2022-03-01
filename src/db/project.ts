import connection from './connection';
import { ProjectTable } from './types';

export const selectAllProjects = async () => {
  try {
    const statement = `
    SELECT
      *
    FROM Project
    `;
    const [rows]: unknown[] = await connection.promise().query(statement);
    return <ProjectTable>rows;
  } catch (e) {
    console.error('selectAllProjects', e);
  }
};

export const selectProjectNameById = async (id: string) => {
  try {
    const statement = `
    SELECT 
      name 
    FROM Project
    WHERE Project.id = "${id}"
    `;
    const [rows]: unknown[] = await connection.promise().query(statement);
    return (<ProjectTable>rows)[0].name;
  } catch (e) {
    console.error('selectProjectNameById', e);
  }
};

export const selectProjectById = async (id: string) => {
  try {
    const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
    console.log(idValue);
    const statement = `
    SELECT 
      * 
    FROM Project 
    WHERE id = ${idValue}
    `;
    const [[project]]: any = await connection.promise().query(statement);

    return project;
  } catch (e) {
    console.error('selectProjectById', e);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    const TaskStatement = `
    DELETE FROM TASK WHERE Task.project_id = "${id}"
    `;
    const ProjectStatement = `  
    DELETE FROM Project WHERE id = "${id}"
    `;
    await connection.promise().query(TaskStatement);
    const [[project]]: any = await connection.promise().query(ProjectStatement);

    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
  }
};

export const editProjectById = async (id: string, payload: any) => {
  const values: string[] = [];
  const editableColumns = ['name', 'description', 'is_complete', 'priority'];

  editableColumns.forEach(
    (k) => payload[k] && values.push(`${k} = "${payload[k]}"`)
  );

  try {
    const data = values.join(',');
    const statement = `UPDATE Project SET ${data} WHERE id = "${id}"`;
    const [[project]]: any = await connection.promise().query(statement);

    return project;
  } catch (e) {
    console.error('editProjectById', e);
  }
};

export const insertProject = async (payload: any) => {
  const { name, description, priority } = payload;
  const data = {
    id: 'uuid()',
    name: `"${name}"`,
    description: `"${description}"`,
    is_complete: 'false',
    priority: `"${priority}"`,
    created_at: 'unix_timestamp()',
  };

  const columns = Object.keys(data).join(',');
  const values = Object.values(data).join(',');

  try {
    const statement = `
    INSERT INTO Project (
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
