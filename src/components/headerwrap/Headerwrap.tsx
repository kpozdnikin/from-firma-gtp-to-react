import React from 'react';
import styles from './Headerwrap.module.css';
import { Logo, SearchIcon, ThemeIcon } from '../icons';

interface HeaderwrapProps {
  className?: string;
}

export const Headerwrap: React.FC<HeaderwrapProps> = ({ className }) => {
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
