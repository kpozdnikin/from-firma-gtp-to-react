import axios from 'axios';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';

dotenv.config();

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIRMA_API_KEY;
const OPENAI_API_KEY = process.env.CHAT_GPT_API_KEY;
const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;

const openai = new OpenAI({
  organization: OPEN_AI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

console.log('FIGMA_FILE_ID', FIGMA_FILE_ID);

function saveDataToFile(data: any, filename: string) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
}

async function fetchFigmaData(): Promise<any> {
  if (!FIGMA_FILE_ID) {
    throw new Error("NO FIGMA FILE ID");
  }

  if (!FIGMA_ACCESS_TOKEN) {
    throw new Error("NO FIGMA ACCESS TOKEN");
  }

  const response = await axios.get(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`, {
    headers: {
      'X-Figma-Token': FIGMA_ACCESS_TOKEN
    }
  });

  return response.data;
}

async function convertFigmaJsonToHtml(figmaJson: any): Promise<any> {
  if (!OPENAI_API_KEY) {
    throw new Error("NO OPENAI ACCESS TOKEN");
  }

  const response = await openai.chat.completions.create({ messages: [
      { role: 'system', content: 'You are a helpful assistant that converts Figma JSON with styles to HTML.' },
      { role: 'user', content: JSON.stringify(figmaJson) }
    ], model: 'gpt-3.5-turbo' });

  console.log("response", response);

  return response;
}

(async () => {
  const figmaData = await fetchFigmaData();

  console.log("figmaData", JSON.stringify(figmaData));

  saveDataToFile(figmaData, 'figmaData.json');

  // const htmlContent = await convertFigmaJsonToHtml(figmaData);
})();