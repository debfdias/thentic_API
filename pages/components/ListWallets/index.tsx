import { Box, Text } from '@chakra-ui/react';

interface WalletProps {
  address: string;
}

export function ListWallets({ address }: WalletProps) {
  return (
    <Box
      bg="gray.700"
      borderRadius={8}
      width= {250}
      padding={2}
      mt={4} ml={10}
    >
      <Text fontSize="sm" > {address} </Text>
    </Box>
  )
}