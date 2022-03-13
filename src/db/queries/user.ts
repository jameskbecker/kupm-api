import { FieldPacket, RowDataPacket } from 'mysql2';
import connection from '../connection';

export const selectUserIdByEmail = async () => {
  try {
    const statement = `
      SELECT User.id
      FROM User
      WHERE User.email = "k1912882@kingston.ac.uk"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);

    return rows;
  } catch (e) {
    console.error('selectUserIdByEmail', e);
  }
};
