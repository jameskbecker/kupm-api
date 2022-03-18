import { FieldPacket, RowDataPacket } from 'mysql2';
import connection from '../connection';

export const selectCommentsByUserId = async (userId: string) => {
  try {
    const statement = `
    SELECT 
      Sender.first_name,
      Sender.last_name,

      Comment.created_at,
      Comment.content,

      Task.name AS task_name

      FROM Comment
      INNER JOIN User as Sender
        ON Comment.sender_id = Sender.id

      INNER JOIN Task
        ON Comment.task_id = Task.id
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    return rows;
  } catch (e) {
    console.error('selectCommentsByUserId', e);
  }
};
