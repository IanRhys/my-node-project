function loadBookView(){
    getMembers();
    getGames();
}

async function getMembers(){
    const names = document.getElementById("leaderboard");
    const scores = document.getElementById("list-of-scores");
    try{
        const searchParams = new URLSearchParams(window.location.search);
        const bookID = searchParams.get('bookID');
        const res = await fetch('http://localhost:3000/bookViewRoutes/'+ bookID);

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const members = await res.json();

        members.forEach(member => {
            const row = document.createElement("div");
            const name = document.createElement("div");
            const score = document.createElement("div");
            row.className ="row";
            name.className = "name";
            score.className = "score";
            name.innerText = member.name;
            score.innerText = member.score;
            row.append(name);
            row.append(score);
            names.append(row);
        });
        
    }
    catch(error){

    }
}

async function getGames(){

    //get the current week from the current Date
    const currentDate = new Date();
    const weekNumber = getDateWeek();
    const cfbWeekNumber = weekNumber - 34; //week 1 starts in the 35th week of 2024

    //get the bookID from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');

    //payload for the post request
    const payload = {
        bookID: bookID,
        week: cfbWeekNumber
    }

    const res = await fetch('http://localhost:3000/bookViewRoutes/getWeekGames',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const upcomingGames = await res.json();
    console.log("currentGames is ");
    console.log(upcomingGames);
    upcomingGames.forEach(game => {
        const upcomingGamesList = document.getElementById("upcoming-games");
        const upcomingGame = document.createElement("div");

        const upcomingMatchupName = document.createElement("div");
        upcomingGame.className = "upcoming-game";
        upcomingMatchupName.className = "name";
        upcomingMatchupName.innerText = game.matchup;
        upcomingMatchupName.id = game.id;
        upcomingGame.append(upcomingMatchupName);
        upcomingGamesList.append(upcomingGame);
    })
}

async function deleteBook(bookID){

}

async function makePicks(pickID){

}

function getDateWeek(date) {
    const currentDate = 
        (typeof date === 'object') ? date : new Date();
    const januaryFirst = 
        new Date(currentDate.getFullYear(), 0, 1);
    const daysToNextMonday = 
        (januaryFirst.getDay() === 1) ? 0 : 
        (7 - januaryFirst.getDay()) % 7;
    const nextMonday = 
        new Date(currentDate.getFullYear(), 0, 
        januaryFirst.getDate() + daysToNextMonday);
 
    return (currentDate < nextMonday) ? 52 : 
    (currentDate > nextMonday ? Math.ceil(
    (currentDate - nextMonday) / (24 * 3600 * 1000) / 7) : 1);
}

document.getElementById('choose-games-form').addEventListener('submit', async function(event){
    event.preventDefault();
    const week = document.getElementById('choose-week').value;
    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');
    try{
        //window.location.assign('https:/localhost:3000/choose-games?bookID='+ bookID + '?week=' + week);
        window.location.assign('choose-games?bookID=' + bookID + '&week=' + week);
    }
    catch(error){
        alert('Something went wrong');
        console.error('There was a problem with the fetch operation:', error);
    }
});

document.getElementById('add-member-form').addEventListener('submit', async function(event) {
    console.log("should be adding event listener");
    event.preventDefault();
    const email = document.getElementById('new-member-email').value;
    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');
    try{
        console.log("about to add member");
        addMember(bookID, email);
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
    }
    window.location.reload();
});

async function addMember(bookID, email){
    try {
        const res = await fetch('http://localhost:3000/bookshelfRoutes/' + encodeURIComponent(email), {
            method: 'GET'
        });
        console.log("email that was entered into the box");
        console.log(email);
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json(); // Assuming the server responds with JSON
        const bookItem = data.books[0];
        const dataPayload = {
            email: email,
            bookID: bookID,
            joinedBookColumn: null
        }
        if(bookItem.joinedBook1 === null){
            dataPayload.joinedBookColumn = 'joinedBook1';
        }
        else if(bookItem.joinedBook2 === null){
            dataPayload.joinedBookColumn = 'joinedBook2';
        }
        else if(bookItem.joinedBook3 === null){
            dataPayload.joinedBookColumn = 'joinedBook3';
        }
        else if(bookItem.joinedBook4 === null){
            dataPayload.joinedBookColumn = 'joinedBook4';
        }
        else if(bookItem.joinedBook5 === null){
            dataPayload.joinedBookColumn = 'joinedBook5';
        }
        else{
            alert("This user has already joined the maximum number of books allotted.");
        }
        console.log('about to send this through addMember');
        console.log(dataPayload);
        const res2 = await fetch('http://localhost:3000/bookViewRoutes/addMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPayload)
        })

        if (!res2.ok) {
            throw new Error(`HTTP error! Status: ${res2.status}`);
        }
        window.location.replace('http://localhost:3000/bookViewRoutes/' + bookID);
    }
    catch(error){
        
        console.error('There was a problem with the fetch operation:', error);
    }
}