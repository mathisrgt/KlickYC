async function listVaultEvents(vaultId, limit = 10, offset = 0, before = null, after = null) {
    // Base URL
    const baseUrl = "https://basin.tableland.xyz";
    
    // Endpoint for listing events
    const endpoint = `/vaults/${vaultId}/events`;
    
    // Construct the complete URL
    let url = `${baseUrl}${endpoint}?limit=${limit}&offset=${offset}`;
    if (before !== null) {
        url += `&before=${before}`;
    }
    if (after !== null) {
        url += `&after=${after}`;
    }
    
    try {
        // Make the GET request
        const response = await fetch(url);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }
        
        // Return the response data as JSON
        return await response.json();
    } catch (error) {
        console.error('Error listing vault events:', error);
        return null;
    }
}

// Example usage:
const vaultId = "vault.mathis";
const limit = 10; // Optional, default is 10
const offset = 0; // Optional, default is 0
const before = null; // Optional, Unix timestamp to filter events before
const after = null; // Optional, Unix timestamp to filter events after

listVaultEvents(vaultId, limit, offset, before, after)
    .then(data => {
        console.log("Vault events:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
