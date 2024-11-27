<<<<<<< HEAD:public/script.js
document.getElementById("sendLocation").addEventListener("click", () => {
    // Fetch IP and Location from ipinfo.io
    fetch ('https://ipinfo.io/json?token=YOUR_API_TOKEN') // Replace with your actual token
        .then(response => response.json())
        .then(data => {
            const location = data.city + ', ' + data.region + ', ' + data.country;
            const ip = data.ip;
            
            // Send the IP and location to your Node.js server
            fetch('http://localhost:3000/location', { // Replace with your Node.js server URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ip: ip,
                    location: location
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Data sent successfully:', data);
            })
            .catch(error => {
                console.error('Error sending data to server:', error);
            });

        })
        .catch(error => {
            console.error('Error fetching location:', error);
            alert("SAD! Piyush got no oranges");
        });   
});

document.getElementById("message").addEventListener("click", () => { 
    console.log("JAA Naa Chutiye Apna kaam kr 🤓");
    alert("JAA Naa Chutiye Apna kaam kr 🤓"); // This will show a popup alert
  });
  

document.getElementById("sendLocation").addEventListener("click", function() {
    // Get the container where emojis will appear
    const container = document.querySelector('.animation-container');
    
    // Emoji array to pick random emojis
    const emojis = ['🍊'];
    
    // Generate a cluster of 10 emojis each time the button is clicked
    for (let i = 0; i < 10; i++) {
        // Randomly pick an emoji
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Create a new emoji element
        const emojiElement = document.createElement('div');
        emojiElement.classList.add('emoji');
        emojiElement.textContent = emoji;
        
        // Randomize the position of the emoji within the viewport
        const xPosition = Math.random() * 100; // Random horizontal position (in viewport)
        const yPosition = Math.random() * 100; // Random vertical position (in viewport)
        
        emojiElement.style.left = `${xPosition}vw`;
        emojiElement.style.top = `${yPosition}vh`;
        
        // Append the emoji to the container
        container.appendChild(emojiElement);
        
        // Remove the emoji after the animation ends
        setTimeout(() => {
            emojiElement.remove();
        }, 2000); // Duration should match the animation time (2s)
    }
});

 // consent for location to the same server
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
  
  function sendToServer(data) {
    fetch("http://localhost:3000/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("sad");
        }
      })
      .then((responseData) => {
        alert(responseData.message);
      })
      .catch((error) => {
        alert("An error occurred while sending data to the server.");
        console.error("Error:", error);
      });
  }
  
=======
// script.js (Client-Side)

// Ensure the script runs only on the client-side (in the browser)
if (typeof window !== "undefined") {
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
}
>>>>>>> 18e00ad05d9707c99930c08242b94f8265cf1f88:script.js
