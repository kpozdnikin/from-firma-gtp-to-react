import dotenv from "dotenv";
import { convertFigmaJsonToReactComponent, getModels } from "./src/gpt/openai.utils";

dotenv.config();

(async () => {
  // 1. Fetch data from figma
  // const figmaData = await fetchFigmaData();
  // console.log("figmaData", JSON.stringify(figmaData));
  // 2. Save data from figma into a file
  // await saveDataToFile(figmaData, "figmaData.json");
  // 3. Split data to a separate objects without children key
  // 4. Convert each object to a separate tsx component in a separate file
  const result = await getModels();
  // const result = await convertFigmaJsonToReactComponent("header");

  console.log("result", result);
  // 5. Build the app to render everything in a one file
})();
