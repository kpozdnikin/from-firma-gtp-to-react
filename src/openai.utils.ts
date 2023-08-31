import OpenAI from "openai";

const OPENAI_API_KEY = process.env.CHAT_GPT_API_KEY;
const OPEN_AI_ORG_ID = process.env.OPEN_AI_ORG_ID;

const openai = new OpenAI({
  organization: OPEN_AI_ORG_ID,
  apiKey: OPENAI_API_KEY,
});

async function convertFigmaJsonToHtml(figmaJson: any): Promise<any> {
  if (!OPENAI_API_KEY) {
    throw new Error("NO OPENAI ACCESS TOKEN");
  }

  const response = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant that converts Figma JSON with styles to HTML." },
      { role: "user", content: JSON.stringify(figmaJson) },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log("response", response);

  return response;
}
