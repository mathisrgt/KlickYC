async function listVaultsByAccount(account) {
    // Base URL
    const baseUrl = "https://basin.tableland.xyz";
    
    // Endpoint for listing vaults by account
    const endpoint = "/vaults";
    
    // Construct the complete URL
    const url = `${baseUrl}${endpoint}?account=${account}`;
    
    try {
        // Make the GET request
        const response = await fetch(url);
        
        // Check if request was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        // Return the response data as JSON
        return await response.json();
    } catch (error) {
        console.error('Error listing vaults by account:', error);
        return null;
    }
}

// Example usage:
const account = "0x6C53e96Fb15e342ce92306B2d81C6253eEba9C1d";

listVaultsByAccount(account)
    .then(data => {
        console.log("Vaults:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
