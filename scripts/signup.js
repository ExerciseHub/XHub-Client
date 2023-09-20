document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    signup();
});

async function signup() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    try {
        // Replace with your actual API endpoint
        const response = await fetch('https:// aws url /signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        
        // Assuming your API returns a message in the response data
        alert(data.message); 

        // Redirect to the login page after successful signup
        window.location.href = 'auth/login.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Error signing up');
    }
}
