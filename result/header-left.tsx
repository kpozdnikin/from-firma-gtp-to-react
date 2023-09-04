import React from 'react';

interface HeaderLeftProps {
  children: React.ReactNode;
}

const HeaderLeft: React.FC<HeaderLeftProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingBottom: 0,
        width: 641,
        height: 41,
      }}
    >
      {children}
    </div>
  );
};

export default HeaderLeft;