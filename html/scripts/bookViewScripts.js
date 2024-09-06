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
        const email = getEmailFromJWT(); //to check if user is the owner of the book

        const members = await res.json();

        members.forEach(member => { 
            //displays the admin buttons to the owner of the book
            if(member.email == email && member.owner){
                document.getElementById("add-member-button").style.display = "inline-block";
                document.getElementById("choose-games-button").style.display = "inline-block";
                document.getElementById("delete-book-button").style.display = "inline-block";
            }
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
        console.error(error);
    }
}

async function getGames(){

    //get the current week from the current Date
    const currentDate = new Date();
    const weekNumber = getDateWeek(currentDate);
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
    upcomingGames.forEach(game => {
        const upcomingGamesList = document.getElementById("upcoming-games");
        const upcomingGame = document.createElement("li");

        const upcomingMatchupName = document.createElement("div");
        upcomingGame.className = "upcoming-game-row";
        upcomingMatchupName.className = "name";
        upcomingMatchupName.innerText = game.matchup;
        upcomingMatchupName.id = game.id;
        upcomingGame.append(upcomingMatchupName);
        upcomingGamesList.append(upcomingGame);
    })
}

async function deleteBook(bookID){

}

let picksArray = []; //global array to track picks
let index = 0;
async function openMakePicksPopup(){
    console.log("opening make picks popup");
    await updatePicksPopup(index);
    document.getElementById("make-picks").style.display = "block";
}

function openConfirmPicksPopup(){
    picksArray.forEach(pickItem => {
        const pickInfo = document.createElement("div");
        const matchup = document.createElement("div");
        const line = document.createElement("div");
        const pick = document.createElement("div");

        matchup.innerText = pickItem.matchup;
        line.innerText = pickItem.favorite + " (-" + pickItem.line + ")";
        switch(pickItem.pick){
            case 0:
                pick.innerText = pickItem.favorite + " Cover";
                break;
            case 1:
                pick.innerText = pickItem.underdog + " Cover";
                break;

            case 2:
                pick.innerText = pickItem.underdog + " Outright";
                break;
        }

        pickInfo.appendChild(matchup);
        pickInfo.appendChild(line);
        pickInfo.appendChild(pick);

        document.getElementById("confirm-picks-list").appendChild(pickInfo);
    })
    closePicksForm();
    document.getElementById("confirm-picks").style.display = "block";
}

async function updatePicksPopup(index){


    console.log("updating picks popup");

    const upcomingGamesList = document.getElementById("upcoming-games").getElementsByTagName("div");

    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');

    try {
        const res = await fetch('http://localhost:3000/bookViewRoutes/getGameInfo/'+ bookID + upcomingGamesList[index].id);

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const gameInfo = await res.json();
        console.log(gameInfo.matchup);

        const matchupHeader = document.getElementById("picks-matchup");
        const lineHeader = document.getElementById("picks-line");
        matchupHeader.innerText = gameInfo.matchup;
        lineHeader.innerText = gameInfo.favorite + " (-" + gameInfo.line + ")";
        document.getElementById("favorite-cover").setAttribute("data-gameID", upcomingGamesList[index].id);
        document.getElementById("favorite-cover").setAttribute("data-matchup", gameInfo.matchup);
        document.getElementById("favorite-cover").setAttribute("data-favorite", gameInfo.favorite);
        document.getElementById("favorite-cover").setAttribute("data-underdog", gameInfo.underdog);
        document.getElementById("favorite-cover").setAttribute("data-line", gameInfo.line);

        document.getElementById("underdog-cover").setAttribute("data-gameID", upcomingGamesList[index].id);
        document.getElementById("underdog-cover").setAttribute("data-matchup", gameInfo.matchup);
        document.getElementById("underdog-cover").setAttribute("data-favorite", gameInfo.favorite);
        document.getElementById("underdog-cover").setAttribute("data-underdog", gameInfo.underdog);
        document.getElementById("underdog-cover").setAttribute("data-line", gameInfo.line);

        document.getElementById("underdog-outright").setAttribute("data-gameID", upcomingGamesList[index].id);
        document.getElementById("underdog-outright").setAttribute("data-matchup", gameInfo.matchup);
        document.getElementById("underdog-outright").setAttribute("data-favorite", gameInfo.favorite);
        document.getElementById("underdog-outright").setAttribute("data-underdog", gameInfo.underdog);
        document.getElementById("underdog-outright").setAttribute("data-line", gameInfo.line);

    }
    catch(error){
        console.error(error);
    }
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

function openAddMemberForm() {
    closeForm();
    document.getElementById("add-member").style.display = "block";
}
function openChooseGamesForm(){
    closeForm();
    console.log("in choose games orm");
    document.getElementById("choose-games").style.display = "block";
}
function closeForm() {
    document.getElementById("add-member").style.display = "none";
    document.getElementById("choose-games").style.display = "none";
    document.getElementById("confirm-picks").style.display = "none";
    
    index = 0;
    picksArray.length = 0; //clears the picksArray to get new info
    document.getElementById("confirm-picks-list").replaceChildren();
    closePicksForm();
}
function closePicksForm(){
    document.getElementById("make-picks").style.display = "none";
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
        addMember(bookID, email).then(() => {
            window.location.reload();
        });
        console.log("Member added successfully");
        // Perform any action after successful completion
        //window.location.reload(); // Reload the page or perform another action
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
        return;
    }
});

