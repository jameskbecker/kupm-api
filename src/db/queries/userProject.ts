import { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../connection';

export const selectUserProjects = async (
  userId: string,
  projectId?: string
) => {
  const client = connection();
  try {
    const statement = `
      SELECT 
        Project.id, 
        Project.name, 
        Project.description, 
        Project.is_complete, 
        Project.priority, 
        Project.created_at,
        Project.due_at,
        
        Owner.first_name AS owner_first_name,
        Owner.last_name AS owner_last_name
      
      FROM UserProject

      INNER JOIN Project
        ON UserProject.project_id = Project.id

      INNER JOIN User AS Owner
        ON Project.created_by_user_id = Owner.id

      WHERE user_id = "${userId}"
      ${
        projectId
          ? `
        AND UserProject.project_id = "${projectId}"`
          : ''
      }
  
      ORDER BY Project.created_at DESC
    `;

    const [rows]: [RowDataPacket[], FieldPacket[]] = await client.query(
      statement
    );
    client.end();
    return rows;
  } catch (e) {
    console.error('selectUserProjects', e);
    client.end();
  }
};

export const selectUserProjectMembers = async (projectId: string) => {
  const client = connection();
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
    const rows: [RowDataPacket[], FieldPacket[]] = await client.query(
      statement
    );
    client.end();
    return <any>rows[0];
  } catch (e) {
    console.error('selectUserProjectMembers', e);
    client.end();
  }
};

export const insertUserProject = async (projectId: string, userId: string) => {
  const client = connection();
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
    const ok: [ResultSetHeader, FieldPacket[]] = await client.query(statement);
    client.end();
    return null;
  } catch (e) {
    console.error('inserUserProject', e);
    client.end();
  }
};

export const deleteUserProjectByProjectId = async (id: string) => {
  const client = connection();
  try {
    const statement = `
    DELETE FROM UserProject WHERE UserProject.project_id = "${id}"
    `;
    await client.query(statement);
    client.end();
  } catch (e) {
    console.error('deleteUserProjectByProjectId', e);
    client.end();
  }
};
