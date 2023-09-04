import React from 'react';

interface MyComponentProps {
  name: string;
  id: string;
  parent: string | null;
  type: string;
  text: string;
  styles: {
    display?: string;
    flexDirection?: string;
    backgroundColor?: string;
    paddingBottom?: number;
    width: number;
    height: number;
  };
}

const MyComponent: React.FC<MyComponentProps> = ({
  name,
  id,
  parent,
  type,
  text,
  styles,
}) => {
  return (
    <div
      style={{
        display: styles.display,
        flexDirection: styles.flexDirection,
        backgroundColor: styles.backgroundColor,
        paddingBottom: styles.paddingBottom,
        width: styles.width,
        height: styles.height,
      }}
    >
      {/* component content */}
    </div>
  );
};

export default MyComponent;