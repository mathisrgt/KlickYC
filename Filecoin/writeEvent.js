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
const eventData = { key: "5fc7d07772b9487c8f5f59a3115710d260d0e82710858d5d776a1e98c275e033",
                    ENS: "mathis.eth"};
const filename = "data.hello";
const signature = "a4cb49a595988e2a3b20e6ee468d50a8d3c3cb01a278754c07efda3a89a7e60527545deb512204b034100d6d6b9d169a2d22f5e6286c9c0272e8dc920981941a00";
// const timestamp = 1708987192; // Unix timestamp (optional)
// Convert seconds to milliseconds
const timestamp = Date.now();
// console.log(timestamp);

writeEvent(vaultId, eventData, filename, signature, timestamp)
    .then(response => {
        console.log("Event written:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
