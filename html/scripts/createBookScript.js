document.getElementById('new-book').addEventListener('submit', async function(event) {
    event.preventDefault();
    const bookName = document.getElementById('book-name').value;
    console.log(bookName);

    const email = getEmailFromJWT();
    try {
        const res = await fetch('http://localhost:3000/bookshelfRoutes/' + encodeURIComponent(email), {
            method: 'GET'
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const data = await res.json(); // Assuming the server responds with JSON
        const bookItem = data.books[0];
        if(bookItem.myBook1 === null){
            createBook(bookItem.walletID, 'myBook1', bookName);
        }
        else if(bookItem.myBook2 === null){
            createBook(bookItem.walletID, 'myBook2', bookName);
        }
        else if(bookItem.myBook3 === null){
            createBook(bookItem.walletID, 'myBook3', bookName);
        }
        else{
            alert("No book slots available, please delete a book before trying again");
        }
        location.reload();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

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

async function createBook(walletID, column, bookName){
    const data = {
        walletID: walletID,
        column: column,
        bookName: bookName
    };
    console.log("about to attempt the route createBOok");
    const res = await fetch('http://localhost:3000/bookshelfRoutes/createBook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        //if an issue arises, then the user is notified
        if(!response.ok){
            alert('Book creation failed: ' + response.statusText);
            throw new Error('Problem with the network' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    console.log("everything done");
    location.reload();
}