import React, { ReactElement } from 'react';

interface ItemProps {
  id: string;
  styles: {
    display: string;
    flexDirection: string;
    alignItems: string;
    backgroundColor: string;
    paddingBottom: number;
    width: number;
    height: number;
  };
}

const Item = ({ id, styles }: ItemProps): ReactElement => {
  return (
    <div
      id={id}
      style={{
        display: styles.display,
        flexDirection: styles.flexDirection,
        alignItems: styles.alignItems,
        backgroundColor: styles.backgroundColor,
        paddingBottom: styles.paddingBottom,
        width: styles.width,
        height: styles.height,
      }}
    ></div>
  );
};

export default Item;