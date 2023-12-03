"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button, Input, Flex, Text, FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
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
      <FormControl isInvalid={error}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          value={email}
          onChange={handleEmailChange}
          placeholder="name@example.com"
          size="lg"
          type="email"
          borderColor={error ? "red.500" : "inherit"}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
        <Button
          background="black"
          color="white"
          size="lg"
          mt={4}
          onClick={async () => {
            await handleSubmit(email);
          }}
          w={"full"}
          _hover={{ bg: "gray.700" }}
        >
          Sign in with Email
        </Button>
      </FormControl>
  );
}
