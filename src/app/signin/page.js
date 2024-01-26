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
      <VStack maxW={"md"} mx={"auto"} mt={24}>
        <VStack>
          <Heading fontWeight="black" fontSize="5xl">
            Sign In
          </Heading>
          <Text textAlign={"center"} fontSize="lg" mb={4}>
            Join a community dedicated to discovering and sharing Polkadot
            ecosystem projects
          </Text>

          <WalletConnect />
          <TwitterSignInButton />

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
