"use client";
import {
  HStack,
  Button,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <HStack py={2} px={8} maxW="6xl" mx="auto" justifyContent="space-between">
      <Link href="/">
        <Image
          src="https://europe1.discourse-cdn.com/standard21/uploads/polkadot2/original/1X/6ea9950aed34af4aa14a3bbe5ce85549b54278a1.svg"
          alt="dot-logo"
          width={48}
          height={48}
          as={Link}
        />
      </Link>
      <HStack justifyContent="end">
        {session ? (
          <Button
            as={Link}
            href="/submit"
            isExternal={false}
            variant="outline"
            colorScheme="black"
            boxShadow="4px 4px 0 black"
            transform="scale(1)"
            _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
          >
            Submit a project
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
            variant="outline"
            colorScheme="black"
            boxShadow="4px 4px 0 black"
            transform="scale(1)"
            _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
            isExternal
          >
            Submit a project
          </Button>
        )}
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Button
              variant="outline"
              colorScheme="black"
              boxShadow="4px 4px 0 black"
              transform="scale(1)"
              _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
            >
              {session ? (
                <Text>
                  {(session?.user?.name?.length > 15
                    ? `${session?.user?.name?.slice(
                        0,
                        4
                      )}...${session?.user?.name?.slice(-4)}`
                    : session?.user?.name) || session?.user?.email}
                </Text>
              ) : (
                <FaUserCircle />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent w={"auto"}>
            <PopoverBody>
              {session ? (
                <Button onClick={() => signOut()}>Sign Out</Button>
              ) : (
                <Button onClick={() => signIn()}>Sign in</Button>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </HStack>
  );
};

export default Navbar;
