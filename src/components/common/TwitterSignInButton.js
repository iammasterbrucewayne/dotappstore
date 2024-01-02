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
      colorScheme="twitter"
      width={"full"}
      leftIcon={<RiTwitterXFill />}
      onClick={() => signIn("twitter", { callbackUrl })}
    >
      Sign in with Twitter
    </Button>
  );
};

export default TwitterSignInButton;
