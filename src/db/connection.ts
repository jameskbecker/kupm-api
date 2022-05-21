import { ConnectionOptions, createConnection } from 'mysql2';

export const connectionConfig = (): ConnectionOptions =>
  process.env.DATABASE_URL
    ? { uri: process.env.DATABASE_URL }
    : {
        host: 'localhost',
        user: 'root',
        password: 'fyp21-kupm',
        database: 'kupm',
      };

const connection = () => createConnection(connectionConfig()).promise();
export default connection;
