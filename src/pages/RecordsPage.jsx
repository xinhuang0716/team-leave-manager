import React, { useMemo, useState } from "react";
import { WarningCircle, X } from "@phosphor-icons/react";
import styled, { keyframes } from "styled-components";
import PageHeader from "../components/PageHeader";
import RecordList from "../components/RecordList";
import { useLeaves } from "../hooks/useLeaves";

const PageContainer = styled.section`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-surface);
  background: var(--surface);
  box-shadow: var(--shadow-md);
`;

const FilterBar = styled.div`
  display: grid;
  min-width: 0;
  grid-template-columns: minmax(180px, 1.2fr) minmax(170px, 0.8fr) minmax(
      180px,
      0.8fr
    ) auto;
  align-items: end;
  gap: 12px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`;

const FilterField = styled.label`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;
  color: var(--text-secondary);
  font-size: 0.72rem;
  font-weight: 650;

  input,
  select {
    width: 100%;
    min-height: 42px;
    padding: 8px 11px;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-control);
    background: var(--canvas-elevated);
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 500;
    transition:
      border-color var(--transition-fast),
      background var(--transition-fast),
      box-shadow var(--transition-fast);

    &:hover {
      border-color: rgba(var(--border-rgb), 0.24);
    }

    &:focus {
      border-color: var(--primary);
      background: var(--field-focus);
      outline: none;
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.11);
    }
  }

  input::placeholder {
    color: #a6b7c8;
  }
`;

const ClearButton = styled.button`
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 13px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-control);
  background: var(--surface-muted);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.77rem;
  font-weight: 640;
  white-space: nowrap;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);

  &:hover:not(:disabled) {
    border-color: rgba(var(--primary-rgb), 0.42);
    color: var(--primary-strong);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;
  }
`;

const ResultsMeta = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 20px;
  border-bottom: 1px solid var(--border);
  color: var(--text-tertiary);
  font-size: 0.71rem;

  strong {
    color: var(--text-secondary);
    font-variant-numeric: tabular-nums;
    font-weight: 680;
  }

  @media (max-width: 560px) {
    padding: 11px 16px;
  }
`;

const StatusMessage = styled.div`
  display: flex;
  min-height: 270px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 11px;
  padding: 40px;
  color: var(--text-secondary);
  font-size: 0.84rem;
  text-align: center;

  svg {
    color: var(--danger);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.75; }
`;

const LoadingRows = styled.div`
  display: grid;
  gap: 1px;
  background: var(--border);

  span {
    display: block;
    height: 54px;
    background: linear-gradient(
        90deg,
        var(--surface-muted) 20%,
        var(--surface-strong) 44%,
        var(--surface-muted) 68%
      )
      var(--surface-muted);
    background-size: 220% 100%;
    animation: ${pulse} 1.2s ease-in-out infinite;
  }
`;

const RecordsPage = () => {
  const { leaves, loading, error, deleteLeave } = useLeaves();
  const [nameFilter, setNameFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "DATE",
    direction: "asc",
  });

  const hasFilters = Boolean(nameFilter.trim() || dateFilter);

  const records = useMemo(() => {
    const normalizedName = nameFilter.trim().toLocaleLowerCase();
    const filtered = leaves.filter((item) => {
      const matchesName =
        !normalizedName ||
        item.EMP_NAME.toLocaleLowerCase().includes(normalizedName);
      const matchesDate = !dateFilter || item.DATE === dateFilter;
      return matchesName && matchesDate;
    });

    return [...filtered].sort((left, right) => {
      const leftValue = String(left[sortConfig.key] ?? "");
      const rightValue = String(right[sortConfig.key] ?? "");
      const comparison = leftValue.localeCompare(rightValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [dateFilter, leaves, nameFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleDelete = async (empName, date, time) => {
    const confirmed = window.confirm(
      `確定要刪除 ${empName} 在 ${date} ${time} 的請假紀錄嗎？`,
    );
    if (!confirmed) return;

    try {
      await deleteLeave(empName, date, time);
    } catch {
      window.alert("刪除失敗，請稍後再試。");
    }
  };

  const clearFilters = () => {
    setNameFilter("");
    setDateFilter("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Leave records"
        title="Records"
        description="Filter, sort, and maintain every upcoming leave entry in one place."
      />

      <PageContainer>
        <FilterBar aria-label="Record filters">
          <FilterField>
            Name
            <input
              type="search"
              value={nameFilter}
              onChange={(event) => setNameFilter(event.target.value)}
              placeholder="Search by name"
            />
          </FilterField>

          <FilterField>
            Start date
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </FilterField>

          <FilterField>
            Sort by
            <select
              value={`${sortConfig.key}-${sortConfig.direction}`}
              onChange={(event) => {
                const [key, direction] = event.target.value.split("-");
                setSortConfig({ key, direction });
              }}
            >
              <option value="DATE-asc">Date: earliest first</option>
              <option value="DATE-desc">Date: latest first</option>
              <option value="EMP_NAME-asc">Name: A to Z</option>
              <option value="EMP_NAME-desc">Name: Z to A</option>
            </select>
          </FilterField>

          <ClearButton
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
          >
            <X size={14} weight="bold" aria-hidden="true" />
            Clear filters
          </ClearButton>
        </FilterBar>

        <ResultsMeta>
          <span>
            <strong>{records.length}</strong> of {leaves.length} records
          </span>
          {loading && <span>Refreshing...</span>}
        </ResultsMeta>

        {error && !leaves.length ? (
          <StatusMessage role="alert">
            <WarningCircle size={28} weight="light" aria-hidden="true" />
            Records are unavailable. Please check the backend connection.
          </StatusMessage>
        ) : loading && !leaves.length ? (
          <LoadingRows aria-label="Loading records">
            {Array.from({ length: 5 }, (_, index) => (
              <span key={index} aria-hidden="true" />
            ))}
          </LoadingRows>
        ) : (
          <RecordList
            records={records}
            onDelete={handleDelete}
            sortConfig={sortConfig}
            onSort={handleSort}
            hasFilters={hasFilters}
          />
        )}
      </PageContainer>
    </>
  );
};

export default RecordsPage;
