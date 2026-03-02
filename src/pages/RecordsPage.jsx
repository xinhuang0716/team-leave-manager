import React from "react";
import styled from "styled-components";
import { useLeaves } from "../hooks/useLeaves";
import RecordList from "../components/RecordList";

const PageContainer = styled.div`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.7) 0%,
    rgba(171, 204, 241, 0.3) 100%
  );
  height: 96vh;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  overflow: hidden;
`;

const LoadingText = styled.p`
  text-align: center;
  padding: 48px;
  color: var(--text-secondary);
`;

const RecordsPage = () => {
  const { leaves, loading, deleteLeave } = useLeaves();

  const handleDelete = (emp_name, date, time) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the record for ${emp_name} on ${date} ${time}?`,
    );
    if (!confirmed) return;

    deleteLeave(emp_name, date, time).catch(() => {
      alert("Failed to delete the record. Please try again.");
    });
  };

  if (loading && !leaves.length) return <LoadingText>Loading…</LoadingText>;

  return (
    <PageContainer>
      <RecordList records={leaves} onDelete={handleDelete} />
    </PageContainer>
  );
};

export default RecordsPage;
