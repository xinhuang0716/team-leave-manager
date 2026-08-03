import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { ArrowRight, Plus, X } from "@phosphor-icons/react";
import Modal from "react-modal";
import styled from "styled-components";
import { useLeaves } from "../hooks/useLeaves";
import { generateLeavePayloads } from "../utils/dateUtils";

Modal.setAppElement("#root");

const AddButton = styled.button`
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border: 1px solid var(--primary);
  border-radius: var(--radius-control);
  background: var(--primary);
  box-shadow: var(--shadow-sm);
  color: var(--text-on-accent);
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 720;
  white-space: nowrap;
  transition:
    background var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);

  &:hover {
    background: var(--primary-strong);
    box-shadow: 0 4px 12px rgba(0, 6, 16, 0.28);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 680px) {
    width: 100%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
`;

const ModalContext = styled.p`
  margin: 0 0 5px;
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 620;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-primary);
  font-size: 1.55rem;
  font-weight: 680;
  letter-spacing: -0.035em;
`;

const CloseButton = styled.button`
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-control);
  background: var(--surface-muted);
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    color var(--transition-fast),
    transform var(--transition-fast);

  &:hover {
    border-color: var(--border-strong);
    color: var(--text-primary);
  }

  &:active {
    transform: scale(0.96);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 7px;

  label {
    color: var(--text-secondary);
    font-size: 0.78rem;
    font-weight: 650;
  }

  input,
  select {
    width: 100%;
    min-height: 44px;
    padding: 9px 12px;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-control);
    background: var(--canvas-elevated);
    color: var(--text-primary);
    font-size: 0.86rem;
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
      box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.12);
    }
  }

  select {
    color-scheme: dark;
  }
`;

const DateFields = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 80px;
  gap: 8px;
`;

const HelperText = styled.p`
  margin: -1px 0 0;
  color: var(--text-tertiary);
  font-size: 0.72rem;
  line-height: 1.55;
`;

const ErrorMessage = styled.p`
  margin: 0;
  padding: 11px 12px;
  border: 1px solid rgba(225, 132, 132, 0.24);
  border-radius: var(--radius-control);
  background: var(--danger-soft);
  color: #efaaaa;
  font-size: 0.8rem;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-top: 3px;
  border: 1px solid var(--primary);
  border-radius: var(--radius-control);
  background: var(--primary);
  color: var(--text-on-accent);
  cursor: pointer;
  font-size: 0.86rem;
  font-weight: 720;
  transition:
    background var(--transition-fast),
    transform var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--primary-strong);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    cursor: wait;
    opacity: 0.58;
  }
`;

const Add = () => {
  const formRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endDateTouched, setEndDateTouched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { addLeave } = useLeaves();
  const today = format(new Date(), "yyyy-MM-dd");

  const resetForm = () => {
    formRef.current?.reset();
    setStartDate("");
    setEndDate("");
    setEndDateTouched(false);
    setErrorMessage("");
  };

  const closeModal = () => {
    setModalIsOpen(false);
    resetForm();
  };

  const handleStartDateChange = (event) => {
    const nextStartDate = event.target.value;
    setStartDate(nextStartDate);
    setErrorMessage("");
    setEndDate((currentEndDate) => {
      if (
        !endDateTouched ||
        !currentEndDate ||
        currentEndDate < nextStartDate
      ) {
        return nextStartDate;
      }
      return currentEndDate;
    });
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setEndDateTouched(true);
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));

    try {
      setSubmitting(true);
      setErrorMessage("");
      await addLeave(generateLeavePayloads(formData));
      closeModal();
    } catch (error) {
      setErrorMessage(error.message || "Unable to add this leave request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AddButton type="button" onClick={() => setModalIsOpen(true)}>
        <Plus size={18} weight="bold" aria-hidden="true" />
        新增請假
      </AddButton>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="新增請假"
        className="leave-modal"
        overlayClassName="leave-modal-overlay"
      >
        <ModalHeader>
          <div>
            <ModalContext>Leave request</ModalContext>
            <ModalTitle>新增請假</ModalTitle>
          </div>
          <CloseButton
            type="button"
            onClick={closeModal}
            aria-label="Close dialog"
          >
            <X size={18} aria-hidden="true" />
          </CloseButton>
        </ModalHeader>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="emp_name">姓名</label>
            <input
              id="emp_name"
              type="text"
              name="emp_name"
              maxLength="16"
              required
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <label htmlFor="start_date">請假起日</label>
              <DateFields>
                <input
                  id="start_date"
                  type="date"
                  name="start_date"
                  min={today}
                  value={startDate}
                  onChange={handleStartDateChange}
                  required
                />
                <select
                  name="start_time"
                  defaultValue="AM"
                  aria-label="起日時段"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </DateFields>
              <HelperText>選擇後會自動帶入請假終日。</HelperText>
            </FormGroup>

            <FormGroup>
              <label htmlFor="end_date">請假終日</label>
              <DateFields>
                <input
                  id="end_date"
                  type="date"
                  name="end_date"
                  min={startDate || today}
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                />
                <select name="end_time" defaultValue="AM" aria-label="終日時段">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </DateFields>
            </FormGroup>
          </FormRow>

          <FormGroup>
            <label htmlFor="reason">事由（選填）</label>
            <input id="reason" type="text" name="reason" maxLength="64" />
          </FormGroup>

          {errorMessage && (
            <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
          )}

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit request"}
            {!submitting && (
              <ArrowRight size={17} weight="bold" aria-hidden="true" />
            )}
          </SubmitButton>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
