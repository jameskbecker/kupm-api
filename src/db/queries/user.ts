import { RegisterPayload } from 'controllers/authentication';
import { createConnection, FieldPacket, RowDataPacket } from 'mysql2';
import connectionOptions from '../connection';

export const selectUserIdByEmail = async (email: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT User.id
      FROM User
      WHERE User.email = "${email}"
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

export const selectUserById = async (id: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT 
        User.id,
        User.first_name,
        User.last_name,
        User.email
      FROM User
      WHERE User.id = "${id}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectUserById', e);
    connection.end();
  }
};

export const insertUser = async (data: RegisterPayload) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      INSERT INTO User (
        id,
        first_name,
        last_name,
        email,
        password_hash,
        created_at
      ) 
      VALUES (
        uuid(),
        "${data.firstName}",
        "${data.lastName}",
        "${data.email}",
        "${data.password}",
        current_time()
      )
      `;
    const result = await connection.promise().query(statement);
    connection.end();
    return result;
  } catch (e) {
    connection.end();
    throw e;
  }
};

export const selectPasswordByEmail = async (email: string) => {
  const connection = createConnection(connectionOptions());
  try {
    const statement = `
      SELECT password_hash AS password FROM User
      WHERE email = "${email}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection
      .promise()
      .query(statement);
    connection.end();
    return rows;
  } catch (e) {
    console.error('selectPasswordById', e);
    connection.end();
  }
};
