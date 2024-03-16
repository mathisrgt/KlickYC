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
const account = "0x9Da44ADC3ca977495b9110716EF31842c0F7773e";

listVaultsByAccount(account)
    .then(data => {
        console.log("Vaults:", data);
    })
    .catch(error => {
        console.error("Error:", error);
    });
