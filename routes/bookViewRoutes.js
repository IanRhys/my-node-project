const express = require('express');
const router = express.Router();

const { getBookMembers,
    getScore,
    getMemberName,
    addMember,
    getWeekGames
 } = require("../utils/sqlFunctions");

router.get("/:bookID", async (req, res) =>{
    try{
        const bookID = req.params.bookID;
        const members = await getBookMembers(bookID);
        const membersArray = [];
        if(members[0].member1 != null){
            const memberScore = await getScore(bookID+members[0].member1);
            const memberName = await getMemberName(members[0].member1);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member1, owner: true};
            membersArray.push(member);
        }
        if(members[0].member2 != null){
            const memberScore = await getScore(bookID+members[0].member2);
            const memberName = await getMemberName(members[0].member2);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member2, owner: false};
            membersArray.push(member);
        }
        if(members[0].member3 != null){
            const memberScore = await getScore(bookID+members[0].member3);
            const memberName = await getMemberName(members[0].member3);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member3, owner: false};
            membersArray.push(member);
        }
        if(members[0].member4 != null){
            const memberScore = await getScore(bookID+members[0].member4);
            const memberName = await getMemberName(members[0].member4);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member4, owner: false};
            membersArray.push(member);
        }
        if(members[0].member5 != null){
            const memberScore = await getScore(bookID+members[0].member5);
            const memberName = await getMemberName(members[0].member5);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member5, owner: false};
            membersArray.push(member);
        }
        if(members[0].member6 != null){
            const memberScore = await getScore(bookID+members[0].member6);
            const memberName = await getMemberName(members[0].member6);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member6, owner: false};
            membersArray.push(member);
        }
        if(members[0].member7 != null){
            const memberScore = await getScore(bookID+members[0].member7);
            const memberName = await getMemberName(members[0].member7);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member7, owner: false};
            membersArray.push(member);
        }
        if(members[0].member8 != null){
            const memberScore = await getScore(bookID+members[0].member8);
            const memberName = await getMemberName(members[0].member8);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member8, owner: false};
            membersArray.push(member);
        }
        if(members[0].member9 != null){
            const memberScore = await getScore(bookID+members[0].member9);
            const memberName = await getMemberName(members[0].member9);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member9, owner: false};
            membersArray.push(member);
        }
        if(members[0].member10 != null){
            const memberScore = await getScore(bookID+members[0].member10);
            const memberName = await getMemberName(members[0].member10);
            const member = {name: memberName[0].username, score: memberScore[0].score, email: members[0].member10, owner: false};
            membersArray.push(member);
        }

        //should sort the array of members from highest to lowest score before being sent to frontend
        function compare(a,b) {return b.score - a.score}
        membersArray.sort(compare);

        res.json(membersArray);
    }
    catch (error){

    }
}
);

router.post("/addMember", async (req, res) =>{
    console.log('bookID from the router');
    const { email, bookID, joinedBookColumn} = req.body;
    console.log(email);
    console.log(bookID);
    console.log(joinedBookColumn);
    let memberNumber;
    try{
        members = await getBookMembers(bookID);
        if(members[0].member2 == null){
            memberNumber = 'member2';
        }
        else if(members[0].member3 == null){
            memberNumber = 'member3';
        }
        else if(members[0].member4 == null){
            memberNumber = 'member4';
        }
        else if(members[0].member5 == null){
            memberNumber = 'member5';
        }
        else if(members[0].member6 == null){
            memberNumber = 'member6';
        }
        else if(members[0].member7 == null){
            memberNumber = 'member7';
        }
        else if(members[0].member8 == null){
            memberNumber = 'member8';
        }
        else if(members[0].member9 == null){
            memberNumber = 'member9';
        }
        else if(members[0].member10 == null){
            memberNumber = 'member10';
        }
        else{
            throw error;
        }
    }
    catch(error){
        console.error(error);
        response.status(500).json({ error: 'An error occurred while checking for member spots' });
        return;
    }
    try{
        await addMember(bookID, email, joinedBookColumn, memberNumber);
    }
    catch(error){
        console.error(error);
        response.status(500).json({ error: 'An error occurred while adding member' });
    }
});

router.post("/getWeekGames", async (req, res) => {
    console.log("in the getWeekGames");
    const gameIDArray = [];
    const bookID = req.body.bookID;
    const week = req.body.week;
    try{
        response = await getWeekGames(bookID, week);
        if(response[0].game1 != null){
            gameIDArray.push(response[0].game1);
        }
        if(response[0].game2 != null){
            gameIDArray.push(response[0].game2);
        }
        if(response[0].game3 != null){
            gameIDArray.push(response[0].game3);
        }
        if(response[0].game4 != null){
            gameIDArray.push(response[0].game4);
        }
        if(response[0].game5 != null){
            gameIDArray.push(response[0].game5);
        }
        if(response[0].game6 != null){
            gameIDArray.push(response[0].game6);
        }
        if(response[0].game7 != null){
            gameIDArray.push(response[0].game7);
        }
        if(response[0].game8 != null){
            gameIDArray.push(response[0].game8);
        }
        if(response[0].game9 != null){
            gameIDArray.push(response[0].game9);
        }
        if(response[0].game10 != null){
            gameIDArray.push(response[0].game10);
        }
        if(response[0].game11 != null){
            gameIDArray.push(response[0].game11);
        }
        if(response[0].game12 != null){
            gameIDArray.push(response[0].game12);
        }
        if(response[0].game13 != null){
            gameIDArray.push(response[0].game13);
        }
        if(response[0].game14 != null){
            gameIDArray.push(response[0].game14);
        }
        if(response[0].game15 != null){
            gameIDArray.push(response[0].game15);
        }  
    }
    catch(error){
        console.error(error);
    }

    



    const gamesArray = []; //array to hold objects containing the gameID and matchup

    const promises = gameIDArray.map(gameID => {
        console.log(gameID);
        var cfb = require('cfb.js');
        var defaultClient = cfb.ApiClient.instance;
    
        // Configure API key authorization: ApiKeyAuth
        var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
        ApiKeyAuth.apiKey = "Bearer uUROuvdrdvQZVcrWw7i4V9/p3QfWJFiZYPLDDG5VpJ3+PWikQi+Y9uBOWNMYyQcS";
    
        var apiInstance = new cfb.GamesApi();

        const year = 2024;
    
        const opts = {
            id: gameID
        }
        return apiInstance.getGames(year, opts).then(data => {
            const matchup = data[0].homeTeam + ' vs. ' + data[0].awayTeam;
            const gameObject = {
                id: gameID,
                matchup: matchup
            }
            gamesArray.push(gameObject);
            console.log(gameObject);
        }, function(error) {
            console.error(error);
        });
    })
 
    await Promise.all(promises); //waits for all API calls to finish before proceeding

    res.json(gamesArray);
})

module.exports = router;