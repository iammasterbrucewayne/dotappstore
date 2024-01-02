"use client";
import { Heading, Text, Button, VStack } from "@chakra-ui/react";
import TwitterSignInButton from "../../components/common/TwitterSignInButton";
import EmailSignInForm from "../../components/common/EmailSignInForm";
import ContextWrapper from "@/components/common/context-wrapper";
import Navbar from "@/components/common/navbar";

import WalletConnect from "../../components/common/wallet-connect";

const SignInPage = () => {
  return (
    <ContextWrapper>
      <Navbar />
      <VStack maxW={"lg"} mx={"auto"} mt={16}>
        <VStack>
          <Heading fontWeight="black">Sign In</Heading>
          <Text textAlign={"center"} fontSize="lg" mb={4}>
            Join a community dedicated to discovering and sharing Polkadot
            ecosystem projects
          </Text>
          <TwitterSignInButton />
          <WalletConnect />

          <Button colorScheme="pink" size="lg" mt={2} width={"full"}>
            Sign in with Web3 wallet
          </Button>
          {/* <WalletConnect /> */}
          <Text fontWeight="semibold" my={4}>
            OR
          </Text>
          <EmailSignInForm />
        </VStack>
      </VStack>
    </ContextWrapper>
  );
};

export default SignInPage;