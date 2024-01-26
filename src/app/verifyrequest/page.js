"use client";
import { Flex, Heading, Image, Text, Input, Button } from "@chakra-ui/react";
import ContextWrapper from "@/components/common/context-wrapper";

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
          <Heading>Please check your Email</Heading>
          <Text textAlign={"center"}>
            A sign-in link has been sent to your email address
          </Text>
          <Button
            variant="outline"
            boxShadow="4px 4px 0 black"
            transform="scale(1)"
            _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
            marginTop={"10px"}
            onClick={() => {
              window.close();
            }}
          >
            Close Window
          </Button>
        </Flex>
      </Flex>
    </ContextWrapper>
  );
};

export default SignInPage;
