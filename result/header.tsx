import React from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const styles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'rgba(0.04313725605607033, 0.07450980693101883, 0.1568627506494522, 1)',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 16,
    paddingBottom: 0,
    width: 1200,
    height: 73,
  };

  return <div style={styles}>{children}</div>;
};

export default Header;