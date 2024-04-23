import React, { useEffect, useState } from "react";
import { ROUTES } from "../utils/routes";
import { loadData } from "../utils/localStorage";
import { postChatGPTMessage } from "../utils/chatGPTUtil";
import {
  Flex,
  Heading,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaBrain, FaPlus, FaUser } from "react-icons/fa";

const Generator = ({ setPage, promptText, openAiKey }) => {
  const [profile, setProfile] = useState();
  const [message, setMessage] = useState();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      const profileLoaded = await loadData("profileText");
      setProfile(profileLoaded);
    };
    fetchJobData();
  }, []);

  const onGenerate = async () => {
    try {
      setIsGenerating(true);
      const promptFull = `
      USER PROFILE (All textual data from their LinkedIn page, use this info to craft your message)
      ${profile}
      ----
      ${promptText}
      `;
      console.log(promptFull);
      const chatGPTResponse = await postChatGPTMessage(promptFull, openAiKey);
      setMessage(chatGPTResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Flex flexDir={"column"} p={4}>
      <Flex
        flexDir={"row"}
        justify={"space-between"}
        alignItems={"center"}
        w={"full"}
        py={2}
        borderBottomWidth={5}
        mb={2}
      >
        <Heading fontSize={"xl"}>LinkedDont</Heading>
        <Flex flexDir={"row"} gap={2}>
          <Button
            isLoading={isGenerating}
            isDisabled={!profile || !openAiKey}
            rightIcon={<FaBrain />}
            colorScheme="purple"
            onClick={onGenerate}
          >
            Create Message
          </Button>
          <Button
            onClick={() => setPage(ROUTES.PROFILE)}
            isDisabled={isGenerating}
            rightIcon={<FaUser />}
          >
            Profile
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir={"column"} gap={2}>
        {!openAiKey && (
          <Alert status="warning" roundedRight={"md"} variant="left-accent">
            <AlertIcon />
            <AlertTitle>Missing OpenAI Credential</AlertTitle>
            <AlertDescription display={"flex"} gap={2}>
              Add a OpenAI API key in the Profile section
              <Button
                onClick={() => setPage(ROUTES.PROFILE)}
                rightIcon={<FaPlus />}
                colorScheme="orange"
                size={"xs"}
              >
                Add
              </Button>
            </AlertDescription>
          </Alert>
        )}
        {profile ? (
          <Alert status="success" roundedRight={"md"} variant="left-accent">
            <AlertIcon />
            <AlertTitle>Account Found!</AlertTitle>
            <AlertDescription>
              {profile.slice(0, 100)}...
            </AlertDescription>
          </Alert>
        ) : (
          <Alert status="warning" roundedRight={"md"} variant="left-accent">
            <AlertIcon />
            <AlertTitle>No account found in the active tab</AlertTitle>
            <AlertDescription display={"flex"} gap={2}>
              Navigate to a LinkedIn Account to continue
            </AlertDescription>
          </Alert>
        )}
      </Flex>
      {message && (
        <Box
          mt={2}
          bg={"gray.100"}
          rounded={"lg"}
          whiteSpace={"pre-line"}
          textAlign={"justify"}
          p={4}
        >
          {message}
        </Box>
      )}
    </Flex>
  );
};

export default Generator;
