const axios = require('axios');

const url = 'https://gateway.lighthouse.storage/ipfs/QmbJVk5rSAdBNuva24idAjTqjtapVtvUtDkyGPdKCk15jr';

async function fetchData() {
  try {
    const response = await axios.get(url);
    console.log(response.data); // This will log the data fetched from the URL
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchData();
