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
        console.log("connected as id " + connection.threadId);
    });
}

//close connection function
function closeConnection() {
    connection.end();
    // console.log("Connection closed.");
}

//display inventory function
function displayInventory() {
    console.log("Welcome to BAMAZON! Your one-stop shop for discounted goods!");
    console.log("Here are the items we have for sale:");
    openConnection();
    connection.query("SELECT item_id, product_name, price FROM products",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].item_id + " || " + "Product Name: " + res[i].product_name + " || " + "Price: " + res[i].price);
            }
            firstPrompt();
        });
    closeConnection();
}

//first prompt function
function firstPrompt() {
    inquirer
        .prompt([
            {
                name: "buyThis",
                type: "input",
                message: "Please enter the Product ID of the item you would like to buy.",
            },

            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to buy.",
            }
        ])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            console.log(answer.buyThis);
            console.log(answer.quantity);
        });
}








function start() {
    displayInventory();
}








//==MAIN PROCESSES=========================================

start();