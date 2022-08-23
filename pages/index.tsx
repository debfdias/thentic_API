import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidV4 } from "uuid";

import { ListWallets } from './components/ListWallets';
import { ListNFTs } from './components/ListNFTs';

import { Box, Button, Flex, Heading, Input, SimpleGrid, Stack, Text, theme } from "@chakra-ui/react";
import dynamic from "next/dynamic";


import { Header } from './components/Header';
import { useForm } from 'react-hook-form';

interface HomeProps {
  wallets: [];
}

const baseURL = "https://thentic.tech/api"

export default function Home({ wallets }: HomeProps) {
  
  const [wallet, setWallet] = useState<string>('');
  const [walletList, setWalletList] = useState<[]>([]);
  const [contract, setContract] = useState<string>('');
  const [nftName, setNFTName] = useState<string>('');
  const [nftList, setNFTList] = useState<any[]>([]);
  const [showMintForm, setShowMintForm] = useState<boolean>(true);
  const [showNFTList, setShowNFTList] = useState<boolean>(false);
  const [showWalletList, setShowWalletList] = useState<boolean>(false);

  useEffect(() => {
      setContract("0xf99d4f0d5cba28d172917ad9f65593cb26191caa")
  }, []);

  async function createWallet() {
    var data = {
      key: process.env.NEXT_PUBLIC_THENTIC_KEY,
      chain_id: 97,
    };

    if(!wallet) {
      try {
        await axios.post(`${baseURL}/wallets/new`, data)
              .then((response) => { setWallet(response.data.wallet) });
      } catch(error) {
        alert("Something went wrong!")
      }
    }
  }

  async function listWallets() {
    setShowWalletList(true);
    setShowNFTList(false);
    setShowMintForm(false);

    try {
      await axios.get(`${baseURL}/wallets/all?key=${process.env.NEXT_PUBLIC_THENTIC_KEY}`)
          .then((response) => { setWalletList(response.data.wallets) });
    } catch(error) {
      alert("Something went wrong!")
    }
  }

  async function createContract() {
    var data = {
      key: process.env.NEXT_PUBLIC_THENTIC_KEY,
      chain_id: 97,
      name: 'Hündchen',
      short_name: 'HUND',
    };

    if (wallet) {
      try {
        await axios.post(`${baseURL}/newNFTContract`, data)
              .then((response) => { window.location.replace(response.data.transaction_url) });
        } catch (error) {
          alert("Something went wrong!");
        }
    } else {
      alert("Create a wallet first!");
    }
  };

  function showMintNFTForm() {
    setShowMintForm(true);
    setShowNFTList(false);
    setShowWalletList(false);

    return;
  }

  async function mintNFT() {
    setShowMintForm(true);
    setShowWalletList(false);
    setShowNFTList(false);

    var data = {
      contract: contract,
      nft_id: uuidV4(),
      nft_data: "Kleine Hund",
      to: wallet,
    };

    if (wallet) {
      try {
        await axios.post(`${baseURL}/nfts/mint`, data)
              .then((response) => { window.location.replace(response.data.transaction_url) });
      } catch (error) {
        alert("Something went wrong");
      }
    } else {
      alert("Create a wallet first!");
    }
  };

  async function listNFTs() {
    setShowNFTList(true);
    setShowWalletList(false);
    setShowMintForm(false);

    let bsc_chain_id = 97;

    try {
      await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/nfts?key=${process.env.NEXT_PUBLIC_THENTIC_KEY}&chain_id=${bsc_chain_id}`)
            .then((response) => { setNFTList(response.data.nfts) });
    } catch(error) {
      alert("Something went wrong!")
    }
  }

  return (
    <Flex direction="column" h="100vh" >
      <Head>
        <title>Thentic API</title>
      </Head>
      <Header walletAddress = { wallet }/>
      <Flex w="100%" my="6" maxW={1480} px="16">
        <Box as="aside" w="64" mr="8">
          <Stack spacing="8" align="flex-start">
            <Text fontWeight="bold" color="gray.400" fontSize="small">WALLETS</Text>
            <Button w={180} colorScheme='green' onClick={() => createWallet()}>Create a new wallet</Button>
            <Button w={180} colorScheme='green' onClick={() => listWallets()}>List your wallets</Button>

            <Text fontWeight="bold" color="gray.400" fontSize="small">NFTs</Text>
            <Button w={180} colorScheme='green' onClick={() => showMintNFTForm()}>Mint your new NFT</Button>
            <Button w={180} colorScheme='green' onClick={() => listNFTs()}>List your NFTs</Button>

            <Text fontWeight="bold" color="gray.400" fontSize="small">CONTRACTS</Text>
            <Button w={180} colorScheme='green' onClick={() => createContract()}>Create a new contract</Button>
          </Stack>
        </Box>

        <SimpleGrid 
          flex="1" gap="4" 
          minChildWidth="320px" 
          bg="gray.800" borderRadius={8} paddingBottom={4} >
          
          { showWalletList && walletList.map(wallet => (
             <ListWallets key = {`key_${wallet}`} address = { wallet }/> ))}


          { showNFTList && nftList.map(nft => (
             <ListNFTs 
                key = {nft.request_id} 
                id = { nft.id }
                name = { nft.name }
                short_name = { nft.short_name }
                status = { nft.status }
                contract = { nft.contract }
              />
          ))}

          { showMintForm  &&
            <Flex
              as="form"
              width="100%"
              maxWidth={360}
              bg="gray.800"
              p="8"
              borderRadius={8}
              flexDirection="column"
              alignItems="flex-start"
            >
            <Heading size="lg" fontWeight="bold">
                Create your own NFT
            </Heading>
            <Stack marginTop={10} spacing={6}>
              <Input placeholder='Type a name'/>
              <Button
                type="submit"
                mt="6"
                colorScheme="pink"
                size="lg"
                onClick={() => mintNFT()}
              >Mint</Button>
            </Stack>
            
          </Flex>
            
          }

        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

