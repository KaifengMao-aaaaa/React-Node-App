export const INSERT = {

}

export const CREATEALLABLE = 
`CREATE TABLE clients (
  ID INT  PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255)

);
CREATE TABLE users (
  ID INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255),
  time date
);
CREATE TABLE products (
  ID INT PRIMARY KEY,
  category varchar(255),
  name VARCHAR(255),
  description VARCHAR(255)
);
CREATE TABLE orders (
  ID INT PRIMARY KEY,
  time date,
  deadlingTime date,
  description VARCHAR(255),
  material JSON,
  creatorID INT,
  productID INT,
  FOREIGN KEY (creatorID) REFERENCES users(ID),
  FOREIGN KEY (productID) REFERENCES products(ID)  
);
CREATE TABLE store (
  materialName VARCHAR(255) PRIMARY KEY,
  consuming INT,
  remaining INT,
  time date
);
CREATE TABLE record (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255),
  time date,
  storeId INT,
  changing DECIMAL(10, 2),
  remaining DECIMAL(10, 2)
);
CREATE TABLE action_record (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255),
  time date,
  userId int,
  FOREIGN KEY (userId) REFERENCES users(ID)
);
CREATE TABLE machines (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  available boolean,
  deadline date,
  orderId int,
  FOREIGN KEY (orderId) REFERENCES orders(ID)
);
CREATE TABLE tokens (
  token VARCHAR(255) PRIMARY KEY,
  valid boolean,
  userId int,
  time date,
  FOREIGN KEY (userId) REFERENCES users(ID)
);`
export const DROPALLTABLE =
`DROP TABLE tokens;
DROP TABLE machines; 
DROP TABLE action_record; 
DROP TABLE record;
DROP TABLE store;
DROP TABLE orders;
DROP TABLE products;
DROP TABLE users;
DROP TABLE clients;`