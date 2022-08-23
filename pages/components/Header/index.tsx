import { Button, Flex, useBreakpointValue } from "@chakra-ui/react"
import { Logo } from "./Logo"

interface HeaderProps {
  walletAddress: string;
}

export function Header({ walletAddress }: HeaderProps) {
  return (
    <Flex 
      as="header" 
      w="100%"
      maxW={1480}
      h="20"
      px="16"
      align="center"
    >
      <Logo />

      <Flex align="center" ml="auto">
        <Button w={180} 
          colorScheme='cyan' 
          variant='outline'>
            {walletAddress ? walletAddress.substring(0, 15) + '...' :'Wallet address'}
        </Button>
      </Flex>
    </Flex>
  )
}