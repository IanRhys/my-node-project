// routes/users.js
const express = require('express');
const router = express.Router();
const {v4: uuidv4} = require('uuid');
const bookSchema = require("../schemas/bookSchema");
const membersSchema = require("../schemas/membersSchema");
const scoresSchema = require("../schemas/scoresSchema")

const {
    createTable,
    checkRecordExists,
    insertRecord,
    getBooksFromDB,
    getWalletIDFromDB,
    createNewBook,
    getBookName
  } = require("../utils/sqlFunctions");

router.get('/:email', async (req, res) => {
    try {
        const books = await getBooksFromDB(req.params.email); // Assuming getBooks returns a Promise

        // Send a JSON response with the retrieved data
        res.json({ books });
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});
router.get('/getBookName/:bookID', async (req, res)=>{
    try{
        const bookName = await getBookName(req.params.bookID);
        res.json({ bookName });
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

router.post('/createBook', async (req, res)=>{
    const { email, column, bookName} = req.body;
    const bookID = uuidv4();
    try{
        await createTable(bookSchema);
        await createTable(membersSchema);
        await createTable(scoresSchema);
        await createNewBook(email, column, bookID, bookName);
    }
    catch (error) {
        // Handle any errors that might occur
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
    
});

module.exports = router;