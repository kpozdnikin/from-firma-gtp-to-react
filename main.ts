import 'dotenv/config';
import { fetchFigmaData } from './src/figma/figma.utils';
import { splitFigmaData, generateReactComponent, generateStyleModule, createComponentName } from './src/utils';
import * as fs from 'fs';
import * as path from 'path';

async function main() {
  try {
    console.log('Starting Figma data fetch...');
    
    // 1. Получаем данные из Figma
    const figmaData = await fetchFigmaData(process.env.FIGMA_FILE_ID as string);
    console.log('Successfully fetched Figma data');
    
    // 2. Сохраняем raw данные
    const figmaJsonPath = path.join(__dirname, 'figma.json');
    fs.writeFileSync(figmaJsonPath, JSON.stringify(figmaData, null, 2));
    console.log('Saved raw Figma data to:', figmaJsonPath);
    
    // 3. Разделяем на компоненты
    const components = splitFigmaData(figmaData);
    
    // 4. Создаем директорию для компонентов
    const componentsDir = path.join(__dirname, 'src/components');
    if (!fs.existsSync(componentsDir)) {
      fs.mkdirSync(componentsDir, { recursive: true });
    }
    
    // 5. Генерируем компоненты
    components.forEach((component) => {
      const componentName = createComponentName(component.name);
      const componentDir = path.join(componentsDir, componentName.toLowerCase());
      
      if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir);
      }
      
      // Создаем React компонент
      fs.writeFileSync(
        path.join(componentDir, `${componentName}.tsx`),
        generateReactComponent(component)
      );
      
      // Создаем CSS модуль
      fs.writeFileSync(
        path.join(componentDir, `${componentName}.module.css`),
        generateStyleModule(component)
      );
    });
    
    // 6. Создаем индексный файл
    generateIndexFile(components, componentsDir);
    
    console.log('Successfully generated all components');
    
  } catch (error) {
    console.error('Failed to process Figma data:', error);
    process.exit(1);
  }
}

function generateIndexFile(components: any[], dir: string): void {
  const indexContent = components
    .map((component) => {
      const name = createComponentName(component.name);
      return `export * from './${name.toLowerCase()}/${name}';`;
    })
    .join('\n');
    
  fs.writeFileSync(path.join(dir, 'index.ts'), indexContent);
}

main();
