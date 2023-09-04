import React from 'react';

interface MenuLabelProps {
  text: string;
}

const MenuLabel: React.FC<MenuLabelProps> = ({ text }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'inherit', paddingBottom: 0, width: 76, height: 20 }}>
      {text}
    </div>
  );
};

export default MenuLabel;