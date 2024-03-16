const lighthouse = require('@lighthouse-web3/sdk');

const apiKey = '50a7c871.255de181ef8045afb4e61802edd999f3';
const filePath = './hello.txt'; // Provide the path to your file

async function uploadFile() {
  try {
    const uploadResponse = await lighthouse.upload(filePath, apiKey);
    console.log(uploadResponse);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

async function downloadFile() {
    const status = await lighthouse.dealStatus('bafybeigatkqxeqreooiwk5xym3sumyfk3f72wrogoocojkc5ch33dx54ku')
    console.log(status)
}

uploadFile();
// downloadFile();
