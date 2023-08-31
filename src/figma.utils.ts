import axios from "axios";
import { FigmaData } from "./types";

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIRMA_API_KEY;

async function fetchFigmaData(): Promise<FigmaData> {
  if (!FIGMA_FILE_ID) {
    throw new Error("NO FIGMA FILE ID");
  }

  if (!FIGMA_ACCESS_TOKEN) {
    throw new Error("NO FIGMA ACCESS TOKEN");
  }

  const response = await axios.get(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}`, {
    headers: {
      "X-Figma-Token": FIGMA_ACCESS_TOKEN,
    },
  });

  return response.data;
}
