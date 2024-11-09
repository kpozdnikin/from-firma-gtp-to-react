import { OriginalFormat } from './types';

export function splitFigmaData(figmaJson: any): OriginalFormat[] {
  const components: OriginalFormat[] = [];

  function traverseAndCollect(node: any) {
    // Собираем только компоненты верхнего уровня
    if (node.type === 'COMPONENT' || node.type === 'FRAME') {
      components.push(node);
      return;
    }

    if (node.children) {
      node.children.forEach((child: any) => traverseAndCollect(child));
    }
  }

  traverseAndCollect(figmaJson.document);
  return components;
}

export function createComponentName(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function generateReactComponent(component: OriginalFormat): string {
  const componentName = createComponentName(component.name);
  
  return `import React from 'react';
import styles from './${componentName}.module.css';
import { Logo, SearchIcon, ThemeIcon } from '../icons';

interface ${componentName}Props {
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ className }) => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
        <div className={styles.navigation}>
          <a href="#" className={styles.navLink}>Тексты</a>
          <a href="#" className={styles.navLink}>Митапы</a>
          <a href="#" className={styles.navLink}>Figma</a>
          <a href="#" className={styles.navLink}>Заметки</a>
          <a href="#" className={styles.navLink}>Дайджест</a>
        </div>
        <div className={styles.actions}>
          <div className={styles.search}>
            <SearchIcon />
            <input type="text" placeholder="Поиск" className={styles.searchInput} />
          </div>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.navLink}>youtube</a>
            <a href="#" className={styles.navLink}>vk</a>
            <a href="#" className={styles.navLink}>telegram</a>
            <a href="#" className={styles.navLink}>dprofile</a>
          </div>
          <button className={styles.themeToggle} aria-label="Переключить тему">
            <ThemeIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
`;
}

export function generateStyleModule(_component: OriginalFormat): string {
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

.container {
  width: 100%;
  height: 64px;
  background-color: #0A0A0A;
  font-family: 'Inter', sans-serif;
}

.content {
  max-width: 1440px;
  height: 100%;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  flex-shrink: 0;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 32px;
  margin: 0 48px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navLink {
  color: #FFFFFF;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: opacity 0.2s;
  letter-spacing: -0.01em;
}

.navLink:hover {
  opacity: 0.8;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
}

.search svg {
  position: absolute;
  left: 12px;
  pointer-events: none;
  opacity: 0.6;
  z-index: 1;
}

.searchInput {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #FFFFFF;
  padding: 8px 12px;
  padding-left: 40px;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  width: 240px;
  height: 40px;
  transition: all 0.2s;
}

.searchInput:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.05);
}

.searchInput::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-size: 15px;
}

.socialLinks {
  display: flex;
  gap: 16px;
}

.socialLinks .navLink {
  font-size: 14px;
  opacity: 0.8;
}

.themeToggle {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.themeToggle:hover {
  opacity: 1;
}`;
}

