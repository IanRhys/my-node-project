const express = require('express');
const router = express.Router();

const { getBookMembers,
    getScore,
    getMemberName,
    addMember
 } = require("../utils/sqlFunctions");

router.get("/:bookID", async (req, res) =>{
    try{
        const bookID = req.params.bookID;
        const members = await getBookMembers(bookID);
        const membersArray = [];
        if(members[0].member1 != null){
            const memberScore = await getScore(bookID+members[0].member1);
            const memberName = await getMemberName(members[0].member1);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member2 != null){
            const memberScore = await getScore(bookID+members[0].member2);
            const memberName = await getMemberName(members[0].member2);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member3 != null){
            const memberScore = await getScore(bookID+members[0].member3);
            const memberName = await getMemberName(members[0].member3);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member4 != null){
            const memberScore = await getScore(bookID+members[0].member4);
            const memberName = await getMemberName(members[0].member4);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member5 != null){
            const memberScore = await getScore(bookID+members[0].member5);
            const memberName = await getMemberName(members[0].member5);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member6 != null){
            const memberScore = await getScore(bookID+members[0].member6);
            const memberName = await getMemberName(members[0].member6);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member7 != null){
            const memberScore = await getScore(bookID+members[0].member7);
            const memberName = await getMemberName(members[0].member7);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member8 != null){
            const memberScore = await getScore(bookID+members[0].member8);
            const memberName = await getMemberName(members[0].member8);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member9 != null){
            const memberScore = await getScore(bookID+members[0].member9);
            const memberName = await getMemberName(members[0].member9);
            const member = {name: memberName[0].username, score: memberScore[0].score};
            membersArray.push(member);
        }
        if(members[0].member10 != null){
            const memberScore = await getScore(bookID+members[0].member10);
            const memberName = await getMemberName(members[0].member10);
            const member = {name: memberName[0].username, score: memberScore[0].score};
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
        res.status(500).json({ error: 'An error occurred while checking for member spots' });
        return;
    }
    try{
        await addMember(bookID, email, joinedBookColumn, memberNumber);
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occurred while adding member' });
    }
});
module.exports = router;