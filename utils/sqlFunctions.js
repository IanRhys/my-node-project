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

const getBooksFromDB = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM bookWallets WHERE email = '${email}'`;
    pool.query(query, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        if(results.length === 0){
          console.log('No records found for email:', email);
        }
        resolve(results);
      }
    });
  });
}

const createNewBook = (email, column, bookID, bookName) => {
  return new Promise((resolve, reject) => {
    const bookQuery = `UPDATE bookWallets SET ${column} = '${bookID}' WHERE email = '${email}'`;
    pool.query(bookQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const membersID = uuidv4();
    const bookTableQuery = `INSERT INTO books SET bookName = '${bookName}', bookID = '${bookID}', owner = '${email}'`;
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

const getBookMembers = (bookID) => {
  console.log("getting book members from sql");
  return new Promise((resolve, reject) => {
    const bookMembersQuery = `SELECT * FROM members WHERE bookID = '${bookID}'`;
    pool.query(bookMembersQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

const getScore = (scoreID) => {
  return new Promise((resolve, reject) => {
    const scoreQuery = `SELECT score FROM scores WHERE scoreID = '${scoreID}'`;
    pool.query(scoreQuery, (err, results)=>{
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

const getMemberName = (email) => {
  return new Promise((resolve, reject) => {
    const memberNameQuery = `SELECT username FROM users WHERE email = '${email}'`;
    pool.query(memberNameQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

const addMember = (bookID, email, joinedBookColumn, memberNumber) => {
  return new Promise((resolve, reject) => {
    const bookWalletQuery = `UPDATE bookWallets SET ${joinedBookColumn} = '${bookID}' WHERE email = '${email}'`;
    pool.query(bookWalletQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const bookMemberQuery = `UPDATE members SET ${memberNumber} = '${email}' WHERE bookID = '${bookID}'`;
    pool.query(bookMemberQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
    const scoreID = bookID + email;
    const bookScoreQuery = `INSERT INTO scores SET scoreID = '${scoreID}', score = 0`;
    pool.query(bookScoreQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

const createNewGamesRow = (key)=>{
  return new Promise((resolve, reject) => {
    const saveChosenGameQuery = `INSERT INTO games SET gamesID = '${key}'`;
    pool.query(saveChosenGameQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

const saveChosenGameToDB = (key, gameID, column)=>{
  return new Promise((resolve, reject) => {
    const saveChosenGameQuery = `UPDATE games SET ${column} = '${gameID}' WHERE gamesID = '${key}'`;
    pool.query(saveChosenGameQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

const saveGameInfoToDB = (bookID, gameID, matchup, line)=>{
  return new Promise((resolve, reject) => {
    const saveGameInfoQuery = `INSERT INTO gameInfos SET gameInfoID = '${bookID + gameID}', matchup = '${matchup}', line = '${line}', score = 'UNAVAILABLE'`;
    pool.query(saveGameInfoQuery, (err, results)=>{
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });  
}

const getWeekGames = (bookID, week) => {
  return new Promise((resolve, reject) => {
    const gamesID = bookID + week;
    const getWeekGamesQuery = `SELECT * FROM games WHERE gamesID = '${gamesID}'`;
    pool.query(getWeekGamesQuery, (err, results)=>{
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
  createNewBook,
  getBookName,
  getBookMembers,
  getScore,
  getMemberName,
  addMember,
  createNewGamesRow,
  saveChosenGameToDB,
  getWeekGames,
  saveGameInfoToDB
};