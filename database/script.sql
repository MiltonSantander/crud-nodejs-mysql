/*crear la base de datos*/
CREATE DATABASE db_facturasystem;

/*seleccionar base de datos*/
use db_facturasystem;

/*crear tablas*/
CREATE TABLE client (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    document_number INT(15),
    address VARCHAR(50)
);

CREATE TABLE sales (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sale_number INT(15),
    date VARCHAR(20),
    total_amount_pay INT(20),
    id_client INT(6)
);

CREATE TABLE sales_detail (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    sale_quantity INT(15),
    amount_pay INT(20),
    id_product INT(6),
    id_sales INT(6)
);

CREATE TABLE product (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    barcode VARCHAR(20),
    price INT(50) NOT NULL,
    quantity INT(50),
    id_brand int(6),
    id_type int(6)
);

CREATE TABLE brand (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE type (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE receipt (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    serial_number INT(15) NOT NULL,
    date VARCHAR(20) NOT NULL,
    issuer_name VARCHAR(50) NOT NULL,
    payment_concept VARCHAR(200) NOT NULL,
    amount_received VARCHAR(20) NOT NULL,
    address VARCHAR(50),
    id_sales int(6) NOT NULL
);

CREATE TABLE purchase_order(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    buyer_name VARCHAR(50) NOT NULL,
    seller_name VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    address VARCHAR(50),
    payment_methods VARCHAR(20),
    total_amount_pay INT(15) NOT NULL
);

CREATE TABLE purchase_order_detail(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    quantity INT(50),
    amount_pay INT(15) NOT NULL,
    id_purchase_order int(6),
    id_product int(6)
);