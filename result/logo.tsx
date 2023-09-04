import React from 'react';

interface LogoProps {
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({ style }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        paddingBottom: 0,
        width: 111,
        height: 41,
        ...style,
      }}
    >
      {/* Add logo content here */}
    </div>
  );
};

export default Logo;