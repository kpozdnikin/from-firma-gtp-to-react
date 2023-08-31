import fs from "fs";
import { OriginalFormat } from "./types";

export const findTargetRootNode = (targetId: string, item: OriginalFormat) => {
  let targetItem = null;

  const findItemRecursive = (item: OriginalFormat) => {
    if (item.id === targetId) {
      targetItem = item;

      return;
    }

    if (!item?.children?.length) {
      return;
    }

    item.children.forEach((child) => {
      if (child.id === targetId) {
        targetItem = child;

        return;
      }

      findItemRecursive(child);
    });
  };

  findItemRecursive(item);

  return targetItem;
};

async function saveDataToFile(data: any, filename: string) {
  return fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf-8");
}
