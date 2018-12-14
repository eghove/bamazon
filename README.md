# Welcome to BAMAZON
BAMAZON is CLI-based retail storefront simulator that runs in the command terminal.

## What is BAMAZON?
BAMAZON is a storefront simulator that can be accessed via the command line of a user's terminal. It was built using Node.js, JavaScript, a SQL database, and several free, open-sourced Node modules. The BAMAZON simulator has two user-types: a BAMAZON customer and a BAMAZON manager.

As a BAMAZON customer, the user can do the following:
* View a list of all items currently for sale on BAMAZON with a description, price, and item ID number,
* Select an item to purchase by entering an item ID number, 
* Enter the quantity of the item to buy,
* Automatically check if enough of the item is in stock to complete the order,
* See the total price of their order, and
* Automatically update the inventory database with the appropriate quantity of the item remaining.

As a BAMAZON manager, the user can do the following:
* View a list of all items currently for sale on BAMAZON with a discription, price, item ID number, and quantity in stock,
* Display a list of any inventory where the current quantity in stock is fewer than five items,
* Add inventory to an existing item, and
* Add a new item to the inventory database.

## How do I Start Using BAMAZON?
If you'd like to use BAMAZON, please kindly follow the steps outlined below:
1. Ensure that you have Node.js installed on your local machine. If you need to install Node.js, please go here: https://nodejs.org/ .
1. Ensure that you have mySQL installed, which can be downloaded from here: https://www.mysql.com/ . 
1. Clone the LIRI Bot repository into a folder on your local machine. If you need more information about cloning GitHub repositories, please go here: https://help.github.com/articles/cloning-a-repository/ .
1. Once you've cloned the BAMAZON repository into a folder on your local machine, please check to make sure you have the following files:
    1. keys.js
    1. bamazonCustomer.js
    1. bamazonManager.js
    1. package.json
    1. package-lock.json
    1. A folder called `SQL_assets` with the following files:
        1. schema.sql
        1. seeds.sql
1. Use the terminal to navigate to the folder containing your local copy of BAMAZON. Once you're there, type the following command in your terminal: `npm install`. This will install all of the Node modules necessary to make BAMAZON work.
1. Set up the database that BAMAZON will use by doing the following:
    1. Initialize your SQL server.
    1. Run the `schema.sql` script to create the database.
    1. Run the `seeds.sql` script to populate the database with some inventory information for BAMAZON to use.
1. In the same local folder as BAMAZON's other files, create a file called `.env`. This is where you'll store your login information for your mySQL server and the database it holds for use by `keys.js` file.
1. Open your `.env` file in your favorite text editor (like Visual Studio Code) and replace the values below with your mySQL login information. Make it look like the code below.
        # SQL Secrets

        SQL_TOKEN = YOUR_MYSQL_SERVER_PASSWORD

1. You're all set to check out BAMAZON!

## How do I use `bamazonCustomer.js`?
To launch the user experience of a BAMAZON customer, use your terminal to navigate to the local folder containing `bamazonCustomer.js`. Run the file with the command `node bamazonCustomer.js`. After each transaction, the program will exit. A link to a YouTube video demonstrating this use case may be found below.

## How do I use `bamazonManager.js`?
To launch the user experience of a BAMAZON manager, use your terminal to navigate to the local folder containing `bamazonManager.js`. Run the file with the command `node bamazonManager.js`. After each transaction, the program will exit. A link to a YouTube video demonstrating this use case may be found below. This program will continue running until you select `Exit Program` from the list of options.

## What Node Modules does BAMAZON Use?
LIRI Bot uses the following Node.js modules (and their embedded dependencies):
* dotenv,
* inquirer, and
* mysql.

## What's Next for BAMAZON?
Below are some functionalities I'm hoping to add to BAMAZON in the future:
* Stuff

## How Can I Help with BAMAZON?
If you're interested in helping out with BAMAZON, or if you have ideas for additional functionality, please feel free to contact me through https://eghove.github.io/

