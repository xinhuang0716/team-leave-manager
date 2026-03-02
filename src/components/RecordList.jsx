import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow-x: auto;
  position: relative;
  max-height: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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
  padding: 1% 3%;
  text-align: center;
  vertical-align: middle;
  height: 30px;
  background: #2e4661;
  color: #ffffff;
  font-size: large;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Td = styled.td`
  padding: 1% 3%;
  text-align: center;
  vertical-align: middle;
  height: 30px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #9bbdf046;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: #d1d0d0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 4px;

  &:hover {
    transform: scale(1.2);
  }

  img {
    height: 35px;
  }
`;

const RecordList = ({ records, onDelete }) => {
  if (!records?.length) return <p>No records found.</p>;

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
