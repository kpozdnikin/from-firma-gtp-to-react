import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "rgba(0.04313725605607033, 0.07450980693101883, 0.1568627506494522, 1)",
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

type HeaderWrapProps = {
  children?: React.ReactNode;
};

const HeaderWrap: React.FC<HeaderWrapProps> = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0)",
        paddingBottom: 0,
        width: 1152,
        height: 41,
      }}
    >
      {children}
    </div>
  );
};
