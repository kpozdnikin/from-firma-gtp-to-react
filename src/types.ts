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
  backgroundColor?: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  style?: {
    fontFamily?: string;
    fontWeight?: number;
    fontSize?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
    letterSpacing?: number;
    lineHeightPx?: number;
  };
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

export interface MappedFormat {
  name: string;
  id: string;
  parent: string | null;
  type: string;
  text: string;
  styles: Record<string, any>;
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