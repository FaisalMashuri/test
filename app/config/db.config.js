module.exports = {
    /*
    * First five parameters are for MySQL connection.
    */
    HOST: "localhost", // kalo pake docker ubah ke mysql_server
    USER: "root", // kalo pake docker ubah ke "dan"
    PASSWORD: "", // kalo pake docker ubah ke "secret"
    DB: "test_db",
    dialect: "mysql",
    pool: {
        max: 5, // maximum number of connection in pool
        min: 0, // minimum number of connection in pool
        acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
        idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
    }
};
