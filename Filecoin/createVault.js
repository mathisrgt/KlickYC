async function createVault(vaultId, account, cache) {
    // Base URL
    const baseUrl = "https://basin.tableland.xyz";
    
    // Endpoint for creating a vault
    const endpoint = `/vaults/${vaultId}`;
    
    // Construct the complete URL
    const url = `${baseUrl}${endpoint}`;
    
    // Data parameters
    const data = {
        account: account,
        cache: cache // Optional, specify cache in minutes if provided
    };
    
    try {
        // Make the POST request
        const response = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        // Return the response text
        return await response.text();
    } catch (error) {
        console.error('Error creating vault:', error);
        return null;
    }
}

// Example usage:
const vaultId = "vault.math";
const account = "0x9Da44ADC3ca977495b9110716EF31842c0F7773e";
const cache = 30; // Cache duration in minutes (optional)

createVault(vaultId, account, cache)
    .then(response => {
        console.log("Response:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
