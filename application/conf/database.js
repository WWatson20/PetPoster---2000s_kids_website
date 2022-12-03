const mysql = require('mysql2');

    const pool=mysql.createPool({
        //info for connecting to the sql database
                host: 'localhost',
                user: 'root',
                password: '4064',
                database: 'csc317db',
                queueLimit: 0,                  // no limit to however many people can be waiting
                connectionLimit: 20,        // only 20 connections can occur at a time
                waitForConnections: true           // if we're already at the connection limit, wait for an open connection
    })
    const promisePool = pool.promise();

module.exports = promisePool;