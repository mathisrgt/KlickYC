async function writeEvent(vaultId, eventData, filename, signature, timestamp = null) {
    // Base URL
    const baseUrl = "https://basin.tableland.xyz";
    
    // Endpoint for writing an event
    const endpoint = `/vaults/${vaultId}/events`;
    
    // Construct the complete URL
    const url = `${baseUrl}${endpoint}`;
    
    // Data parameters
    const data = new FormData();
    data.append('filename', filename);
    data.append('signature', signature);
    if (timestamp !== null) {
        data.append('timestamp', timestamp);
    }
    data.append('file', new Blob([JSON.stringify(eventData)], { type: 'application/json' }));
    
    try {
        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`Failed to write event: ${response.status}`);
        }
        
        // Return the response data as JSON
        return await response.json();
    } catch (error) {
        console.error('Error writing event:', error);
        return null;
    }
}


// Example usage:
const vaultId = "vault.mathis";
const filename = "data.hello";
// const eventData = { key: "5fc7d07772b9487c8f5f59a3115710d260d0e82710858d5d776a1e98c275e033"};
// const signature = "752b37c9989b0ff32ad7f9a12e72109fd2918ed72a04cf8eeccb0909bab4efaf";
// const timestamp = 1708987192; // Unix timestamp (optional)
// Convert seconds to milliseconds
const timestamp = Date.now();
// console.log(timestamp);

const crypto = require('crypto');

// Your event data
const eventData = { key: "5fc7d07772b9487c8f5f59a3115710d260d0e82710858d5d776a1e98c275e033" };

// Serialize the event data (to JSON)
const serializedEventData = JSON.stringify(eventData);
console.log('Serialized event data:', serializedEventData);

// Load your private key (replace 'YOUR_PRIVATE_KEY' with your actual private key)
const privateKey = '752b37c9989b0ff32ad7f9a12e72109fd2918ed72a04cf8eeccb0909bab4efaf';

// Create a signer object with SHA-256 algorithm
const signer = crypto.createSign('sha256');
console.log("signer", signer);

// Update the signer with your data
signer.update(serializedEventData);
console.log("1")

// Convert hexadecimal private key to buffer
const privateKeyBuffer = Buffer.from(privateKey, 'hex');

// Sign the data with the private key buffer
const signature = signer.sign(privateKeyBuffer, 'hex');


// Sign the data with the private key
// const signature = signer.sign(privateKey, 'hex');

console.log('Signature:', signature);




writeEvent(vaultId, eventData, filename, signature, timestamp)
    .then(response => {
        console.log("Event written:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
