const mysql = require("mysql2");
const config = require("./config");

const connectDB = async () => {
  try{
    const pool = mysql.createPool(config);

    pool.getConnection((err, connection) => {
      if (err) {
        console.log({ error: err.message });
      }

      console.log("Connected to MySQL database");
      connection.release();
    });
  }
  catch(error){
    console.log(error.message);
  }
};

module.exports = connectDB;