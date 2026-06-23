const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_booking"
});

connection.connect((err) => {
    if(err){
        console.log("Database Connection Failed");
    } else {
        console.log("Database Connected Successfully");
    }
});

module.exports = connection;