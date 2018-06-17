<template />
<script>
export default {
    mounted(){
/* waks:start-annotation=Problem
This is an application that supports either MySQL and Postgres database connections. At some point we need the code to know which one is being used. Here, we have a gnarly switch statement in our main app logic, which distracts from what the app is actually doing.
waks:end-annotation */
!function(){
/* waks:start-example */
/* Classes */
class MySQLConnection {
    constuctor(username, password){/* Connects to MySQL */}
    query(statement){}
}

class PostgreSQLConnection {
    constuctor(username, password){/* Connects to PostgreSQL */}
    query(statement){}
}

/* App logic */
const userConfig = {
    database: "mysql",
    username: "u",
    password: "p",
};

let connection;
const {database, username, password} = userConfig;

// This doesn't belong in the main logic of our application
switch(database){
    case "mysql": {
        connection = new MySQLConnection(username, password);
        break;
    }
    case "postgresql": {
        connection = new PostgreSQLConnection(username, password);
        break;
    }
}

connection.query("SELECT * FROM User");
/* waks:end-example */
}();
/* waks:start-annotation=Solution
By abstracting `MySQLConnection` and `PostgreSQLConnection` behind `Database.connect()`, we can dramatically simplify the application logic. Note that a key to making this work is that both connections should have a consistent interface, so your app logic doesn't have to do a bunch of testing to make sure certain methods exist on the object it got back.
waks:end-annotation */
!function(){
/* waks:start-example */
// Classes
class MySQLConnection {
    constuctor(username, password){/* Connects to MySQL */}
    query(statement){}
}

class PostgreSQLConnection {
    constuctor(username, password){/* Connects to PostgreSQL */}
    query(statement){}
}

// New class
class Database{
    // This is a factory
    static connect(database, username, password){
        switch(database){
            case "mysql": {
                return new MySQLConnection(username, password);
                break;
            }
            case "postgresql": {
                return new PostgreSQLConnection(username, password);
                break;
            }
        }
    }
}

// App code
const userConfig = {
    database: "postgresql",
    username: "u",
    password: "p",
};
const {database, username, password} = userConfig;

// The app doesn't care about database connection details anymore!
const connection = Database.connect(database, username, password);

// `query` is available on all types of connection
connection.query("SELECT * FROM User");
/* waks:end-example */
}();
    }
};

</script>
