async function getBooks(){
    const myBooksList = document.getElementById('my-books');
    const joinedBooksList = document.getElementById('joined-books');

    const email = getEmailFromJWT();

    try {
        const res = await fetch('http://localhost:3000/bookshelfRoutes/' + encodeURIComponent(email), {
            method: 'GET'
        });
        
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        
        const bookIDs = await res.json(); // Assuming the server responds with JSON
        const bookItem = bookIDs.books[0];
        const booksArray = [bookItem.myBook1, bookItem.myBook2, bookItem.myBook3, bookItem.joinedBook1, bookItem.joinedBook2, bookItem.joinedBook3, bookItem.joinedBook4, bookItem.joinedBook5];
        for(i = 0; i < 8; i++){
            if(i < 3){
                if(booksArray[i] === null){
                    continue;
                }
                else{
                    
                    
                    let button = document.createElement('button');
                    
                    button.value = booksArray[i];
                    button.className = 'button';
                    button.style["display"] = "block";
                    button.style["font-size"] = "20px";
                    button.style["border"] = "3px solid hsl(44, 33%, 50%)";
                    button.style["border-radius"] = "5px";
                    button.style["margin-bottom"] = "3px";

                    // this try/catch block attempts to get the name of each book
                    // to display the name instead of the bookID
                    try{
                        const baseURL = 'http://localhost:3000/bookshelfRoutes/getBookName/'
                        const res = await fetch(baseURL +  booksArray[i], {
                            method: 'GET'
                        });
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        const bookName = await res.json();
                        const bookNameItem = bookName.bookName[0];
                        button.innerText = await bookNameItem.bookName;
                    }
                    catch (error){
                        console.error('There was a problem with the fetch operation:', error);
                    }

                    myBooksList.append(button);
                }
            }
            else{
                if(booksArray[i] === null){
                    continue;
                }
                else{
                    let button = document.createElement('button');
                    button.value = booksArray[i];
                    button.className = 'button';
                    button.style["font-size"] = "20px";
                    button.style["border"] = "3px solid hsl(44, 33%, 50%)";
                    button.style["border-radius"] = "5px";
                    button.style["margin-bottom"] = "3%";

                    // this try/catch block attempts to get the name of each book
                    // to display the name instead of the bookID
                    try{
                        const baseURL = 'http://localhost:3000/bookshelfRoutes/getBookName/'
                        const res = await fetch(baseURL +  booksArray[i], {
                            method: 'GET'
                        });
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }
                        const bookName = await res.json();
                        const bookNameItem = bookName.bookName[0];
                        button.innerText = await bookNameItem.bookName;
                    }
                    catch (error){
                        console.error('There was a problem with the fetch operation:', error);
                    }
                    joinedBooksList.append(button);
                }
            }

        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    
}

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

function getBookName(bookID){
    const baseURL = 'http://localhost:3000/bookshelfRoutes/getBookName/'
    const bookName = fetch(baseURL +  bookID, {
        method: 'GET'
    });

    return bookName;
}