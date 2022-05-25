import connection from '../connection';
import { ProjectTable } from '../types';

export const selectProjectNameById = async (id: string) => {
  const client = connection();
  const statement = `
  SELECT 
    name,
    description 
  FROM Project
  WHERE Project.id = "${id}"
  `;
  try {
    const [rows]: unknown[] = await client.query(statement);
    client.end();
    return (<ProjectTable>rows)[0];
  } catch (e) {
    console.error('selectProjectNameById', e);
    client.end();
  }
};

export const selectProjectById = async (id: string) => {
  const client = connection();
  const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
  const statement = `
  SELECT * 
  FROM Project 
  WHERE id = ${idValue}
  `;
  try {
    const [[project]]: any = await client.query(statement);
    client.end();
    return project;
  } catch (e) {
    console.error('selectProjectById', e);
    client.end();
  }
};

export const deleteProjectById = async (id: string) => {
  const client = connection();
  const statement = `  
  DELETE FROM Project WHERE id = "${id}"
  `;
  try {
    const [[project]]: any = await client.query(statement);
    client.end();
    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
    client.end();
  }
};

export const updateProject = async (id: string, payload: any) => {
  const client = connection();
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
  const data = values.join(',');
  const statement = `
  UPDATE Project SET ${data}
  WHERE id = "${id}"
  `;

  try {
    const [[project]]: any = await client.query(statement);
    client.end();
    return project;
  } catch (e) {
    console.error('editProjectById', e);
    client.end();
  }
};

export const insertProject = async (id: string, payload: any) => {
  const client = connection();
  const { name, dueAt, description, priority, createdBy } = payload;
  const data = {
    id: `"${id}"`,
    name: `"${name}"`,
    description: `"${description}"`,
    priority: `"${priority}"`,
    is_complete: 'false',
    completed_at: 'NULL',

    created_at: 'current_time()',
    updated_at: 'current_time()',
    due_at: `from_unixtime(${dueAt})`,
    created_by_user_id: `"${createdBy}"`,
  };

  const columns = Object.keys(data).join(',');
  const values = Object.values(data).join(',');
  const statement = `
  INSERT INTO Project ( ${columns} ) 
  VALUES ( ${values} )`;

  try {
    const results = await client.query(statement);
    client.end();
    return results[0];
  } catch (e) {
    console.log(e);
    client.end();
  }
};
