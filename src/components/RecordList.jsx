import React from "react";
import {
  CaretDown,
  CaretUp,
  MagnifyingGlass,
  Trash,
} from "@phosphor-icons/react";
import styled from "styled-components";

const TableContainer = styled.div`
  min-width: 0;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  table-layout: fixed;
`;

const Th = styled.th`
  padding: 12px 18px;
  border-bottom: 1px solid var(--border);
  background: var(--canvas-elevated);
  color: var(--text-tertiary);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.075em;
  text-align: left;
  text-transform: uppercase;

  &:last-child {
    width: 76px;
    text-align: right;
  }
`;

const SortButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? "var(--primary)" : "inherit")};
  cursor: pointer;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
  transition: color var(--transition-fast);

  &:hover {
    color: var(--primary-strong);
  }
`;

const Td = styled.td`
  padding: 14px 18px;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: left;
  vertical-align: middle;

  &:first-child {
    color: var(--text-primary);
    font-weight: 640;
  }

  &:nth-child(2) {
    font-variant-numeric: tabular-nums;
  }

  &:last-child {
    text-align: right;
  }
`;

const Tr = styled.tr`
  transition: background var(--transition-fast);

  &:hover {
    background: rgba(var(--border-rgb), 0.025);
  }

  &:last-child td {
    border-bottom: 0;
  }
`;

const PeriodBadge = styled.span`
  display: inline-flex;
  min-width: 40px;
  justify-content: center;
  padding: 3px 8px;
  border: 1px solid
    ${({ $period }) =>
      $period === "AM" ? "rgba(var(--primary-rgb), 0.22)" : "var(--border)"};
  border-radius: var(--radius-chip);
  background: ${({ $period }) =>
    $period === "AM" ? "var(--primary-soft)" : "rgba(var(--border-rgb), 0.04)"};
  color: ${({ $period }) =>
    $period === "AM" ? "var(--primary-strong)" : "var(--text-secondary)"};
  font-size: 0.72rem;
  font-weight: 710;
`;

const DeleteButton = styled.button`
  display: inline-grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  background: transparent;
  color: var(--text-tertiary);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);

  &:hover {
    border-color: rgba(225, 132, 132, 0.16);
    background: var(--danger-soft);
    color: var(--danger);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const EmptyState = styled.div`
  display: flex;
  min-height: 270px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  padding: 40px;
  color: var(--text-secondary);
  font-size: 0.92rem;
  text-align: center;

  svg {
    color: var(--text-tertiary);
  }
`;

const SortableHeader = ({ field, children, sortConfig, onSort }) => {
  const active = sortConfig.key === field;
  const ariaSort = active
    ? sortConfig.direction === "asc"
      ? "ascending"
      : "descending"
    : "none";
  const SortIcon = sortConfig.direction === "asc" ? CaretUp : CaretDown;

  return (
    <Th aria-sort={ariaSort}>
      <SortButton type="button" onClick={() => onSort(field)} $active={active}>
        {children}
        {active && <SortIcon size={11} weight="bold" aria-hidden="true" />}
      </SortButton>
    </Th>
  );
};

const RecordList = ({ records, onDelete, sortConfig, onSort, hasFilters }) => {
  if (!records?.length) {
    return (
      <EmptyState>
        <MagnifyingGlass size={30} weight="light" aria-hidden="true" />
        {hasFilters ? "找不到符合條件的請假紀錄。" : "目前沒有請假紀錄。"}
      </EmptyState>
    );
  }

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <SortableHeader
              field="EMP_NAME"
              sortConfig={sortConfig}
              onSort={onSort}
            >
              Name
            </SortableHeader>
            <SortableHeader
              field="DATE"
              sortConfig={sortConfig}
              onSort={onSort}
            >
              Start date
            </SortableHeader>
            <Th>Period</Th>
            <Th>Reason</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <Tr key={`${item.EMP_NAME}-${item.DATE}-${item.TIME}-${item.IDX}`}>
              <Td>{item.EMP_NAME}</Td>
              <Td>{item.DATE}</Td>
              <Td>
                <PeriodBadge $period={item.TIME}>{item.TIME}</PeriodBadge>
              </Td>
              <Td>{item.REASON || "Not provided"}</Td>
              <Td>
                <DeleteButton
                  type="button"
                  onClick={() => onDelete(item.EMP_NAME, item.DATE, item.TIME)}
                  aria-label={`Delete ${item.EMP_NAME} leave on ${item.DATE} ${item.TIME}`}
                >
                  <Trash size={16} aria-hidden="true" />
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
