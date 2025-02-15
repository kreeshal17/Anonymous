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
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Handle form submission
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent page refresh

        // Get form values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        // Validate form
        if (name === "" || email === "" || message === "") {
            alert("❌ All fields are required!");
            return;
        }

        // Save data to Firestore
        db.collection("messages").add({
            name: name,
            email: email,
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("✅ Message sent successfully!");
            document.getElementById("contact-form").reset();
        }).catch((error) => {
            console.error("❌ Error adding message:", error);
            alert("❌ Error: " + error.message);
        });
    });
});
