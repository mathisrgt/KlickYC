const axios = require('axios');

const url = 'https://gateway.lighthouse.storage/ipfs/QmWTZo7CcNa4LbncVJuYetPfoDtg32QuLqAK7XX6hJK7Y5';

async function fetchData() {
  try {
    const response = await axios.get(url);
    console.log(response.data); // This will log the data fetched from the URL
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
