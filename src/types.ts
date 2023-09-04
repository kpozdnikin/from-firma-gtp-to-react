export interface OriginalFormat {
  id: string;
  name: string;
  type: string;
  children?: OriginalFormat[];
  characters?: string;
  absoluteBoundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  background: {
    blendMode: string;
    type: string;
    color: {
      r: number;
      g: number;
      b: number;
      a: number;
    };
  }[];
  backgroundColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  itemSpacing: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom?: number;
  layoutMode?: "HORIZONTAL" | "VERTICAL";
  primaryAxisAlignItems?: "SPACE_BETWEEN" | "CENTER" | "MIN" | "MAX";
  counterAxisAlignItems: "CENTER" | "MIN" | "MAX" | "BASELINE";
}

export interface MappedFormat {
  name: string;
  id: string;
  parent: null | string;
  type: string;
  text?: string;
  styles: {
    backgroundColor: string;
    paddingLeft: number;
    paddingRight: number;
    paddingTop: number;
    paddingBottom?: number;
    width: number;
    height: number;
  };
}

export interface FigmaData {
  document: OriginalFormat;
}

export interface CssLayout {
  display: string;
  flexDirection: string;
  justifyContent?: string;
  alignItems?: string;
}
export interface UserPrompt {
  role: "user";
  content: string;
}
