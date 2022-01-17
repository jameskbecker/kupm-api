import connection from './connection';

export const selectAllProjects = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM Project');
    return rows;
  } catch (e) {
    console.error('selectAllProjects', e);
  }
};

export const selectProjectById = async (id: string) => {
  try {
    const [[project]]: any = await connection
      .promise()
      .query(`SELECT * FROM Project WHERE id = "${id}"`);

    return project;
  } catch (e) {
    console.error('selectProjectById', e);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    const [[project]]: any = await connection
      .promise()
      .query(`DELETE FROM Project WHERE id = "${id}"`);

    return project;
  } catch (e) {
    console.error('deleteProjectById', e);
  }
};

export const editProjectById = async (id: string, payload: any) => {
  const values: string[] = [];
  const editableKeys = ['name', 'description', 'isComplete', 'priority'];

  editableKeys.forEach(
    (k) => payload[k] && values.push(`${k} = "${payload[k]}"`)
  );

  try {
    const [[project]]: any = await connection.promise().query(`
      UPDATE Project SET ${values.join(',')} WHERE id = "${id}"
    `);

    return project;
  } catch (e) {
    console.error('editProjectById', e);
  }
};

export const insertProject = async (data: any) => {
  const { name, description, priority } = data;
  console.log(data);
  try {
    const [rows] = await connection.promise().query(`INSERT INTO Project (
      id,
      name,
      description,
      isComplete,
      priority,
      timeCreated
    )
    VALUES (
      uuid(),
        "${name}",
        "${description}",
        false,
        "${priority}",
        unix_timestamp()
    )`);
    return rows;
  } catch (e) {
    throw e;
  }
};
