import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  line-height: 1.4;
  overflow-y: auto;
  position: relative;
  max-height: 96vh;
`;

const SectionTitle = styled.h2`
  border-bottom: 2px solid #ddd273;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  width: fit-content;
`;

const FeatureItem = styled.li`
  background: rgba(252, 215, 252, 0.575);
  margin: 10px 0;
  padding: 10px 20px;
  border-radius: 8px;
`;

const AboutPage = () => (
  <PageContainer>
    <section>
      <SectionTitle>Overview</SectionTitle>
      <p>
        This project aims to create a leave management system that provides
        department colleagues with a user-friendly web interface to apply for
        leave and view the leave schedules of other team members.
      </p>
    </section>

    <section>
      <SectionTitle>Features</SectionTitle>
      <FeatureList>
        <FeatureItem>Built with full-stack separation architecture.</FeatureItem>
        <FeatureItem>
          An intuitive interface that allows users to operate with just a few clicks.
        </FeatureItem>
      </FeatureList>
    </section>

    <section>
      <SectionTitle>Usage</SectionTitle>
      <p>1. Use Calendar page to view the leave schedules of other team members</p>
      <p>2. Use Records page to view or delete the leave records</p>
      <p>3. Click Add-Leave-button on Calendar page to create new leave</p>
      <p>
        4. For further elaboration, refer to the README file in team-leave-manager
        repo
      </p>
    </section>

    <section>
      <SectionTitle>Contributors</SectionTitle>
      <p>tom.h.huang@fubon.com</p>
      <p>jason.hp.hsu@fubon.com</p>
    </section>
  </PageContainer>
);

export default AboutPage;
