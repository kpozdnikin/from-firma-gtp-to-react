import axios, { AxiosError } from 'axios';

interface FigmaResponse {
  document: any;
  components: any;
  styles: any;
}

export async function fetchFigmaData(fileId: string): Promise<FigmaResponse> {
  const FIGMA_ACCESS_TOKEN = process.env.FIRMA_API_KEY;
  
  if (!FIGMA_ACCESS_TOKEN) {
    throw new Error('FIRMA_API_KEY is not defined');
  }

  if (!fileId) {
    throw new Error('FIGMA_FILE_ID is not defined');
  }

  const url = `https://api.figma.com/v1/files/${fileId}`;
  console.log('Fetching Figma data from:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Figma API Error:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        headers: axiosError.response?.headers
      });

      if (axiosError.response?.status === 404) {
        throw new Error(`Figma file with ID ${fileId} not found`);
      }
      if (axiosError.response?.status === 403) {
        throw new Error('Invalid Figma access token or insufficient permissions');
      }
    }
    throw error;
  }
}

export function figmaToCss(node: any) {
  const styles: Record<string, any> = {};

  // Базовое позиционирование
  if (node.absoluteBoundingBox) {
    styles.position = 'absolute';
    styles.left = `${node.absoluteBoundingBox.x}px`;
    styles.top = `${node.absoluteBoundingBox.y}px`;
    styles.width = `${node.absoluteBoundingBox.width}px`;
    styles.height = `${node.absoluteBoundingBox.height}px`;
  }

  // Фон для header
  if (node.backgroundColor) {
    const { r, g, b, a } = node.backgroundColor;
    styles.backgroundColor = `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
  }

  // Навигационные элементы
  if (node.layoutMode) {
    styles.display = 'flex';
    styles.flexDirection = node.layoutMode.toLowerCase() === 'horizontal' ? 'row' : 'column';
    styles.justifyContent = 'space-between';
    styles.alignItems = 'center';
  }

  // Текстовые стили для навигации
  if (node.style) {
    if (node.style.fontFamily) styles.fontFamily = node.style.fontFamily;
    if (node.style.fontSize) styles.fontSize = `${node.style.fontSize}px`;
    if (node.style.fontWeight) styles.fontWeight = node.style.fontWeight;
    if (node.style.textAlignHorizontal) styles.textAlign = node.style.textAlignHorizontal.toLowerCase();
    if (node.style.letterSpacing) styles.letterSpacing = `${node.style.letterSpacing}px`;
    if (node.style.lineHeightPx) styles.lineHeight = `${node.style.lineHeightPx}px`;
    
    // Добавляем цвет текста
    if (node.characters) {
      styles.color = '#FFFFFF';
      styles.textDecoration = 'none';
      styles.cursor = 'pointer';
    }
  }

  return styles;
}
