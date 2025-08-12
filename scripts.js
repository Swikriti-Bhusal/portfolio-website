document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name && email) {
        alert(`Thank you, ${name}! Your message has been sent.`);
        // In production, add code to send via API
    } else {
        alert('Please fill in required fields.');
    }
});


