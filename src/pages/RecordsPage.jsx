import React from 'react';
import styled from 'styled-components';
import { useLeaves } from '../hooks/useLeaves';
import RecordList from '../components/RecordList';

const PageContainer = styled.div`
  background: radial-gradient(circle, #abccf1, #ffffff);
  height: 96vh;
  border-radius: 8px;
`;

const RecordsPage = () => {
  const { leaves, loading, deleteLeave } = useLeaves();

  const handleDelete = (emp_name, date, time) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the record for ${emp_name} on ${date} ${time}?`,
    );
    if (!confirmed) return;

    deleteLeave(emp_name, date, time).catch(() => {
      alert('Failed to delete the record. Please try again.');
    });
  };

  if (loading && !leaves.length) return <p>Loading…</p>;

  return (
    <PageContainer>
      <RecordList records={leaves} onDelete={handleDelete} />
    </PageContainer>
  );
};

export default RecordsPage;
