import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/src/resources/chat/completions";
import { MappedFormat, UserPrompt } from "./types";

const OPENAI_API_KEY = process.env.CHAT_GPT_API_KEY;
const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;

const openai = new OpenAI({
  organization: OPEN_AI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

export const convertFigmaJsonToHtml = async (jsonData: MappedFormat[]): Promise<any> => {
  if (!OPENAI_API_KEY) {
    throw new Error("NO OPENAI ACCESS TOKEN");
  }

  const jsonUserText: UserPrompt[] = jsonData.map((jsonItem: MappedFormat) => ({
    role: "user",
    content: JSON.stringify(jsonItem),
  }));

  const messages: CreateChatCompletionRequestMessage[] = [
    {
      role: "system",
      content:
        "You are a helpful assistant that converts Figma JSON with styles to TSX. I will send you json objects, please give me react typescript components as a result",
    },
    ...jsonUserText,
  ];

  console.log("jsonUserText", jsonUserText, "messages", messages);

  const response = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
  });

  return response;
};
