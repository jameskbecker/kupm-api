import connection from '../connection';
import { ProjectTable } from '../types';

export const selectAllProjects = async () => {
  try {
    const statement = `
    SELECT 
      Project.id, 
      Project.name, 
      Project.description, 
      Project.is_complete, 
      Project.priority, 
      Project.created_at,

      Owner.first_name AS owner_first_name,
      Owner.last_name AS owner_last_name

    FROM Project
    INNER JOIN User AS Owner
      ON Project.created_by_user_id = Owner.id

    ORDER BY Project.created_at DESC
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
      name,
      description 
    FROM Project
    WHERE Project.id = "${id}"
    `;
    const [rows]: unknown[] = await connection.promise().query(statement);
    return (<ProjectTable>rows)[0];
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
    const statement = `  
    DELETE FROM Project WHERE id = "${id}"
    `;
    const [[project]]: any = await connection.promise().query(statement);

    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
  }
};

export const updateProject = async (id: string, payload: any) => {
  const values: string[] = [];
  const editableColumns = ['name', 'description', 'is_complete', 'priority'];

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
    priority: `"${priority}"`,
    is_complete: 'false',
    completed_at: 'NULL',

    created_at: 'current_time()',
    updated_at: 'current_time()',
    created_by_user_id: '"39aeec9a-b8bb-11ec-a034-02e4fd6e79c6"',
  };

  const columns = Object.keys(data).join(',');
  const values = Object.values(data).join(',');
  console.log('insert');
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
