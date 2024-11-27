// script.js (Client-Side)

// Event listener for sending location data
document.getElementById("getLocationBtn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const data = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
                sendToServer(data);
            },
            (error) => {
                alert("Unable to fetch location. Ensure location is enabled.");
                console.error("Error fetching location:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// Function to send location data to the server
function sendToServer(data) {
    fetch("https://your-render-backend-url.onrender.com/location", {  // Replace with your actual Render URL
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((responseData) => {
        alert(responseData.message);  // Show success message
    })
    .catch((error) => {
        alert("An error occurred while sending data to the server.");
        console.error("Error:", error);
    });
}

// Event listener for the custom message button
document.getElementById("message").addEventListener("click", () => {
    console.log("JAA Naa Chutiye Apna kaam kr 🤓");
    alert("JAA Naa Chutiye Apna kaam kr 🤓"); // Popup alert
});
