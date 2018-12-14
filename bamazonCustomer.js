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
    // closeConnection();
}

//first prompt function
function firstPrompt() {
    inquirer
        .prompt([
            {
                name: "buyThis",
                type: "input",
                message: "Please enter the Product ID of the item you would like to buy.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter a number.";
                }
            },

            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to buy.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter a number.";
                }
            }
        ])
        .then(function (answer) {

            // console.log(answer.buyThis);
            // console.log(answer.quantity);
            checkQuantity(answer.buyThis, answer.quantity);

        });
}

//function that checks if there is sufficient quantity ramaining
function checkQuantity(param1, param2) {
    connection.query("SELECT stock_quantity FROM products WHERE item_id = ?",
        [param1],
        function (err, result) {
            if (err) {
                closeConnection();
                throw err;
            }
            else {
                if (param2 > result[0].stock_quantity) {
                    console.log("Insufficient quantity remaining!");
                    closeConnection();
                } else {
                    placeOrder(param1, param2);
                    
                }
            }
        }
    )
}

//function that places the order
function placeOrder(param1, param2) {
    // console.log(param1);
    // console.log(param2);
    connection.query("SELECT * FROM products WHERE item_id = ?",
        [param1],
        function (err, result) {
            if (err) {
                closeConnection();
                throw err;
            } else {
                //determines the total cost
                let totalCost = param2 * result[0].price;
                //changed it to two decimal fixed
                totalCost = totalCost.toFixed(2);
                //grabs the total stock
                let totalStock = result[0].stock_quantity;
                //sets the remaining stock after the purchase
                let remainingStock = totalStock - param2;
                //updates the database with new stock amount
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: remainingStock
                        },

                        {
                            item_id: param1
                        }
                    ],

                    function (err) {
                        if (err) throw err;
                        console.log("Total Cost for Your Order: $" + totalCost + ".");
                        closeConnection();
                    }

                )
            }
        }
    )
}

function start() {
    displayInventory();
}








//==MAIN PROCESSES=========================================

start();