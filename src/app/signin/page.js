"use client";
import { Flex, Heading, Image, Text } from "@chakra-ui/react";
import TwitterSignInButton from "../../components/common/TwitterSignInButton";
import EmailSignInForm from "../../components/common/EmailSignInForm";
import ContextWrapper from "@/components/common/context-wrapper";

import WalletConnect from "../../components/common/wallet-connect";

const SignInPage = () => {
  return (
    <ContextWrapper>
      <Flex
        maxW={"6xl"}
        mx={"auto"}
        justify={"center"}
        align={"center"}
        flexDir={"column"}
        height={"100vh"}
        gap={"40px"}
      >
        <Flex justify={"center"} gap={"10px"} align={"center"}>
          <Image
            src="https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
            alt="dot-logo"
            width={"50px"}
            height={"50px"}
          />
          <Heading>DotAppStore</Heading>
        </Flex>
        <Flex
          justify={"center"}
          align={"center"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Heading>Sign In</Heading>
          <Text textAlign={"center"}>
            Join a community dedicated to discovering and sharing Polkadot
            ecosystem projects
          </Text>
          <EmailSignInForm />
          <Text>OR</Text>
          <TwitterSignInButton />
          <WalletConnect />
        </Flex>
      </Flex>
    </ContextWrapper>
  );
};

export default SignInPage;
