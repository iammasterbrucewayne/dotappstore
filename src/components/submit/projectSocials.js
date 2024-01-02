import { Flex, Spinner, Heading, Text, Input, Button } from "@chakra-ui/react";
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
    <Flex flexDir={"column"} gap={10} w={"full"}>
      <Heading>Socials</Heading>
      <Flex flexDir={"column"} width={"full"}>
        <Text fontSize={"2xl"}>Twitter</Text>
        <Input
          placeholder="Project Username"
          width={"full"}
          value={twitter}
          onChange={handleTwitterChange}
          maxLength={40}
        />
      </Flex>
      <Flex flexDir={"column"} width={"full"}>
        <Flex justify={"space-between"}>
          <Text fontSize={"2xl"}>Discord</Text>
          <Text> Optional</Text>
        </Flex>
        <Input
          placeholder="https://discord.gg/project"
          width={"full"}
          value={discord}
          onChange={handleDiscordChange}
          maxLength={40}
        />
      </Flex>
      <Flex flexDir={"column"} width={"full"}>
        <Flex justify={"space-between"}>
          <Text fontSize={"2xl"}>Telegram</Text>
          <Text> Optional</Text>
        </Flex>
        <Input
          placeholder="https://t.me/project"
          width={"full"}
          value={telegram}
          onChange={handleTelegramChange}
          maxLength={40}
        />
      </Flex>
      <Flex flexDir={"row"} justify={"space-between"} marginTop={8}>
        <Button
          variant="outline"
          colorScheme="black"
          boxShadow="4px 4px 0 black"
          transform="scale(1)"
          marginTop={4}
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
      </Flex>
    </Flex>
  );
}
