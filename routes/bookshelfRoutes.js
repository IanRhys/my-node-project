// routes/users.js
const express = require('express');
const router = express.Router();

const {
    createTable,
    checkRecordExists,
    insertRecord,
    getBooksFromDB,
    getWalletIDFromDB,
    createNewBook
  } = require("../utils/sqlFunctions");

router.get('/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const walletID = await getWalletIDFromDB(email); // Assuming getWalletID returns a Promise
        const books = await getBooksFromDB(walletID[0].bookWallet); // Assuming getBooks returns a Promise

        // Send a JSON response with the retrieved data
        res.json({ books });
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});
router.post('/createBook', async (req, res)=>{
    console.log("in the router for creating book");
    // const walletID = req.body.walletID;
    // const column = req.body.column;
    // const bookName = req.body.bookName;

    const { walletID, column, bookName } = req.body;
    
    try{
        const newBook = await createNewBook(walletID, column, bookName);
    }
    catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
    
});

module.exports = router;