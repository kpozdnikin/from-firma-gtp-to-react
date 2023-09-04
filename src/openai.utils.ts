import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/src/resources/chat/completions";
import { MappedFormat, UserPrompt } from "./types";

const OPENAI_API_KEY = process.env.CHAT_GPT_API_KEY;
const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;
const INTRO_MESSAGE =
  "You are a helpful assistant that converts Figma JSON with styles to TSX. " +
  "I will send you json object, please give me react typescript component as a result in the format which I can copy and paste into .tsx file and it will work.";

const openai = new OpenAI({
  organization: OPEN_AI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

export const convertFigmaJsonToHtml = async (jsonItem: MappedFormat): Promise<any> => {
  if (!OPENAI_API_KEY) {
    throw new Error("NO OPENAI ACCESS TOKEN");
  }

  const userPrompt: UserPrompt = {
    role: "user",
    content: JSON.stringify(jsonItem),
  };

  const messages: CreateChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: INTRO_MESSAGE,
    },
    { ...userPrompt },
  ];

  return openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });
};
