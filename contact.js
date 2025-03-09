// Ensure Firebase loads before using it
document.addEventListener("DOMContentLoaded", function () {
    // Your Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyBFFkOrLkzLhTvZbKPnypaozqxNiGwI-mE",
        authDomain: "ebsitecontact.firebaseapp.com",
        projectId: "ebsitecontact",
        storageBucket: "ebsitecontact.appspot.com",
        messagingSenderId: "669232163528",
        appId: "1:669232163528:web:39923daad1961fea7f13fd",
        measurementId: "G-S4SW1JM1MC"
    };

    // Initialize Firebase
    try {
        firebase.initializeApp(firebaseConfig);
        const db = firebase.firestore();
        console.log("Firebase initialized successfully");

        // Handle form submission
        const contactForm = document.getElementById("contact-form");

        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                // Don't prevent default - allow the mailto: action to work

                // Get form values
                let name = document.getElementById("name").value.trim();
                let email = document.getElementById("email").value.trim();
                let message = document.getElementById("message").value.trim();

                // Validate form
                if (name === "" || email === "" || message === "") {
                    alert("❌ सभी फील्ड आवश्यक हैं!");
                    event.preventDefault(); // Prevent form submission if validation fails
                    return;
                }

                // Add loading animation
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                }

                // Save data to Firestore (in addition to mailto action)
                db.collection("messages").add({
                    name: name,
                    email: email,
                    message: message,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    console.log("✅ संदेश फायरबेस में सफलतापूर्वक सहेजा गया!");

                    // Show a success message
                    showSuccessMessage(contactForm);

                    // Reset button after delay
                    setTimeout(() => {
                        if (submitBtn) {
                            submitBtn.innerHTML = 'Send Message';
                            submitBtn.disabled = false;
                        }
                    }, 2000);

                }).catch((error) => {
                    console.error("❌ संदेश जोड़ने में त्रुटि:", error);
                    alert("❌ त्रुटि: " + error.message);
                    event.preventDefault(); // Prevent form submission if Firebase save fails

                    // Reset button
                    if (submitBtn) {
                        submitBtn.innerHTML = 'Send Message';
                        submitBtn.disabled = false;
                    }
                });
            });
        } else {
            console.error("Contact form not found in the document");
        }

        // Add direct email click tracking
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Add ripple effect on click
                const ripple = document.createElement('span');
                ripple.className = 'email-ripple';
                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 1000);

                // Log email clicks to Firebase
                db.collection("email_clicks").add({
                    email: this.getAttribute('href').replace('mailto:', ''),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    console.log("Email click logged");
                }).catch(error => {
                    console.error("Error logging email click:", error);
                });
            });
        });

    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
});

// Function to show success message
function showSuccessMessage(form) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="success-text">
            <h3>✅ आपका संदेश भेजा जा रहा है!</h3>
            <p>हम जल्द ही आपसे संपर्क करेंगे।</p>
        </div>
    `;

    // Add styles for the success message
    const styles = `
        .success-message {
            display: flex;
            align-items: center;
            padding: 20px;
            margin-top: 20px;
            background-color: rgba(var(--primary-color-rgb), 0.1);
            border-radius: 10px;
            border: 1px solid var(--primary-color);
            animation: fadeInUp 0.5s forwards;
        }
        
        .success-icon {
            font-size: 2rem;
            color: var(--primary-color);
            margin-right: 15px;
        }
        
        .success-text h3 {
            margin: 0 0 5px 0;
            color: var(--primary-color);
        }
        
        .success-text p {
            margin: 0;
        }
        
        .email-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            background: rgba(var(--primary-color-rgb), 0.3);
            border-radius: 50%;
            animation: ripple 1s forwards;
        }
        
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    // Add styles to document
    if (!document.getElementById('contact-success-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'contact-success-styles';
        styleEl.textContent = styles;
        document.head.appendChild(styleEl);
    }

    // Add the message after the form
    form.parentNode.insertBefore(successMessage, form.nextSibling);

    // Remove the message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            successMessage.remove();
        }, 500);
    }, 5000);
}
