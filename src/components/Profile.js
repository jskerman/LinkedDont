import React, { useState } from "react";
import { ROUTES } from "../utils/routes";
import { saveData } from "../utils/localStorage";
import {
  Flex,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FaArrowLeft, FaSave } from "react-icons/fa";

const Profile = ({ setPage, promptText, setPrompt, openAiKey, setOpenAiKey }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      const formData = new FormData(e.target);
      const updatedPrompt = formData.get("prompt");
      const updatedOpenAiKey = formData.get("openAiKey");
      setPrompt(updatedPrompt);
      setOpenAiKey(updatedOpenAiKey);
      saveData("prompt", updatedPrompt);
      saveData("openAiKey", updatedOpenAiKey);
    } catch (error) {
      console.error("Error Submitting Profile Form...");
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
        <Heading fontSize={"xl"}>Your Profile</Heading>
        <Flex flexDir={"row"} gap={2}>
          <Button
            onClick={() => setPage(ROUTES.GENERATOR)}
            rightIcon={<FaArrowLeft />}
            isDisabled={isSubmitting}
          >
            Back
          </Button>
        </Flex>
      </Flex>

      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel fontSize={"sm"}>OpenAI Key</FormLabel>
          <Input
            id="openAiKey"
            name="openAiKey"
            type="text"
            placeholder="sk-...1234"
            defaultValue={openAiKey}
            size={"sm"}
          />
          <FormHelperText fontSize={"xs"}>
            We'll never share / save your key.
          </FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize={"sm"}>Message Prompt</FormLabel>
          <Textarea
            id="prompt"
            name="prompt"
            placeholder="Write a semi-formal message e  xplaining why we should catch-up..."
            defaultValue={promptText}
            rows={12}
            size={"sm"}
          />
          <FormHelperText fontSize={"xs"}>
            We will never share / save your prompt.
          </FormHelperText>
        </FormControl>
        <Button
          rightIcon={<FaSave />}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default Profile;
