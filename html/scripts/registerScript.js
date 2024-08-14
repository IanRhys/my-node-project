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

    // Send the POST request
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if(!response.ok){
            alert('Sign up failed: ' + response.statusText);
            throw new Error('Problem with the network' + response.statusText);
        }
        
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        // Redirect to another page, or clear the form, or show a success message
        window.location.replace("/"); // Example redirect
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the error here (e.g., display an error message to the user)
    });
});