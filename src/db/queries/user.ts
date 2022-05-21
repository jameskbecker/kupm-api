import { RegisterPayload } from 'controllers/authentication';
import { FieldPacket, RowDataPacket } from 'mysql2';
import connection from '../connection';

export const selectUserIdByEmail = async (email: string) => {
  const db = connection();
  try {
    const statement = `
      SELECT User.id
      FROM User
      WHERE User.email = "${email}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(statement);
    db.end();
    return rows;
  } catch (e) {
    console.error('selectUserIdByEmail', e);
    db.end();
  }
};

export const selectUserById = async (id: string) => {
  const db = connection();
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
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(statement);
    db.end();
    return rows;
  } catch (e) {
    console.error('selectUserById', e);
    db.end();
  }
};

export const insertUser = async (data: RegisterPayload) => {
  const db = connection();
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
    const result = await db.query(statement);
    db.end();
    return result;
  } catch (e) {
    db.end();
    throw e;
  }
};

export const selectPasswordByEmail = async (email: string) => {
  const db = connection();
  try {
    const statement = `
      SELECT id, password_hash AS password 
      FROM User
      WHERE email = "${email}"
    `;
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.query(statement);
    db.end();
    return rows;
  } catch (e) {
    console.error('selectPasswordById', e);
    db.end();
  }
};
