const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);
const {v4: uuidv4} = require("uuid");

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = ?`;

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;

    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getWalletIDFromDB = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT bookWallet FROM users WHERE email = '${email}'`;
    pool.query(query, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const getBooksFromDB = (walletID) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM bookWallets WHERE walletID = '${walletID}'`;
    pool.query(query, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        if(results.length === 0){
          console.log('No records found for walletID:', walletID);
        }
        resolve(results);
      }
    });
  });
}

const createNewBook = (walletID, column, bookID, bookName, email) => {
  return new Promise((resolve, reject) => {
    const bookQuery = `UPDATE bookWallets SET ${column} = '${bookID}' WHERE walletID = '${walletID}'`;
    pool.query(bookQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const membersID = uuidv4();
    const bookTableQuery = `INSERT INTO books SET bookName = '${bookName}', bookID = '${bookID}'`;
    pool.query(bookTableQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const membersTableQuery = `INSERT INTO members SET bookID = '${bookID}', member1 = '${email}'`;
    pool.query(membersTableQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const scoreID = bookID + email;
    const scoresQuery = `INSERT INTO scores SET scoreID = '${scoreID}', score = '0'`;
    pool.query(scoresQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const getBookName = (bookID) => {
  return new Promise((resolve, reject) => {
    const bookNameQuery = `SELECT bookName FROM books WHERE bookID = '${bookID}'`;
    pool.query(bookNameQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  getBooksFromDB,
  getWalletIDFromDB,
  createNewBook,
  getBookName
};