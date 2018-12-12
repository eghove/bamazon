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

function menuPrompt() {
    inquirer
        .prompt(
            {
                name: "managerPrompt",
                type: "list",
                message: "Welcome BAMAZON Manager! What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            }
        )
        .then(function (answer) {
            // console.log(answer.managerPrompt);
            switch (answer.managerPrompt) {
                case "View Products for Sale":
                    console.log("Products for Sale Selected");
                    break;

                case "View Low Inventory":
                    console.log("View Low Inventory Selected");
                    break;

                case "Add to Inventory":
                    console.log("Add to Inventory Selected");
                    break;

                case "Add New Product":
                    console.log("Add New Product Selected");
                    break;

                default:
                    break;
            }
        })
}

//==MAIN PROCESSES=========================================

menuPrompt();