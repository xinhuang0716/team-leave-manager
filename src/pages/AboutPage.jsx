import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  line-height: 1.6;
  overflow-y: auto;
  position: relative;
  max-height: 96vh;
  padding: 8px 0;
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  padding: 24px 28px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
  transition: all var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: var(--shadow-sm);
  }

  p {
    color: var(--text-secondary);
    margin: 6px 0;
    font-size: 0.93rem;
  }
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid rgba(221, 210, 115, 0.6);
  padding-bottom: 8px;
  margin-top: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.3px;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeatureItem = styled.li`
  background: rgba(252, 215, 252, 0.35);
  padding: 12px 22px;
  border-radius: var(--radius-sm);
  font-size: 0.93rem;
  color: var(--text-secondary);
  border-left: 3px solid rgba(252, 215, 252, 0.8);
  transition: all var(--transition-fast);

  &:hover {
    background: rgba(252, 215, 252, 0.5);
    transform: translateX(4px);
  }
`;

const AboutPage = () => (
  <PageContainer>
    <Section>
      <SectionTitle>Overview</SectionTitle>
      <p>
        Team Leave Manager is a lightweight leave management system designed for
        department teams. It provides colleagues with a clean, intuitive web
        interface to submit leave requests and instantly view the leave
        schedules of all team members at a glance.
      </p>
      <p>
        The system is built with a modern full-stack architecture — React + Vite
        on the frontend, and FastAPI on the backend — delivering a fast,
        responsive, and seamless user experience.
      </p>
    </Section>

    <Section>
      <SectionTitle>Features</SectionTitle>
      <FeatureList>
        <FeatureItem>
          Full-stack separation architecture (React + FastAPI) for clear
          responsibility and easy maintenance.
        </FeatureItem>
        <FeatureItem>
          Interactive 5-week calendar view showing all team members' leave at a
          glance, with AM / PM time-slot breakdown.
        </FeatureItem>
        <FeatureItem>
          One-click leave creation — simply fill in name, date range, and reason
          to submit a new request.
        </FeatureItem>
        <FeatureItem>
          Backend Swagger API documentation for easy integration and debugging.
        </FeatureItem>
      </FeatureList>
    </Section>

    <Section>
      <SectionTitle>Usage</SectionTitle>
      <p>
        1. Open the <strong>Calendar</strong> page to browse the upcoming 5-week
        leave schedule of all team members.
      </p>
      <p>
        2. Click the <strong>+ Add Your Leave</strong> button to open the leave
        form, fill in your name, start / end dates with AM or PM, and an
        optional reason, then submit.
      </p>
      <p>
        3. Switch to the <strong>Records</strong> page to review all leave
        entries. Use the delete button to remove any incorrect or outdated
        records.
      </p>
      <p>
        4. For developer setup, API details, and further elaboration, refer to
        the README file in the team-leave-manager repository{" "}
        <a
          href="https://github.com/xinhuang0716/team-leave-manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/xinhuang0716/team-leave-manager
        </a>
        .
      </p>
    </Section>

    <Section>
      <SectionTitle>Contributors</SectionTitle>
      <p>tom.h.huang@fubon.com</p>
      <p>jason.hp.hsu@fubon.com</p>
    </Section>
  </PageContainer>
);

export default AboutPage;
