import { createConnection, FieldPacket, RowDataPacket } from 'mysql2';
import connectionOptions from '../connection';

export const selectUserIdByEmail = async () => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT User.id
      FROM User
      WHERE User.email = "k1912882@kingston.ac.uk"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectUserIdByEmail', e);
    connection.end();
  }
};
