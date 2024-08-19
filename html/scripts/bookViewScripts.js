async function getMembers(){
    const names = document.getElementById("list-of-members");
    const scores = document.getElementById("list-of-scores");
    try{
        console.log("attempting to get members");
        const searchParams = new URLSearchParams(window.location.search);
        const bookID = searchParams.get('bookID');
        console.log(bookID);
        const res = await fetch('http://localhost:3000/bookViewRoutes/'+ bookID);
        console.log(res);

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const members = await res.json();
        console.log(members);
        members.forEach(member => {
            names.append(member.name);
            scores.append(member.score);
        });
        
    }
    catch(error){

    }
}

async function deleteBook(bookID){

}

async function makePicks(pickID){

}

function chooseGames(week){

}

document.getElementById('add-member-submit').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('new-member-email').value;
    const searchParams = new URLSearchParams(window.location.search);
    const bookID = searchParams.get('bookID');
    try{
        addMember(bookID, email);
    }
    catch(error){

    }
    window.location.reload();
});

async function addMember(bookID, email){
    
}