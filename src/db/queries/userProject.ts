import {
  createConnection,
  FieldPacket,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2';
import connectionOptions from '../connection';

export const selectUserProjects = async (userId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT 
        Project.id, 
        Project.name, 
        Project.description, 
        Project.is_complete, 
        Project.priority, 
        Project.created_at,
        Project.due_at
        
        Owner.first_name AS owner_first_name,
        Owner.last_name AS owner_last_name
      
      FROM UserProject

      INNER JOIN Project
        ON UserProject.project_id = Project.id

      INNER JOIN User AS Owner
        ON Project.created_by_user_id = Owner.id

      WHERE user_id = "${userId}"
  
      ORDER BY Project.created_at DESC
    `;
    console.log(statement);
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectUserProjects', e);
    connection.end();
  }
};

export const selectUserProjectMembers = async (projectId: string) => {
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
        project_id = "${projectId}"
    `;
    const rows: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return <any>rows[0];
  } catch (e) {
    console.error('selectUserProjectMembers', e);
    connection.end();
  }
};

export const insertUserProject = async (projectId: string, userId: string) => {
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
        "${projectId}",
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
