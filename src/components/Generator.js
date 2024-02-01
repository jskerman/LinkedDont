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
  Text,
} from "@chakra-ui/react";
import { FaBrain, FaPlus, FaUser } from "react-icons/fa";

const Generator = ({ setPage, resume, openAiKey }) => {
  const [jobTitle, setJobTitle] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [coverLetter, setCoverLetter] = useState();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      const loadedJobTitle = await loadData("jobTitle");
      const loadedJobDescription = await loadData("jobDescription");
      setJobTitle(loadedJobTitle);
      setJobDescription(loadedJobDescription);
    };
    fetchJobData();
  }, []);

  const onGenerate = async () => {
    try {
      setIsGenerating(true);
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\nJOB DESCRIPTION:\n${jobDescription}`;
      const chatGPTResponse = await postChatGPTMessage(message, openAiKey);
      setCoverLetter(chatGPTResponse);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };
  return (
    <Flex flexDir={"column"} p={4}>
      {/* Header Section */}
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
            isDisabled={!jobTitle || !openAiKey}
            rightIcon={<FaBrain />}
            colorScheme="purple"
            onClick={onGenerate}
          >
            Generate
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
        {/* Cover Letter Section */}
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
        {jobTitle ? (
          <Alert status="success" roundedRight={"md"} variant="left-accent">
            <AlertIcon />
            <AlertTitle>Job Posting Found!</AlertTitle>
            <AlertDescription>{jobTitle}</AlertDescription>
          </Alert>
        ) : (
          <Alert status="warning" roundedRight={"md"} variant="left-accent">
            <AlertIcon />
            <AlertTitle>No job posting found in the active tab</AlertTitle>
            <AlertDescription display={"flex"} gap={2}>
              Navigate to a LinkedIn job posting to continue
            </AlertDescription>
          </Alert>
        )}
      </Flex>
      {coverLetter && (
        <Box
          mt={2}
          bg={"gray.100"}
          rounded={"lg"}
          whiteSpace={"pre-line"}
          textAlign={"justify"}
          p={4}
        >
          {coverLetter}
        </Box>
      )}
    </Flex>
  );
};

export default Generator;
