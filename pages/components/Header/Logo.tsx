import { Text } from "@chakra-ui/react";

export function Logo() {
  return(
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >  
      Thentic
      <Text as="span" color="green.400" ml="1"> . API</Text>
    </Text>
  )
}