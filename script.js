document.getElementById("sendLocation").addEventListener("click", () => {
    // Fetch IP and Location from ipinfo.io
    fetch('https://ipinfo.io/json?token=YOUR_API_TOKEN') // Replace with your actual token
        .then(response => response.json())
        .then(data => {
            const location = data.city + ', ' + data.region + ', ' + data.country;
            const ip = data.ip;
            
            // Send the IP and location to your Node.js server
            fetch('http://your-node-server-url/receiveLocation', { // Replace with your Node.js server URL
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
            alert("Failed to get location.");
        });   
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