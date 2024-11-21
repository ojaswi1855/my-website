// Function to send location and IP data
async function sendLocationData(ip, latitude, longitude) {
    const timestamp = new Date().toISOString(); // Get the current timestamp
    const data = {
        ip: ip,
        location: {
            latitude: latitude,
            longitude: longitude,
        },
        timestamp: timestamp,
    };

    try {
        const response = await fetch(
            `https://api.ipgeolocation.io/astronomy?apiKey=0c2997f8aea05cd07d8bd174c81d5f13&lat=${latitude}&long=${longitude}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            console.log('Data saved successfully!');
        } else {
            console.error('Error saving data:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Example function to fetch IP and call `sendLocationData`
async function fetchAndSendLocation() {
    try {
        // Fetch the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Get location using the browser's Geolocation API
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    // Send data to the server or API (you can modify the function accordingly)
                    sendLocationData(ip, latitude, longitude);
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

// Attach the event listener to the button
document.getElementById('sendLocation').addEventListener('click', fetchAndSendLocation);
