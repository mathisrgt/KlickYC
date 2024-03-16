"use client"

// LIBRARIES
import { SHA256 } from "crypto-js";
import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import lighthouse from '@lighthouse-web3/sdk';

// IMAGES
import klickyc_white from "@/public/klickyc_white.svg"
import klickyc_black from "@/public/klickyc_black.svg"

interface transactionDataForHash {
  card: string,
  date: string,
  value: string
}

export default function KlickYC() {
  const searchParams = useSearchParams()

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [page, setPage] = useState("login");
  const [fileName, setFileName] = useState("Import your ID");

  // CODE TO ACCESS_TOKEN REQUEST
  useEffect(() => {
    const code = searchParams.get('code');
    const data = {
      code: code,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    };

    console.log('Code:', code);
    console.log('Client ID:', data.client_id);
    console.log('Secret:', data.client_secret);

    fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0/auth/token/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log(data);
        console.log('Access Token:', data.access_token);
        getTransaction(data.access_token);
      })
      .catch((error: any) => {
        console.error('Error:', error);
      });
  }, []);

  // TRANSACTIONS API CALL
  function getTransaction(accessToken: string) {
    console.log("Access Token: " + accessToken);
    fetch(`https://${process.env.NEXT_PUBLIC_DOMAINE}-sandbox.biapi.pro/2.0//users/me/transactions?limit=1000`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then(data => {
        const dataForHash = getFirstTransaction(data);

        console.log(dataForHash)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // TRANSACTION PARSER
  async function getFirstTransaction(data: any) {
    const transactionData = data.transactions[data.total - 1];

    const transactionDataForHash = {
      card: transactionData.card,
      date: transactionData.date,
      value: Math.abs(transactionData.value).toString()
    }

    const name = 'KlickYC';
    const hash = generateHash(name, transactionDataForHash);
    console.log(hash)
    
	const apiKey = "" + process.env.NEXT_PUBLIC_LIGHTHOUSE;
    const uploadResponse = await lighthouse.uploadText(hash, apiKey, name)
    let urlEndpoint = uploadResponse.data.Hash

    return transactionDataForHash;
  }

  function generateHash(name: String, transaction: transactionDataForHash) {
    const transactionString = JSON.stringify(transaction);
    const toHash = `${name}${transactionString}`;
    const hash = SHA256(toHash).toString();
    return hash;
  }

  // FRONT
  function handleFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('Import your ID');
    }
  };

  function handleCreateAccount() {
    setPage("create-account");
  }

  function handleLogin() {
    setPage("login");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Button color="primary" className="flex justify-center bg-gradient-to-r from-blue-900 to-blue-700 px-2 py-10 rounded-2xl" onPress={onOpen}>
        <div className="w-1/3 p-2 my-2">
          <Image src={klickyc_white} alt="Klickyc logo" />
        </div>
        <div className="w-2/3 flex flex-col justify-start items-start">
          <p className="text-md">Register with</p>
          <h3 className="text-2xl">KlickYC</h3>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-center">
                <Image src={klickyc_black} alt="Klickyc logo" className="w-[35px] mx-2" />
                <h2 className="text-blue-900 mt-[5px]">KLICKYC</h2>
              </ModalHeader>
              <ModalBody>
                {page == "login" ?
                  <div className="mb-4 w-full flex flex-col">
                    <Input isRequired type="text" label="ENS" placeholder="Write your ENS here" labelPlacement="outside" />
                    <Button as={Link} href="https://provehances-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=64751109&redirect_uri=http://localhost:3000/" className="mt-6 bg-blue-900 text-white">Connect</Button>
                    <Link href="" className="text-gray-500 text-xs text-center mt-3" onClick={handleCreateAccount}>Create an account</Link>
                  </div>
                  :
                  page == "create-account" ?
                    <div className="mb-2 w-full flex flex-col">
                      <div className="mt-4">
                        <p className="text-sm mb-2">ID <span className="text-red-500">*</span></p>
                        <label htmlFor="file-upload" className="text-white text-sm block text-white text-sm bg-gradient-to-r from-blue-900 to-blue-700 w-full cursor-pointer py-2 px-4 rounded-lg shadow-md hover:opacity-80 focus:outline-none">
                          {fileName}
                        </label>
                        <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                      </div>
                      <div className="mt-4">
                        <Input isRequired type="text" label="Name" placeholder="Write your full name here" labelPlacement="outside" />
                      </div>
                      <div className="mt-4">
                        <Input isRequired type="text" label="ENS" placeholder="Write your ENS here" labelPlacement="outside" />
                      </div>
                      <Button as={Link} href="https://provehances-sandbox.biapi.pro/2.0/auth/webview/connect?client_id=64751109&redirect_uri=http://localhost:3000/" className="mt-6 bg-blue-900 text-white">Connect</Button>
                      <Link href="" className="text-gray-500 text-xs text-center mt-3" onClick={handleLogin}>I have an account</Link>
                    </div>
                    :
                    <div className="h-[200px] flex items-center justify-center">
                      <CircularProgress color="default" label="Loading..." />
                    </div>
                }
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </main >
  );
}
