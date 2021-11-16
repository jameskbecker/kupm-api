import { Project } from '../mock-data/project';
import connection from './connection';

export const selectAllProjects = async () => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM Project');
    return rows;
  } catch (e) {
    throw e;
  }
};

export const selectProjectById = async (id: string) => {
  try {
    const [[project]]: any = await connection
      .promise()
      .query(`SELECT * FROM Project WHERE id = "${id}"`);

    return project;
  } catch (e) {
    throw e;
  }
};
