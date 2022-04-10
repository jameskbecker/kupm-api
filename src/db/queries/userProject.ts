import {
  createConnection,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import connectionOptions from '../connection';

export const selectUserProjects = async () => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT 
        UserProject.id,
        UserProject.is_owner,
        UserProject.can_read, 
        UserProject.can_write, 
        UserProject.project_id, 
        UserProject.created_at,
        UserProject.user_id,
        User.first_name, 
        User.last_name
      FROM UserProject
      INNER JOIN User
        ON User.id = UserProject.user_id
      WHERE 
        project_id = "6f35f124-46d4-11ec-8b6c-d2f44fac733b"
    `;
    const rows: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return <any>rows[0];
  } catch (e) {
    console.error('selectUserProjects', e);
    connection.end();
  }
};

export const insertUserProject = async (userId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      INSERT INTO UserProject (
        id, 
        is_owner,
        can_read, 
        can_write,
        created_at,
        project_id, 
        user_id
      ) 
      VALUES (
        uuid(),
        false,
        true,
        true,
        current_time(),
        "6f35f124-46d4-11ec-8b6c-d2f44fac733b",
        "${userId}"
      )
      `;
    const ok: [ResultSetHeader, FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return null;
  } catch (e) {
    console.error('inserUserProject', e);
    connection.end();
  }
};
