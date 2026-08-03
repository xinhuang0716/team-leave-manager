import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  width: 100%;
  min-width: 0;
  align-items: flex-end;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;

  @media (max-width: 680px) {
    align-items: stretch;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 22px;
  }
`;

const Copy = styled.div`
  min-width: 0;
  max-width: 720px;
`;

const Context = styled.p`
  margin: 0 0 7px;
  color: var(--primary);
  font-size: 0.76rem;
  font-weight: 630;
`;

const Title = styled.h1`
  margin: 0;
  color: var(--text-primary);
  font-size: clamp(1.8rem, 3vw, 2.35rem);
  font-weight: 650;
  letter-spacing: -0.035em;
  line-height: 1.05;
`;

const Description = styled.p`
  max-width: 62ch;
  margin: 11px 0 0;
  color: var(--text-secondary);
  font-size: 0.92rem;
  line-height: 1.65;
`;

const Action = styled.div`
  flex: 0 0 auto;

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const PageHeader = ({ eyebrow, title, description, action }) => (
  <Header>
    <Copy>
      {eyebrow && <Context>{eyebrow}</Context>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Copy>
    {action && <Action>{action}</Action>}
  </Header>
);

export default PageHeader;
