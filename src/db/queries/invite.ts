import { createConnection, FieldPacket, RowDataPacket } from 'mysql2';
import connectionOptions from '../connection';

export const insertInvite = async (
  projectId: string,
  senderId: string,
  receiverId: string
) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    INSERT INTO Invite (
      id,
      is_accepted,
      sent_at,
      expires_at,
      project_id,
      sender_id,
      receiver_id
    ) 
    VALUES (
      uuid(),
      0,
      current_time(),
      from_unixtime(1649519522),
      "${projectId}",
      "${senderId}",
      "${receiverId}"
    )
    `;
    await connection.promise().query(statement);
    connection.end();
  } catch (e) {
    console.error('insertInvite', e);
    connection.end();
  }
};

export const acceptInvite = async (inviteId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    UPDATE Invite
    SET is_accepted = true
    WHERE id = "${inviteId}"
    `;
    await connection.promise().query(statement);
    connection.end();
  } catch (e) {
    console.error('acceptInvite', e);
    connection.end();
  }
};

export const selectInviteByProjectId = async (projectId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    SELECT 
      Invite.id,
      Invite.project_id,
      Invite.sent_at,

      Project.name,

      Sender.first_name,
      Sender.last_name
    FROM Invite

    INNER JOIN Project
      ON Invite.project_id = Project.id

    INNER JOIN User AS Sender
      ON Invite.sender_id = Sender.id

    WHERE Project.id = "${projectId}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectInviteByProjectId', e);
    connection.end();
  }
};

export const selectInvitesByUserId = async (userId: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    SELECT 
      Invite.id,
      Invite.project_id,
      Invite.sent_at,

      Project.name AS project_name,

      Sender.first_name,
      Sender.last_name
    FROM Invite

    INNER JOIN Project
      ON Invite.project_id = Project.id

    INNER JOIN User AS Sender
      ON Invite.sender_id = Sender.id

    WHERE Invite.receiver_id = "${userId}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectInvitesByUserId', e);
    connection.end();
    return [];
  }
};
