import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow-x: auto;
  position: relative;
  max-height: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: center;
  table-layout: fixed;

  @media (max-width: 768px) {
    table-layout: auto;
    min-width: 500px;
  }
`;

const THead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Th = styled.th`
  padding: 14px 16px;
  text-align: center;
  vertical-align: middle;
  background: linear-gradient(135deg, #2e4661 0%, #3a5a7c 100%);
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  &:first-child {
    border-radius: var(--radius-md) 0 0 0;
  }

  &:last-child {
    border-radius: 0 var(--radius-md) 0 0;
  }
`;

const Td = styled.td`
  padding: 12px 16px;
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
  color: var(--text-primary);
  border-bottom: 1px solid rgba(46, 70, 97, 0.06);
`;

const Tr = styled.tr`
  transition: all var(--transition-fast);

  &:nth-child(even) {
    background-color: rgba(155, 189, 240, 0.08);
  }

  &:hover {
    background-color: rgba(70, 135, 209, 0.08);
  }

  &:last-child td:first-child {
    border-radius: 0 0 0 var(--radius-md);
  }

  &:last-child td:last-child {
    border-radius: 0 0 var(--radius-md) 0;
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 6px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  opacity: 0.6;

  &:hover {
    transform: scale(1.15);
    opacity: 1;
    background: rgba(220, 53, 69, 0.08);
  }

  img {
    height: 28px;
    display: block;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 48px 20px;
  color: var(--text-secondary);
  font-size: 1rem;
`;

const RecordList = ({ records, onDelete }) => {
  if (!records?.length) return <EmptyState>No records found.</EmptyState>;

  return (
    <TableContainer>
      <Table>
        <THead>
          <tr>
            <Th></Th>
            <Th>請假日期</Th>
            <Th>請假時段</Th>
            <Th>事由</Th>
            <Th></Th>
          </tr>
        </THead>
        <tbody>
          {records.map((item) => (
            <Tr key={item.IDX}>
              <Td>{item.EMP_NAME}</Td>
              <Td>{item.DATE}</Td>
              <Td>{item.TIME}</Td>
              <Td>{item.REASON}</Td>
              <Td>
                <DeleteButton
                  onClick={() => onDelete(item.EMP_NAME, item.DATE, item.TIME)}
                  title="Delete"
                >
                  <img src="/trash.png" alt="Delete" />
                </DeleteButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default RecordList;
