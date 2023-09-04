import React from "react";

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(0.0431, 0.0745, 0.1569, 1)",
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
        paddingBottom: 0,
        width: 1200,
        height: 73,
      }}
    >
      {children}
    </div>
  );
};

export default Header;
