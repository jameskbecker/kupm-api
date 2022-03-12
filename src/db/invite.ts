import connection from './connection';

export const insertInvite = async () => {
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
  } catch (e) {
    console.error('insertInvite', e);
  }
};

export const acceptInvite = async () => {
  try {
    const statement = `
    UPDATE Invite
    SET is_accepted = true
    WHERE id = "24e16be8-a238-11ec-a815-e0077f688b83"
    `;
    await connection.promise().query(statement);
  } catch (e) {
    console.error('acceptInvite', e);
  }
};
