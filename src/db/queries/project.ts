import { createConnection } from 'mysql2';
import connectionOptions from '../connection';
import { ProjectTable } from '../types';

export const selectAllProjects = async (userId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    SELECT 
      Project.id, 
      Project.name, 
      Project.description, 
      Project.is_complete, 
      Project.priority, 
      Project.created_at
      
      FROM UserProject

      INNER JOIN Project
        ON UserProject.project_id = Project.id

      INNER JOIN User AS Owner
        ON Project.created_by_user_id = Owner.id

      WHERE user_id = "${userId}"
  
      ORDER BY Project.created_at DESC

    `;

    // const statement = `
    // SELECT
    //   Project.id,
    //   Project.name,
    //   Project.description,
    //   Project.is_complete,
    //   Project.priority,
    //   Project.created_at,

    //   Owner.first_name AS owner_first_name,
    //   Owner.last_name AS owner_last_name

    // FROM Project

    // `;
    console.log(statement);
    const [rows]: unknown[] = await connection.promise().query(statement);
    connection.end();
    return <ProjectTable>rows;
  } catch (e) {
    console.error('selectAllProjects', e);
    connection.end();
  }
};

export const selectProjectNameById = async (id: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    SELECT 
      name,
      description 
    FROM Project
    WHERE Project.id = "${id}"
    `;
    const [rows]: unknown[] = await connection.promise().query(statement);
    connection.end();
    return (<ProjectTable>rows)[0];
  } catch (e) {
    console.error('selectProjectNameById', e);
    connection.end();
  }
};

export const selectProjectById = async (id: string) => {
  const connection = createConnection(connectionOptions());
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
    connection.end();
    return project;
  } catch (e) {
    console.error('selectProjectById', e);
    connection.end();
  }
};

export const deleteProjectById = async (id: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `  
    DELETE FROM Project WHERE id = "${id}"
    `;
    const [[project]]: any = await connection.promise().query(statement);
    connection.end();
    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
    connection.end();
  }
};

export const updateProject = async (id: string, payload: any) => {
  const connection = createConnection(connectionOptions());
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
    connection.end();
    return project;
  } catch (e) {
    console.error('editProjectById', e);
    connection.end();
  }
};

export const insertProject = async (payload: any) => {
  const connection = createConnection(connectionOptions());
  const { name, description, priority, createdBy } = payload;
  const data = {
    id: 'uuid()',
    name: `"${name}"`,
    description: `"${description}"`,
    priority: `"${priority}"`,
    is_complete: 'false',
    completed_at: 'NULL',

    created_at: 'current_time()',
    updated_at: 'current_time()',
    created_by_user_id: `"${createdBy}"`,
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
    connection.end();
    return results[0];
  } catch (e) {
    console.log(e);
    connection.end();
  }
};
