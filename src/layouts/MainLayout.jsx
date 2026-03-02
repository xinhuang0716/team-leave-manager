import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentArea = styled.main`
  flex: 1;
  padding: 2.5vh 4%;
  overflow-y: auto;
  background: linear-gradient(
    135deg,
    rgb(225, 237, 250) 0%,
    rgb(235, 243, 252) 50%,
    rgb(228, 238, 250) 100%
  );

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
