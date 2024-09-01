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
        button.value = homeTeams[i] + '$' + awayTeams[i]; //store the names of each team, separated by a character that would never be in a team name
        button.style["display"] = "block";
        button.style["font-size"] = "20px";
        button.style["border"] = "3px solid hsl(44, 33%, 50%)";
        button.style["border-radius"] = "5px";
        button.style["margin-bottom"] = "3px";
        button.id = data[i].id; //store the id of the game to save to the database if it is chosen
        button.addEventListener('click', function(e) {
            e.preventDefault();
        })
        console.log('HomeTeams[i] is ', homeTeams[i]);

        button.onclick = openSetLineForm;
        list.appendChild(button);
    }
}

function deselectGame(){
    const teamsArray = this.value.split('$');
    this.innerText = teamsArray[0] + " vs. " + teamsArray[1];

    this.onclick = openSetLineForm;
    document.getElementById(this.data).appendChild(this);
}

function selectGame(){
    const gameID = document.getElementById('game-id-holder').getAttribute("data-gameID");
    const button = document.getElementById(gameID);
    
    const homeTeamRadio = document.getElementById("home-team");
    const line = document.getElementById("line-amount").value;
    const teamsArray = button.value.split('$');
    let listOfGames = document.getElementById('chosen-games-list').getElementsByTagName('button');
    if(listOfGames.length < 15){
        if(homeTeamRadio.checked){
            button.innerText = "(-" + line + ") " + button.innerText;
            button.setAttribute("data-line", teamsArray[0] + ' ' + line);
        }
        else{
            button.innerText = button.innerText + " (-" + line + ")";
            button.setAttribute("data-line", teamsArray[1] + ' ' + line);
        }
        
        button.onclick = deselectGame;
        console.log(button.id);
        document.getElementById('chosen-games-list').appendChild(button); 
    }
    else{
        alert("15 is the maximum number of games alotted.");
    }
    console.log(button.getAttribute('data-line'));
    closeForm();
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
    let matchupsArray = [];
    let linesArray = [];
    for(i = 0; i < listOfGames.length; i++){
        gamesArray.push(listOfGames[i].id);
        let teamsArray = listOfGames[i].value.split('$');
        matchupsArray.push(teamsArray[0] + " vs. " + teamsArray[1]);
        linesArray.push(listOfGames[i].getAttribute("data-line"));
    }

    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');
    const week = searchParams.get('week');
    
    const payload = {
        bookID: bookID,
        week: week,
        ids: gamesArray,
        matchups: matchupsArray,
        lines: linesArray
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



function openSetLineForm(){
    const teamsArray = this.value.split('$');
    document.getElementById("home-team-label").innerText = teamsArray[0];
    document.getElementById("away-team-label").innerText = teamsArray[1];
    document.getElementById("set-line").style.display = "block";
    document.getElementById("home-team").focus();
    document.getElementById('game-id-holder').setAttribute("data-gameID", this.id); //store the id of the game to be used later
    document.getElementById("set-line-form").removeEventListener('submit', selectGame);  
    document.getElementById("set-line-form").addEventListener('submit', selectGame);
}

function closeForm() {
    document.getElementById("home-team").checked = false;
    document.getElementById("away-team").checked = false;
    document.getElementById("line-amount").value = "";
    document.getElementById("set-line").style.display = "none";
}

document.getElementById("set-line-form").addEventListener('submit', function(e) {
    e.preventDefault();
})