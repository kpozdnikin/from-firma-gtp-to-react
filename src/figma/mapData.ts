import { MappedFormat, OriginalFormat } from "../types";
import { figmaToCss } from "./figma.utils";

export const mapData = (item: OriginalFormat): MappedFormat => {
  const layoutStyles = figmaToCss(item);

  return {
    name: item.name,
    id: item.id,
    parent: null,
    type: item.type === "FRAME" ? "div" : item.type === "TEXT" ? "span" : "",
    text: item.characters || "",
    styles: {
      ...layoutStyles,
      backgroundColor: item.backgroundColor
        ? `rgba(${item?.backgroundColor?.r}, ${item?.backgroundColor?.g}, ${item?.backgroundColor?.b}, ${item?.backgroundColor?.a})`
        : "inherit",
      paddingLeft: item.paddingLeft,
      paddingRight: item.paddingRight,
      paddingTop: item.paddingTop,
      paddingBottom: item.paddingBottom || 0,
      width: item.absoluteBoundingBox.width,
      height: item.absoluteBoundingBox.height,
      ...(item.style?.fontFamily ? { fontFamily: item.style.fontFamily } : {}),
      ...(item.style?.fontWeight ? { fontWeight: item.style.fontWeight } : {}),
      ...(item.style?.fontSize ? { fontSize: item.style.fontSize } : {}),
      ...(item.style?.textAlignHorizontal ? { textAlign: item.style.textAlignHorizontal } : {}),
      ...(item.style?.textAlignVertical ? { verticalAlign: item.style.textAlignVertical } : {}),
      ...(item.style?.letterSpacing ? { letterSpacing: item.style.letterSpacing } : {}),
      ...(item.style?.lineHeightPx ? { lineHeight: `${item.style.lineHeightPx}px` } : {}),
    },
  };
};

export const mapDataRecursive = (item: OriginalFormat): MappedFormat[] => {
  const result: MappedFormat[] = [];

  const mapItemRecursive = (itemToMap: OriginalFormat) => {
    const mappedItem = mapData(itemToMap);
    console.log("itemToMap.name", itemToMap.name, "mappedItem.type", mappedItem.type);

    if (mappedItem.type) {
      result.push(mappedItem);
    }

    if (itemToMap?.children?.length) {
      itemToMap.children.forEach((child) => {
        mapItemRecursive(child);
      });
    }
  };

  mapItemRecursive(item);

  return result;
};
