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
    // console.log("Connection closed. Thanks for visiting BAMAZON!");
}

function menuPrompt() {
    inquirer
        .prompt(
            {
                name: "managerPrompt",
                type: "list",
                message: "\nWelcome BAMAZON Manager! What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Exit Program"
                ]
            }
        )
        .then(function (answer) {
            // console.log(answer.managerPrompt);
            // openConnection();
            switch (answer.managerPrompt) {
                case "View Products for Sale":
                    console.log("View Products for Sale Selected");
                    viewProducts();
                    break;

                case "View Low Inventory":
                    console.log("View Low Inventory Selected");
                    viewLowInventory();
                    break;

                case "Add to Inventory":
                    console.log("Add to Inventory Selected");
                    addInventory();
                    break;

                case "Add New Product":
                    console.log("Add New Product Selected");
                    addProduct();
                    break;

                case "Exit Program":
                    console.log("Exiting Program! Thank you for your hard work!");
                    closeConnection();
                    break;

                default:
                    break;
            }
        })
}

//list every available item: the item IDs, names, prices, and quantities
function viewProducts() {
    
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products",
        function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].item_id + " || " + "Product Name: " + res[i].product_name + " || " + "Price: " + res[i].price + " || " + "Quantity: " + res[i].stock_quantity);
            }
            
            menuPrompt();
        }
    )
}

// list all items with an inventory count lower than five
function viewLowInventory() {
   
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5",
        function (err, res) {
            if (err) throw err;
            if (res.length===0) {
                console.log("No items with stock less than 5 items!");
            } else {
                for (let i = 0; i < res.length; i++) {
                    console.log("Product ID: " + res[i].item_id + " || " + "Product Name: " + res[i].product_name + " || " + "Quantity: " + res[i].stock_quantity);
                }
            };
            menuPrompt();
        }
    )
}

//display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
    inquirer
    .prompt(
        [
            {
                name: "stockThis",
                type: "input",
                message: "Please enter the Product ID of the item you would like to stock.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter a number.";
                }  
            },

            {
                name: "howMuch",
                type: "input",
                message: "Please enter the quantity you'd like to add to existing stock.",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "Please enter a number.";
                }  
            }
        ]
    ).then(function(answer) {
        connection.query("SELECT * FROM products WHERE item_id = ?",
        [answer.stockThis],
        function (err, res) {
            if (err) throw err;
            //tell the user what they are about to do
            console.log("You are re-stocking: " + res[0].product_name + " with " + answer.howMuch + " additional units.");

            //this menu prompt will likely be moved
            menuPrompt()
        })
    })
};

function updateDB () {
    
}

//allow the manager to add a completely new product to the store
function addProduct() {
    
    menuPrompt()
};

//logic for the first run
function initialize () {
    //open the first connection
    openConnection();
    menuPrompt();
};
//==MAIN PROCESSES=========================================

initialize();