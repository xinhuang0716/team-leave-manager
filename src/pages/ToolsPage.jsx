import React from "react";
import { Toolbox } from "@phosphor-icons/react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";

const ReservedSpace = styled.section`
  display: flex;
  min-height: min(520px, 58vh);
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 14px;
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius-surface);
  background: var(--surface);
  box-shadow: var(--shadow-md);
  color: var(--text-secondary);
  text-align: center;

  svg {
    color: var(--primary);
  }

  h2 {
    margin: 2px 0 0;
    color: var(--text-primary);
    font-size: 1rem;
    font-weight: 650;
    letter-spacing: -0.02em;
  }

  p {
    max-width: 36ch;
    margin: 0;
    color: var(--text-tertiary);
    font-size: 0.82rem;
    line-height: 1.6;
  }
`;

const IconFrame = styled.div`
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid rgba(var(--primary-rgb), 0.22);
  border-radius: var(--radius-control);
  background: var(--primary-soft);
`;

const ToolsPage = () => (
  <>
    <PageHeader
      title="Tools"
      description="A reserved space for future office utilities."
    />
    <ReservedSpace aria-label="Reserved tools workspace">
      <IconFrame>
        <Toolbox size={24} weight="light" aria-hidden="true" />
      </IconFrame>
      <h2>Ready for the next utility</h2>
      <p>
        This workspace is intentionally clear until the team adds its next
        focused tool.
      </p>
    </ReservedSpace>
  </>
);

export default ToolsPage;
