import { FieldPacket, RowDataPacket } from 'mysql2';
import connection from '../connection';

export const insertInvite = async (
  projectId: string,
  senderId: string,
  receiverId: string
) => {
  const client = connection();
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
    await client.query(statement);
    client.end();
  } catch (e) {
    console.error('insertInvite', e);
    client.end();
  }
};

export const acceptInvite = async (inviteId: string) => {
  const client = connection();
  try {
    const statement = `
    UPDATE Invite
    SET is_accepted = true
    WHERE id = "${inviteId}"
    `;
    await client.query(statement);
    client.end();
  } catch (e) {
    console.error('acceptInvite', e);
    client.end();
  }
};

export const selectInviteByProjectId = async (projectId: string) => {
  const client = connection();
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
    const [rows]: [RowDataPacket[], FieldPacket[]] = await client.query(
      statement
    );
    client.end();
    return rows;
  } catch (e) {
    console.error('selectInviteByProjectId', e);
    client.end();
  }
};

export const selectInvitesByUserId = async (userId: string) => {
  const client = connection();
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
    const [rows]: [RowDataPacket[], FieldPacket[]] = await client.query(
      statement
    );
    client.end();
    return rows;
  } catch (e) {
    console.error('selectInvitesByUserId', e);
    client.end();
    return [];
  }
};
