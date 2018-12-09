USE bamazon_DB;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Bird Seed", "Outdoor", 15.99, 156),
("Stuffed Computer Cat Toy", "Pets", 8.97, 239),
("Toilet Paper", "Home", 4.32, 6325),
("Window Cleaner", "Home", 10.25, 212),
("Cat Litter", "Pets", 17.98, 126),
("Nature Valley Protein Bars", "Grocery", 4.99, 67),
("Charcoal", "Outdoor", 22.00, 17),
("Bananas", "Grocery", 0.79, 56),
("Greek Yogurt", "Grocery", 0.90, 125),
("Novelty Cat T-Shirt", "Clothing", 11.99, 56);

SELECT * FROM products;

