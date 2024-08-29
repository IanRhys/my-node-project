function getAllConferenceGames(){
    getGames('ACC');
    getGames('SEC');
    getGames('B12');
    getGames('B1G');
    getGames('PAC');
    getGames('CUSA');
    getGames('MAC');
    getGames('MWC');
    getGames('Ind');
    getGames('SBC');
    getGames('AAC');
}

async function getGames(conferenceAbbreviation){
    const list = document.getElementById(conferenceAbbreviation);
    const baseURL = 'http://localhost:3000/getGames/';

    const searchParams = new URLSearchParams(window.location.search);
    const week = searchParams.get('week');
    const payload = {
        week: week,
        conference: conferenceAbbreviation
    }
    const res = await fetch(baseURL,  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    const data = await res.json();
    const homeTeams = [];
    const awayTeams = [];
    const teamMatchups = [];
    for(var i = 0; i < data.length; i++){
        homeTeams[i] = data[i].homeTeam;
        awayTeams[i] = data[i].awayTeam;
        teamMatchups[i] = data[i].homeTeam + ' vs. ' + data[i].awayTeam;
    }
    for(i = 0; i < teamMatchups.length; i++){
        let button = document.createElement('button');
        button.innerText = teamMatchups[i]; //display the matchup to the user
        button.className = 'button';
        button.data = conferenceAbbreviation; //store the conference abbreviation to return the button to its original spot if it becomes deselected
        button.style["display"] = "block";
        button.style["font-size"] = "20px";
        button.style["border"] = "3px solid hsl(44, 33%, 50%)";
        button.style["border-radius"] = "5px";
        button.style["margin-bottom"] = "3px";
        button.id = data[i].id; //store the id of the game to save to the database if it is chosen
        button.addEventListener('click', function(e) {
            e.preventDefault();
        })
        button.onclick = selectGame;
        list.appendChild(button);
    }
}

function deselectGame(){
    this.onclick = selectGame;
    document.getElementById(this.data).appendChild(this);
}

function selectGame(){
    let listOfGames = document.getElementById('chosen-games-list').getElementsByTagName('button');
    if(listOfGames.length < 15){
        this.onclick = deselectGame;
        console.log(this.id);
        document.getElementById('chosen-games-list').appendChild(this); 
    }
    else{
        alert("15 is the maximum number of games alotted.");
    }
}


document.getElementById('chosen-games').addEventListener('submit', async function(e){
    e.preventDefault();
    let listOfGames = document.getElementById('chosen-games-list').getElementsByTagName('button');
    if(listOfGames.length < 5){
        alert("Please select at least 5 games.");
        return;
    }
    
    console.log(listOfGames);
    let gamesArray = [];
    for(i = 0; i < listOfGames.length; i++){
        gamesArray.push(listOfGames[i].id);
    }
    console.log(gamesArray);
    for(i = 0; i < gamesArray.length; i++){
        console.log(gamesArray[i]);
    }

    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');
    const week = searchParams.get('week');
    const payload = {
        bookID: bookID,
        week: week,
        ids: gamesArray
    }

    res = await fetch('http://localhost:3000/chooseGamesRoutes/saveChosenGamesToDB', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        return response.json();
    })
    .then(result => {
        window.location.replace('/book-view?bookID=' + bookID);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})