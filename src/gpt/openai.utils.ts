import fs from "fs";
import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/src/resources/chat/completions";
import dotenv from "dotenv";
import { MappedFormat, OriginalFormat, UserPrompt } from "../types";
import { readFile } from "../utils";

dotenv.config();

const OPENAI_API_KEY = process.env.CHAT_GPT_API_KEY;
const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;
const OPENAI_FINE_TUNNING_JOB_ID = process.env.OPENAI_FINE_TUNNING_JOB_ID;
const INTRO_MESSAGE =
  "You are a helpful assistant that converts Figma JSON with styles to TSX. " +
  "I will send you json object, please convert it to a react typescript component which I can copy and paste into .tsx file and it will work properly without any bugs.";

const openai = new OpenAI({
  organization: OPEN_AI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

/* response example:
uploadedFile {
  object: 'file',
  id: 'file-T0NbTwWlyq4Wfus0ZQ5t9pLG',
  purpose: 'fine-tune',
  filename: 'fineTune.json',
  bytes: 785,
  created_at: 1693916826,
  status: 'uploaded',
  status_details: null
}
 */
export const createFineTuningFile = () => {
  return openai.files.create({
    file: fs.createReadStream("fineTune.jsonl"),
    purpose: "fine-tune",
  });
};

export const createFineTuningJob = (fileName: string) => {
  return openai.fineTuning.jobs.create({
    model: "gpt-3.5-turbo",
    training_file: fileName,
  });
};

export const retrieveFineTuningJob = () => {
  return openai.fineTuning.jobs.retrieve(OPENAI_FINE_TUNNING_JOB_ID);
};

export const convertFigmaJsonToHtml = async (jsonItem: MappedFormat) => {
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
    model: `ft:gpt-3.5-turbo-0613:usetech::7vlSlcrp`,
  });
};

export const convertJsonToTsx = async () => {
  const rawData = await readFile("figmaDataMapped.json", "utf-8");
  const jsonData: MappedFormat[] = JSON.parse(rawData);

  try {
    for (const item of jsonData) {
      const itemResult = await convertFigmaJsonToHtml(item);

      await fs.writeFileSync(`./result/${item.name}.tsx`, itemResult?.choices?.[0]?.message?.content);
    }
  } catch (error) {
    console.error("Произошла ошибка convertJsonToTsx:", error);
  }
};

const PROMPT_MESSAGE = `You are a helpful assistant that converts Figma JSON with styles to TSX. 
  I will send you json object, please convert it to a react typescript component which I can copy and paste into .tsx file and it will work properly without any bugs. 
  ## constraints
  - do not omit any details in TSX
  - write only tsx
  - don not use comments
  - use styled components for styling
  `;

export const getModels = async () => {
  return openai.models.list();
};

export const convertFigmaJsonToReactComponent = async (componentName: string) => {
  try {
    const jsonItemString: string = await readFile(`./src/figma/json-components/${componentName}.json`, "utf-8");
    const jsonItem: OriginalFormat = JSON.parse(jsonItemString);

    const userPrompt: UserPrompt = {
      role: "user",
      content: JSON.stringify(jsonItem),
    };

    const messages: CreateChatCompletionRequestMessage[] = [
      {
        role: "system",
        content: PROMPT_MESSAGE,
      },
      { ...userPrompt },
    ];

    return openai.chat.completions.create({
      messages,
      model: "gpt-4",
      temperature: 0,
    });
  } catch (e) {
    throw new Error(`convertFigmaJsonToReactComponent error ${e}`);
  }
};
