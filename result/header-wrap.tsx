import React from 'react';
import styled from 'styled-components';

const HeaderWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  padding-bottom: 0;
  width: 1152px;
  height: 41px;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrap>
      {/* Add your content here */}
    </HeaderWrap>
  );
};

export default Header;