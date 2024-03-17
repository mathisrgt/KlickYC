# KlickYC 🪪

## Overview 🌟

KlickYC is a KYC SDK that allows you to identify a user in just a few clicks using open-banking.

## Vercel deployment 🌐

https://klickyc.vercel.app/
Account already registred: ewan.eth

## Table of Contents 📑
- [Problem Statement](#problem-statement-%EF%B8%8F)
- [Solution](#solution-)
- [Features](#features-)
- [Product](#product-%EF%B8%8F)
- [Getting Started](#getting-started) 

## Problem Statement ⚠️

KYC are really long and boring to do, and you have to do it everytime you register to a new plateform.

## Solution 📜

We created KlickYC, which allows you to linked your ENS and your bank account to your KYC. So you just have to do the KYC the 1st time, and everytime you would like to do another KYC, you enter your ENS and connect your bank account to proof you already did the KYC.

## Features ✨

We use ENS as an on-chain identity to allows us to do the link with a bank account. Once the user have done the KYC, the ENS will be linked forever to the bank account. This way, everytime the user will have to do a KYC, he will just need to select his ENS and to connect his bank account to do his  KYC.  
We used LightHouse to store our data on IPFS very easily. Using the sdk of LightHouse, we are able to store a file in an IPFS url and then to get the data from it.  

# Open Banking Overview

## What is Open Banking?

Open Banking is a transformative approach in the financial sector that allows third-party developers to access financial data through bank APIs. This innovation fosters a more competitive and inclusive financial ecosystem, enabling personalized banking services and enhanced customer experiences.

## Global Adoption

- **Europe & UK**: Leaders in Open Banking, driven by regulatory frameworks like PSD2.
- **Australia**: Supported by the Consumer Data Right, promoting data sharing and competition.
- **Brazil**: Advancing in financial innovation and transparency through Open Banking regulations.

## Product 🛠️

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
