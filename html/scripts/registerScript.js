document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Prepare the request payload
    const data = {
        email: email,
        username: username,
        password: password
    };

    //attempts to register the user with the provided credentials
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        //if an issue arises, then the user is notified
        if(!response.ok){
            alert('Sign up failed: ' + response.statusText);
            throw new Error('Problem with the network' + response.statusText);
        }
        
        return response.json();
    })
    .then(result => {
        //if successful, user is redirected back to the login page
        console.log('Success:', result);
        window.location.replace("/"); // Example redirect
    })
    .catch(error => {
        console.error('Error:', error);
    });
});