import connection from './connection';

export const selectAllProjects = async () => {
  try {
    const statement = 'SELECT * FROM Project';
    const [rows] = await connection.promise().query(statement);
    return rows;
  } catch (e) {
    console.error('selectAllProjects', e);
  }
};

export const selectProjectById = async (id: string) => {
  try {
    const statement = `SELECT * FROM Project WHERE id = "${id}"`;
    const [[project]]: any = await connection.promise().query(statement);

    return project;
  } catch (e) {
    console.error('selectProjectById', e);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    const statement = `DELETE FROM Project WHERE id = "${id}"`;
    const [[project]]: any = await connection.promise().query(statement);

    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
  }
};

export const editProjectById = async (id: string, payload: any) => {
  const values: string[] = [];
  const editableColumns = ['name', 'description', 'isComplete', 'priority'];

  editableColumns.forEach(
    (k) => payload[k] && values.push(`${k} = "${payload[k]}"`)
  );

  try {
    const statement = `UPDATE Project SET ${values.join(
      ','
    )} WHERE id = "${id}"`;
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
    isComplete: 'false',
    priority: `"${priority}"`,
    timeCreated: 'unix_timestamp()',
  };
  const columns = Object.keys(data).join(',');
  const values = Object.keys(data).join(',');

  try {
    const statement = `INSERT INTO Project (${columns}) VALUES (${values})`;
    const [rows] = await connection.promise().query(statement);
    return rows;
  } catch (e) {
    throw e;
  }
};
