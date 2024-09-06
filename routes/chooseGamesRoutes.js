const express = require('express');
const chosenGamesSchema = require('../schemas/chosenGamesSchema');
const gameInfoSchema = require('../schemas/gameInfoSchema');
const router = express.Router();

const {
    createTable,
    createNewGamesRow,
    saveChosenGameToDB,
    saveGameInfoToDB
} = require('../utils/sqlFunctions');

router.post('/saveChosenGamesToDB', async (req, res)=> {
    const gameIDs = req.body.ids;
    const week = req.body.week;
    const bookID = req.body.bookID;
    const lines = req.body.lines;
    const matchups = req.body.matchups;
    const favorites = req.body.favorites;
    const underdogs = req.body.underdogs;

    const key = bookID+week;
    try{
        await createTable(chosenGamesSchema);
        await createTable(gameInfoSchema);
        await createNewGamesRow(key);
        for(i = 0; i < gameIDs.length; i++){
            const column = "game" + (i+1);
            console.log(column);
            console.log(gameIDs[i]);
            await saveChosenGameToDB(key, gameIDs[i], column);
            await saveGameInfoToDB(bookID, gameIDs[i], matchups[i], favorites[i], underdogs[i], lines[i]);
        }
        res.status(201).json({ message: 'Games chosen successfully'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }

})

module.exports = router;