import React from 'react';

interface MenuProps {
  id: string;
  styles: {
    display: string;
    flexDirection: string;
    backgroundColor: string;
    paddingBottom: number;
    width: number;
    height: number;
  };
}

const Menu: React.FC<MenuProps> = ({ id, styles }) => {
  return (
    <div id={id} style={styles}>
      {/* Add your menu content here */}
    </div>
  );
}

export default Menu;