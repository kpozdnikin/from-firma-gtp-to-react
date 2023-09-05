import {convertJsonToTsx, createFineTuningFile, createFineTuningJob} from "./src/gpt/openai.utils";
import { readAndConvertData } from "./src/figma/figma.utils";

(async () => {
  // const figmaData = await fetchFigmaData();
  // console.log("figmaData", JSON.stringify(figmaData));
  // await saveDataToFile(figmaData, "figmaData.json");
  /*
  const uploadedFile = await createFineTuningFile();
  console.log("uploadedFile", uploadedFile);
  */
  const fineTuningJob = await createFineTuningJob("file-dP8HRSjkxAvaDeq09JbPXfpZ");
  console.log("fineTuningJob", fineTuningJob);
  // await readAndConvertData();
  // await convertJsonToTsx();
  // const fileResponse = await openai.files.create({ file: fs.createReadStream("figmaData.json"), purpose: "fine-tune" });
  // console.log("fileResponse", fileResponse);
  // const htmlContent = await convertFigmaJsonToHtml(figmaData);
})();
