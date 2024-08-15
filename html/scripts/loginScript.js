document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the request payload
    const data = {
        email: email,
        password: password
    };

    // attempt to login using the provided credentials
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        //if there is a problem on login, user is notified
        if(!response.ok){
            alert('Login failed: ' + response.statusText);
            throw new Error('Problem with the network' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        //if there is no issue, then log in continues
        console.log('Success:', result.access_token);
        document.cookie = `access_token=${result.access_token}`;
        window.location.replace('/bookshelf');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});