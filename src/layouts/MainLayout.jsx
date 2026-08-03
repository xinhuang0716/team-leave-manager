import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";

const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 224px minmax(0, 1fr);
  width: 100%;
  min-width: 0;
  min-height: 100dvh;
  background: var(--canvas);

  @media (max-width: 860px) {
    display: block;
    padding-bottom: 86px;
  }
`;

const ContentArea = styled.main`
  width: 100%;
  min-width: 0;
  padding: 32px clamp(24px, 3.5vw, 56px) 56px;

  @media (max-width: 860px) {
    padding: 28px 20px 40px;
  }

  @media (max-width: 520px) {
    padding: 24px 16px 32px;
  }
`;

const ContentInner = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 1440px;
  margin: 0 auto;
`;

const MainLayout = ({ children }) => (
  <LayoutContainer>
    <Sidebar />
    <ContentArea>
      <ContentInner>{children}</ContentInner>
    </ContentArea>
  </LayoutContainer>
);

export default MainLayout;
