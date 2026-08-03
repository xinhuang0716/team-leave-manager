import React from "react";
import {
  CalendarBlank,
  ClockCountdown,
  Funnel,
  GithubLogo,
  Lightning,
} from "@phosphor-icons/react";
import styled from "styled-components";
import PageHeader from "../components/PageHeader";

const Grid = styled.div`
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.55fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Surface = styled.section`
  min-width: 0;
  padding: clamp(24px, 4vw, 34px);
  border: 1px solid var(--border);
  border-radius: var(--radius-surface);
  background: var(--surface);
  box-shadow: var(--shadow-md);

  h2 {
    margin: 0 0 13px;
    color: var(--text-primary);
    font-size: 1.08rem;
    font-weight: 660;
    letter-spacing: -0.025em;
  }

  > p {
    max-width: 68ch;
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.86rem;
    line-height: 1.75;
  }
`;

const CapabilityList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 24px;
  margin-top: 28px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Capability = styled.div`
  display: grid;
  min-width: 0;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 11px;
  padding: 17px 0;
  border-top: 1px solid var(--border);

  svg {
    margin-top: 1px;
    color: var(--primary);
  }

  strong {
    display: block;
    margin-bottom: 4px;
    color: var(--text-primary);
    font-size: 0.8rem;
    font-weight: 640;
  }

  span {
    display: block;
    color: var(--text-tertiary);
    font-size: 0.73rem;
    line-height: 1.55;
  }
`;

const MetaList = styled.dl`
  display: grid;
  gap: 0;
  margin: 0;

  div {
    padding: 17px 0;
    border-bottom: 1px solid var(--border);

    &:first-child {
      padding-top: 2px;
    }

    &:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }
  }

  dt {
    margin-bottom: 5px;
    color: var(--text-tertiary);
    font-size: 0.67rem;
    font-weight: 650;
    letter-spacing: 0.065em;
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 610;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--primary-strong);
    text-decoration: none;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--text-primary);
    }
  }
`;

const CAPABILITIES = [
  {
    icon: CalendarBlank,
    title: "5-week overview",
    description: "See AM and PM availability across the team.",
  },
  {
    icon: Lightning,
    title: "Fast requests",
    description: "Add a date range with only the details that matter.",
  },
  {
    icon: Funnel,
    title: "Useful records",
    description: "Filter and sort by colleague or start date.",
  },
  {
    icon: ClockCountdown,
    title: "Room to grow",
    description: "The Tools area is ready for focused office utilities.",
  },
];

const AboutPage = () => (
  <>
    <PageHeader
      title="About"
      description="A focused workspace for planning team leave without the spreadsheet overhead."
    />

    <Grid>
      <Surface>
        <h2>Built for a clearer team rhythm</h2>
        <p>
          Team Leave Manager keeps requests, upcoming schedules, and leave
          records in one lightweight workspace. The calendar makes coverage easy
          to understand, while the records view keeps routine maintenance
          direct.
        </p>

        <CapabilityList>
          {CAPABILITIES.map(({ icon, title, description }) => (
            <Capability key={title}>
              {React.createElement(icon, {
                size: 20,
                weight: "light",
                "aria-hidden": "true",
              })}
              <div>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            </Capability>
          ))}
        </CapabilityList>
      </Surface>

      <Surface>
        <h2>Project details</h2>
        <MetaList>
          <div>
            <dt>Frontend</dt>
            <dd>React + Vite</dd>
          </div>
          <div>
            <dt>Backend</dt>
            <dd>FastAPI + DuckDB</dd>
          </div>
          <div>
            <dt>Repository</dt>
            <dd>
              <a
                href="https://github.com/xinhuang0716/team-leave-manager"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={17} aria-hidden="true" />
                View on GitHub
              </a>
            </dd>
          </div>
        </MetaList>
      </Surface>
    </Grid>
  </>
);

export default AboutPage;
