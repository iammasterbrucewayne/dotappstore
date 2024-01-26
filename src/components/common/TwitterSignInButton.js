"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { RiTwitterXFill } from "react-icons/ri";

const TwitterSignInButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  return (
    <Button
      bg="black"
      color="white"
      width={"full"}
      mt={2}
      py={6}
      leftIcon={<RiTwitterXFill />}
      _hover={{bg: "gray.700"}}
      onClick={() => signIn("twitter", { callbackUrl })}
    >
      Login with Twitter
    </Button>
  );
};

export default TwitterSignInButton;
