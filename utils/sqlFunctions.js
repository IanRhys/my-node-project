const mysql = require("mysql");
const config = require("../db/config");
const pool = mysql.createPool(config);

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

const createNewBook = (walletID, column, bookName) => {
  return new Promise((resolve, reject) => {
    console.log("attempting to createNewBook");
    const query = `UPDATE bookWallets SET ${column} = '${bookName}' WHERE walletID = '${walletID}'`;
    pool.query(query, (err, results)=>{
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
  createNewBook
};