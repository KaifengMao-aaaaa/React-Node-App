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
  productName VARCHAR(255) UNIQUE,
  description VARCHAR(255),
  unitPrice INT,
  unit VARCHAR(255),
  remaining INT,
  materials JSON
);
CREATE TABLE orders (
  ID INT PRIMARY KEY,
  time date,
  deadlineTime date,
  description VARCHAR(255),
  products JSON,
  creatorID INT,
  client VARCHAR(255),
  status VARCHAR(255),
  orderPrice INT,
  FOREIGN KEY (creatorID) REFERENCES users(ID)
);
CREATE TABLE store (
  materialName VARCHAR(255) PRIMARY KEY,
  consuming INT,
  remaining INT,
  unit VARCHAR(255),
  unitPrice INT,
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
  userId int,
  time DATETIME,
  expirationTime DATETIME,
  FOREIGN KEY (userId) REFERENCES users(ID)
);
CREATE TABLE storeTimeStamp (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  time date,
  alteration int,
  type VARCHAR(255),
  staffId INT,
  description VARCHAR(255)
);
CREATE TABLE productTimeStamp (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  time date,
  alteration int,
  type VARCHAR(255),
  staffId INT,
  description VARCHAR(255)
);
CREATE TABLE OrderTimeStamp (
  ID INT AUTO_INCREMENT PRIMARY KEY,
  time date,
  client VARCHAR(255),
  staffId INT,
  description VARCHAR(255),
  orderId INT
);
CREATE TABLE VerficationCode (
  code INT PRIMARY KEY,
  time date,
  type VARCHAR(255) 
)
`
export const DROPALLTABLE =
`DROP TABLE VerficationCode;
DROP TABLE tokens;
DROP TABLE machines; 
DROP TABLE action_record; 
DROP TABLE record;
DROP TABLE store;
DROP TABLE orders;
DROP TABLE products;
DROP TABLE users;
DROP TABLE clients;
DROP TABLE storeTimeStamp;
DROP TABLE productTimeStamp;
DROP TABLE OrderTimeStamp;`