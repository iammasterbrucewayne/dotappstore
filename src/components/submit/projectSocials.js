import { Flex, Spinner, Heading, Text, Input, Button, FormControl, FormLabel, HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";

export default function ProjectSocials({ setSubmitStage, pushProject }) {
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTwitterChange = (event) => {
    setTwitter(event.target.value);
  };

  const handleDiscordChange = (event) => {
    setDiscord(event.target.value);
  };

  const handleTelegramChange = (event) => {
    setTelegram(event.target.value);
  };

  return (
    <VStack maxW="6xl" w="full" align="start" gap={6} mx="auto" px={8} mt={8}>
      <Heading fontWeight="black">Socials</Heading>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Twitter</Text>
            <Text fontWeight="normal" color="gray.500"></Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="Project Username"
          width={"full"}
          value={twitter}
          onChange={handleTwitterChange}
          maxLength={40}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Discord</Text>
            <Text fontWeight="normal" color="gray.500">
              Optional
            </Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="https://discord.gg/project"
          width={"full"}
          value={discord}
          onChange={handleDiscordChange}
          maxLength={40}
        />
      </FormControl>
      <FormControl>
        <FormLabel>
          <HStack justifyContent="space-between">
            <Text>Telegram</Text>
            <Text fontWeight="normal" color="gray.500">
              Optional
            </Text>
          </HStack>
        </FormLabel>
        <Input
          placeholder="https://t.me/project"
          width={"full"}
          value={telegram}
          onChange={handleTelegramChange}
          maxLength={40}
        />
      </FormControl>

      <HStack w="full" justify="space-between">
        <Button
          variant="outline"
          colorScheme="black"
          boxShadow="4px 4px 0 black"
          transform="scale(1)"
          marginTop={4}
          px={8}
          py={6}
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
          isExternal
          isDisabled={loading}
          onClick={() => {
            setSubmitStage(2);
          }}
        >
          Go back
        </Button>
        <Button
          variant="outline"
          colorScheme="black"
          boxShadow="4px 4px 0 black"
          leftIcon={loading ? <Spinner /> : null}
          transform="scale(1)"
          marginTop={4}
          px={8}
          py={6}
          _hover={{ textDecoration: "none", transform: "scale(1.03)" }}
          isExternal
          isDisabled={!twitter || loading}
          onClick={async () => {
            const socials = {
              twitter: twitter,
              discord: discord,
              telegram: telegram,
            };
            setLoading(true);
            await pushProject(socials);
            setLoading(false);
          }}
        >
          Submit Project
        </Button>
      </HStack>
    </VStack>
  );
}
