document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Get form values
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            // Validate form
            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields!");
                return;
            }

            // Build Gmail compose link
            const subject = "Portfolio Contact from " + name;
            const body = "Name: " + name + "\nEmail: " + email + "\nMessage: " + message;
            const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=karnakreeshal@gmail.com&su=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

            // Add loading animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
                submitBtn.disabled = true;
            }

            // Open Gmail compose in new tab
            window.open(gmailUrl, '_blank');

            // Reset button and form after redirect
            setTimeout(function () {
                if (submitBtn) {
                    submitBtn.innerHTML = 'Send Message';
                    submitBtn.disabled = false;
                }
                contactForm.reset();
            }, 1000);
        });
    }
});
