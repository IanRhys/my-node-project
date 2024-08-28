const express = require('express');
const chosenGamesSchema = require('../schemas/chosenGamesSchema');
const router = express.Router();

const {
    createTable,
    createNewGamesRow,
    saveChosenGameToDB
} = require('../utils/sqlFunctions');

router.post('/saveChosenGamesToDB', async (req, res)=> {
    const gameIDs = req.body.ids;
    const week = req.body.week;
    const bookID = req.body.bookID;
    console.log(bookID);
    console.log(week);
    console.log(gameIDs);

    const key = bookID+week;
    try{
        await createTable(chosenGamesSchema);
        await createNewGamesRow(key);
        for(i = 0; i < gameIDs.length; i++){
            const column = "game" + (i+1);
            console.log(column);
            console.log(gameIDs[i]);
            await saveChosenGameToDB(key, gameIDs[i], column);
        }
        res.status(201).json({ message: 'Games chosen successfully'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }

})

module.exports = router;