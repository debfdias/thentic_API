import { Box, Text } from '@chakra-ui/react';

interface NFTProps {
  id: string;
  name: string;
  short_name: string;
  status: string;
  contract: string;
}

export function ListNFTs({ id, name, short_name, status, contract }: NFTProps) {
  return (
    <Box
      bg="gray.700"
      borderRadius={8}
      width= {320}
      padding={4}
      mt={4} ml={10}
    >
      <Text fontSize="sm"> { id } </Text>
      <Text fontSize="sm"> { name } </Text>
      <Text fontSize="sm"> { short_name } </Text>
      <Text fontSize="sm"> { status } </Text>
      <Text fontSize="sm"> { contract } </Text>
    </Box>
  )
}