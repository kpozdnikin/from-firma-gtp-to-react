import fs from "fs";
import util from "util";
import axios from "axios";
import dotenv from "dotenv";
import {MappedFormat, OriginalFormat} from "./src/types";
import { findTargetRootNode } from "./src/utils";
import {mapDataRecursive} from "./src/mapData";

dotenv.config();

const ID_TO_FIND = process.env.TARGET_ROOT_ID;


// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

async function readAndConvertData() {
  try {
    // Чтение данных из figmaData.json
    const rawData = await readFile("figmaData.json", "utf-8");
    const jsonData: { document: OriginalFormat } = JSON.parse(rawData);
    const originalData: OriginalFormat = findTargetRootNode(ID_TO_FIND, jsonData.document);
    const mappedData: MappedFormat[] = mapDataRecursive(originalData);

    await fs.writeFileSync("figmaDataMapped.json", JSON.stringify(mappedData, null, 2));

    console.log("Преобразование завершено. Результат сохранен в figmaDataMapped.json");
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

(async () => {
  // const figmaData = await fetchFigmaData();
  // console.log("figmaData", JSON.stringify(figmaData));
  // await saveDataToFile(figmaData, "figmaData.json");
  await readAndConvertData();
  // const fileResponse = await openai.files.create({ file: fs.createReadStream("figmaData.json"), purpose: "fine-tune" });
  // console.log("fileResponse", fileResponse);
  // const htmlContent = await convertFigmaJsonToHtml(figmaData);
})();
