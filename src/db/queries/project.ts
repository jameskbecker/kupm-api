import connection from '../connection';
import { ProjectTable } from '../types';

export const selectProjectNameById = async (id: string) => {
  const db = connection();
  try {
    const statement = `
    SELECT 
      name,
      description 
    FROM Project
    WHERE Project.id = "${id}"
    `;
    const [rows]: unknown[] = await db.query(statement);
    db.end();
    return (<ProjectTable>rows)[0];
  } catch (e) {
    console.error('selectProjectNameById', e);
    db.end();
  }
};

export const selectProjectById = async (id: string) => {
  const db = connection();
  try {
    const idValue = id === 'last' ? 'LAST_INSERT_ID()' : `"${id}"`;
    console.log(idValue);
    const statement = `
    SELECT 
      * 
    FROM Project 
    WHERE id = ${idValue}
    `;
    const [[project]]: any = await db.query(statement);
    db.end();
    return project;
  } catch (e) {
    console.error('selectProjectById', e);
    db.end();
  }
};

export const deleteProjectById = async (id: string) => {
  const db = connection();
  try {
    const statement = `  
    DELETE FROM Project WHERE id = "${id}"
    `;
    const [[project]]: any = await db.query(statement);
    db.end();
    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
    db.end();
  }
};

export const updateProject = async (id: string, payload: any) => {
  const db = connection();
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
    const [[project]]: any = await db.query(statement);
    db.end();
    return project;
  } catch (e) {
    console.error('editProjectById', e);
    db.end();
  }
};

export const insertProject = async (id: string, payload: any) => {
  const db = connection();
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

  try {
    const statement = `
    INSERT INTO Project (
      ${columns}
    ) 
    VALUES (
      ${values}
    )`;
    const results = await db.query(statement);
    db.end();
    return results[0];
  } catch (e) {
    console.log(e);
    db.end();
  }
};
