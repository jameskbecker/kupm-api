const connectionOptions = () =>
  process.env.PORT
    ? {
        host: 'eu-cdbr-west-02.cleardb.net',
        user: 'bd7692682db0cf',
        password: '16cd1433',
        database: 'heroku_e3d8d90d9bda6a1',
      }
    : {
        host: 'localhost',
        user: 'root',
        password: 'fyp21-kupm',
        database: 'kupm',
      };

export default connectionOptions;
