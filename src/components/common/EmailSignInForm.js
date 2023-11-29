"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input, Flex, Text, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";

export default function EmailSignInForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error) setError("");
  };

  async function handleSubmit(email) {
    if (validateEmail(email)) {
      signIn("sendgrid", { email, callbackUrl });
    }
  }
  const validateEmail = (email) => {
    if (!email) {
      setError("The email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  return (
    <Flex flexDir={"column"} width={"full"} marginTop={"20px"}>
      <FormControl isInvalid={error}>
        <Text mb="8px">Email</Text>
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="name@example.com"
          size="sm"
          type="email"
          borderColor={error ? "red.500" : "inherit"}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <Button
          colorScheme="pink"
          marginTop={"10px"}
          onClick={async () => {
            await handleSubmit(email);
          }}
          w={"full"}
        >
          Sign in with Email
        </Button>
      </FormControl>
    </Flex>
  );
}
