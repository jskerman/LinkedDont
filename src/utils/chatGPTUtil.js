import axios from "axios";

const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

export const postChatGPTMessage = async (message, openAiKey) => {
  const config = {
    headers: {
      Authorization: `Bearer ${openAiKey}`,
    },
  };
  const userMessage = { role: "user", content: message };
  const data = {
    model: CHATGPT_MODEL,
    messages: [userMessage],
  };

  try {
    const response = await axios.post(CHATGPT_END_POINT, data, config);
    const message = response?.data?.choices[0]?.message.content;
    return message;
  } catch (error) {
    console.error(error);
  }
};
