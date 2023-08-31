import { MappedFormat, OriginalFormat } from "./types";

export const mapData = (item: OriginalFormat): MappedFormat => ({
  name: item.name,
  id: item.id,
  parent: null,
  type: "div",
  styles: {
    backgroundColor: `rgba(${item?.backgroundColor?.r}, ${item?.backgroundColor?.g}, ${item?.backgroundColor?.b}, ${item?.backgroundColor?.a})`,
    paddingLeft: item.paddingLeft,
    paddingRight: item.paddingRight,
    paddingTop: item.paddingTop,
    paddingBottom: item.paddingBottom || 0,
    width: item.absoluteBoundingBox.width,
    height: item.absoluteBoundingBox.height,
  },
});

export const mapDataRecursive = (item: OriginalFormat): MappedFormat[] => {
  const result: MappedFormat[] = [];

  const mapItemRecursive = (itemToMap: OriginalFormat) => {
    const mappedItem = mapData(itemToMap);

    result.push(mappedItem);

    if (itemToMap?.children?.length) {
      itemToMap.children.forEach((child) => {
        mapItemRecursive(child);
      });
    }
  };

  mapItemRecursive(item);

  return result;
};
