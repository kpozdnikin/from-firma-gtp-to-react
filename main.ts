import fs from "fs";
import util from "util";
import axios from "axios";
import dotenv from "dotenv";
import { MappedFormat, OriginalFormat } from "./src/types";
import { findTargetRootNode } from "./src/utils";
import { mapDataRecursive } from "./src/mapData";
import { figmaToCss } from "./src/figma.utils";
import { convertFigmaJsonToHtml } from "./src/openai.utils";

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

async function convertJsonToTsx() {
  const rawData = await readFile("figmaDataMapped.json", "utf-8");

  console.log("rawData", rawData);

  const jsonData: MappedFormat[] = JSON.parse(rawData);

  console.log("jsonData", jsonData);

  try {
    for (const item of jsonData) {
      const itemResult = await convertFigmaJsonToHtml(item);

      console.log("item", item, "itemResult", itemResult);

      await fs.writeFileSync(`./result/${item.name}.tsx`, itemResult?.choices?.[0]?.message?.content);
    }
  } catch (error) {
    console.error("Произошла ошибка convertJsonToTsx:", error);
  }
}

(async () => {
  // const figmaData = await fetchFigmaData();
  // console.log("figmaData", JSON.stringify(figmaData));
  // await saveDataToFile(figmaData, "figmaData.json");
  // await readAndConvertData();
  await convertJsonToTsx();
  // const fileResponse = await openai.files.create({ file: fs.createReadStream("figmaData.json"), purpose: "fine-tune" });
  // console.log("fileResponse", fileResponse);
  // const htmlContent = await convertFigmaJsonToHtml(figmaData);
})();
