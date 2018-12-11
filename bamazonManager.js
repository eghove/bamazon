//==REQUIREMENTS & MODULES=========================================

//require the dotenv module
require("dotenv").config();

//loads the exported pieces from keys.js
const keys = require("./keys.js");

//loads the inquirer module
const inquirer = require('inquirer');

//loads the mySQL module
const mysql = require("mysql");

//==GLOBAL VARIABLES=========================================
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.mySQL.secret,
    database: "bamazon_DB"
});


//==FUNCTIONS=========================================

//open connection function
function openConnection() {
    connection.connect(function (err) {
        if (err) throw err;
        // console.log("connected as id " + connection.threadId);
    });
}

//close connection function
function closeConnection() {
    connection.end();
    console.log("Connection closed. Thanks for visiting BAMAZON!");
}


////==MAIN PROCESSES=========================================