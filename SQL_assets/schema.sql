CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255),
department_name VARCHAR(100),
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(11) DEFAULT 0,
PRIMARY KEY (item_id)
);

