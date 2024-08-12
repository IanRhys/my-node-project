// server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectDB = require("./db/db");
const port = process.env.PORT||3000;
const mysql = require('mysql');
const path = require('path');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

const allowedOrigins = ['file:///C:/Users/ianrh/Desktop/CFBBetBook/backend/my-node-project/html/choose-games.html'];
app.use(cors({
  origin: function(origin, callback){
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Ian1029457!',
//     database: "cfb"
// });


// Include route files
const getGamesRoute = require('./routes/getGames');
const productsRoute = require('./routes/products');
const authRoutes = require('./routes/authRoutes');

// Use routes
app.use('/getGames', getGamesRoute);
app.use('products', productsRoute);
app.use("/", authRoutes);
app.use(express.static('html'));

app.get('/', (req, res) => {
    res.send('<h1> Hello, Express.js Server!</h1>');
});

app.get('/getGames', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/choose-games.html'));
});

// connection.connect(error => {
//     if (error){
//         console.log("A error has been occurred "
//             + "while connecting to database.");        
//         throw error;
//     }
//     app.listen(port, () => {
//         console.log(`Server is running on port ${port}`);
//     }) 
// });