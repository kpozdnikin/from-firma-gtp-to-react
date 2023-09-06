import OpenAI from "openai";
import dotenv from "dotenv";
import {
  convertJsonToTsx,
  createFineTuningFile,
  createFineTuningJob,
  retrieveFineTuningJob,
} from "./src/gpt/openai.utils";
import { fetchFigmaData, readAndConvertData } from "./src/figma/figma.utils";
import { saveDataToFile } from "./src/utils";
import FileObject = OpenAI.FileObject;

dotenv.config();

const OPENAI_FILE_ID = process.env.OPENAI_FILE_ID;
const OPENAI_FINE_TUNNINT_JOB_ID = process.env.OPENAI_FINE_TUNNINT_JOB_ID;

(async () => {
  // 1. Fetch data from figma
  // const figmaData = await fetchFigmaData();
  // console.log("figmaData", JSON.stringify(figmaData));
  // 2. Save data from figma into a file
  // await saveDataToFile(figmaData, "figmaData.json");
  // 3. Convert data to a more simple format
  await readAndConvertData();
  /*
  const uploadedFile: FileObject = await createFineTuningFile();
  console.log("uploadedFile", uploadedFile);
  */

  /*
  const fineTuningJob = await createFineTuningJob(OPENAI_FILE_ID);
  console.log("fineTuningJob", fineTuningJob);
  */

  /*
  const job = await retrieveFineTuningJob();
  console.log("job", job);

  await convertJsonToTsx();
  */
})();
