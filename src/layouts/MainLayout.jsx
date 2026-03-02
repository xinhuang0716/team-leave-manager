import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2vh 5%;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 2vh 3%;
  }
`;

const MainLayout = ({ children }) => (
  <LayoutContainer>
    <Sidebar />
    <ContentArea>{children}</ContentArea>
  </LayoutContainer>
);

export default MainLayout;
