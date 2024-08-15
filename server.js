// server.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connectDB = require("./db/db");
const port = 3000;
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

//function that verifies that a user has logged in before allowing access to 
//web pages that need account information, user will be redirected to the log in 
//page if not logged in
const verifyToken = (req, res, next) => {
  const token = readCookie('access_token', req.headers.cookie);

 if (!token) {
  res.redirect('/');
  return;
  }
 jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
  res.redirect('/');
  return;
  }
 req.user = decoded;
  next();
  });
 };


// Include route files
const getGamesRoute = require('./routes/getGames');
const productsRoute = require('./routes/products');
const authRoutes = require('./routes/authRoutes');
const bookshelfRoute = require('./routes/bookshelfRoutes');

// Use routes
app.use('/getGames', getGamesRoute);
app.use('/bookshelfRoutes', bookshelfRoute);
app.use('/products', productsRoute);
app.use("/", authRoutes);
app.use(express.static('html'));

//sends pages for each URL ending
app.get('/choose-games', (req, res) => {
    res.sendFile(path.join(__dirname, '/html/choose-games.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/html/sign-up.html'));
});
app.get('/bookshelf', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '/html/home.html'));
});
app.get('/book-view', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '/html/book-view.html'));
});
app.get('/make-picks', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '/html/book-view.html'));
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function readCookie(name, cookieString) {
	var nameEQ = name + "=";
	var ca = cookieString.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}