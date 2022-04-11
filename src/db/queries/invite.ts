import { createConnection, FieldPacket, RowDataPacket } from 'mysql2';
import connectionOptions from '../connection';

export const insertInvite = async () => {
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
      "6f35f124-46d4-11ec-8b6c-d2f44fac733b",
      "08a4c7d4-94d4-11ec-8b6c-d2f44fac733b",
      "ee74e744-9baf-11ec-8b6c-d2f44fac733b"
    )
    `;
    await connection.promise().query(statement);
    connection.end();
  } catch (e) {
    console.error('insertInvite', e);
    connection.end();
  }
};

export const acceptInvite = async () => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
    UPDATE Invite
    SET is_accepted = true
    WHERE id = "24e16be8-a238-11ec-a815-e0077f688b83"
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

    WHERE Project.id = "6f35f124-46d4-11ec-8b6c-d2f44fac733b"
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
