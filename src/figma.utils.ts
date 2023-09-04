import axios from "axios";
import dotenv from "dotenv";
import { CssLayout, FigmaData, OriginalFormat } from "./types";

dotenv.config();

const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID;
const FIGMA_ACCESS_TOKEN = process.env.FIRMA_API_KEY;

export const fetchFigmaData = async (): Promise<FigmaData> => {
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
};

export const figmaToCss = (figmaObject: OriginalFormat): CssLayout => {
  const css: CssLayout = {
    display: "flex",
    flexDirection: figmaObject.layoutMode === "HORIZONTAL" ? "row" : "column",
  };

  if (figmaObject.primaryAxisAlignItems === "SPACE_BETWEEN") {
    css.justifyContent = "space-between";
  } else {
    if (figmaObject.layoutMode === "HORIZONTAL") {
      switch (figmaObject.primaryAxisAlignItems) {
        case "MIN":
          css.justifyContent = "flex-start";
          break;
        case "CENTER":
          css.justifyContent = "center";
          break;
        case "MAX":
          css.justifyContent = "flex-end";
          break;
      }
    } else {
      switch (figmaObject.primaryAxisAlignItems) {
        case "MIN":
          css.justifyContent = "flex-start";
          break;
        case "CENTER":
          css.justifyContent = "center";
          break;
        case "MAX":
          css.justifyContent = "flex-end";
          break;
      }
    }
  }

  switch (figmaObject.counterAxisAlignItems) {
    case "MIN":
      css.alignItems = "flex-start";
      break;
    case "CENTER":
      css.alignItems = "center";
      break;
    case "MAX":
      css.alignItems = "flex-end";
      break;
    case "BASELINE":
      css.alignItems = "baseline";
      break;
  }

  return css;
};