document.getElementById('confirm-picks-form').addEventListener('submit', async function(event){
    event.preventDefault();

    picksToDB = [];

    picksArray.forEach(pickInfo => {

        const searchParams = new URLSearchParams(window.location.search);
        const bookID = searchParams.get('bookID');
        const gameID = pickInfo.gameID;
        const email = getEmailFromJWT();
        const pickID = bookID + gameID + email;
        const pickObject = {
            pickID: pickID,
            pick: pickInfo.pick
        }

        picksToDB.push(pickObject);
    })

    const payload = {
        picks: picksToDB
    }

    try{    
        await fetch("http://localhost:3000/bookViewRoutes/savePicksToDB", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
    }
    catch(error){
        console.error();
    }
    console.log(picksToDB);
})

async function addMember(bookID, email){

    console.log("attempting to add member");
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
        return Promise.resolve();
    }
    catch(error){
        console.error('There was a problem with the fetch operation:', error);
        return Promise.reject(error);
    }
}

// async function loadPicksTable(){
//     console.log("in loadPciksTable");
//     const picksTable = document.getElementById("make-picks-table");
//     const currentGames = document.getElementById("upcoming-games").getElementsByTagName("div");
    
//     const currentGamesArray = [];

//     //get the current week from the current Date for use in the betting line query
//     const currentDate = new Date();
//     const weekNumber = getDateWeek(currentDate);
//     const cfbWeekNumber = weekNumber - 34; //week 1 starts in the 35th week of 2024

//     for(i = 0; i < currentGames.length; i++){
//         console.log("i is ", i);
//         const matchupStringArray = currentGames[i].innerText.split(' ');
//         const homeTeam = matchupStringArray[0];
//         console.log('home team is ', homeTeam);

//         gameObject = {
//             id: currentGames[i].id,
//             matchup: currentGames[i].innerText,
//             line: 0
//         }
//         console.log(gameObject);
//         currentGamesArray.push(gameObject);
//     }
//     console.log(currentGamesArray);
//     currentGamesArray.forEach(game =>{
//         console.log("game name is ", game.matchup);
//         console.log("game id is ", game.id);

//         const row = document.createElement("div");
//         row.className = "picks-row";

//         const matchup = document.createElement("div");
//         matchup.innerText = game.matchup;

//         //buttons to be used for making picks
//         const coverButton = document.createElement("button");
//         const noCoverButton = document.createElement("button");
//         const outrightWinButton = document.createElement("button");
//         coverButton.id = game.id;
//         noCoverButton.id = game.id;
//         outrightWinButton.id = game.id;

//         coverButton.innerText = "Cover";
//         noCoverButton.innerText = "Won't Cover";
//         outrightWinButton.innerText = "Underdog Win";
//         coverButton.className = "picks-button";
//         noCoverButton.className = "picks-button";
//         outrightWinButton.className = "picks-button";

//         row.appendChild(matchup);
//         row.appendChild(coverButton);
//         row.appendChild(noCoverButton);
//         row.appendChild(outrightWinButton);

//         picksTable.appendChild(row);
//     })

     
// }


//using the JWT stored in the cookie, get the email
//to be used as a Primary Key for database queries



function getEmailFromJWT(){
    const token = readCookie('access_token', document.cookie);
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload.email;
}

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

document.getElementById("favorite-cover").addEventListener("click", (e) => {
    e.preventDefault();
    picksArray[index] = {
        gameID: document.getElementById("favorite-cover").getAttribute("data-gameID"),
        matchup: document.getElementById("favorite-cover").getAttribute("data-matchup"),
        favorite: document.getElementById("favorite-cover").getAttribute("data-favorite"),
        underdog: document.getElementById("favorite-cover").getAttribute("data-underdog"),
        line: document.getElementById("favorite-cover").getAttribute("data-line"),
        pick: 0
    }
    const upcomingGamesList = document.getElementById("upcoming-games").getElementsByTagName("div");
    index++;
    if(index < upcomingGamesList.length){
        updatePicksPopup(index);
    }
    else{
        openConfirmPicksPopup();
    }
})

document.getElementById("underdog-cover").addEventListener("click", (e) => {
    e.preventDefault();
    picksArray[index] = {
        gameID: document.getElementById("underdog-cover").getAttribute("data-gameID"),
        matchup: document.getElementById("underdog-cover").getAttribute("data-matchup"),
        favorite: document.getElementById("underdog-cover").getAttribute("data-favorite"),
        underdog: document.getElementById("underdog-cover").getAttribute("data-underdog"),
        line: document.getElementById("underdog-cover").getAttribute("data-line"),
        pick: 1 //1 is representative of the "underdog cover" option
    }
    const upcomingGamesList = document.getElementById("upcoming-games").getElementsByTagName("div");

    index++;
    if(index < upcomingGamesList.length){
        updatePicksPopup(index);
    }
    else{
        openConfirmPicksPopup();
    }
})

document.getElementById("underdog-outright").addEventListener("click", (e) => {
    e.preventDefault();
    picksArray[index] = {
        gameID: document.getElementById("underdog-outright").getAttribute("data-gameID"),
        matchup: document.getElementById("underdog-outright").getAttribute("data-matchup"),
        favorite: document.getElementById("underdog-outright").getAttribute("data-favorite"),
        underdog: document.getElementById("underdog-outright").getAttribute("data-underdog"),
        line: document.getElementById("underdog-outright").getAttribute("data-line"),
        pick: 2 //2 is representative of the "underdog-outright" option
    }

    const upcomingGamesList = document.getElementById("upcoming-games").getElementsByTagName("div");

    index++;

    if(index < upcomingGamesList.length){
        updatePicksPopup(index);
    }
    else{
        openConfirmPicksPopup();
    }
})