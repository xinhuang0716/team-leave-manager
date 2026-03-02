import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useLeaves } from "../hooks/useLeaves";
import { generateLeavePayloads } from "../utils/dateUtils";

Modal.setAppElement("#root");

/* ── Styled Components ───────────────────────────────────── */

const AddButton = styled.button`
  margin-top: 2vh;
  margin-bottom: 3vh;
  width: 25%;
  min-width: 180px;
  height: 48px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border: 2px solid rgba(61, 145, 170, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  background: rgba(255, 255, 255, 0.7);
  color: var(--text-primary);
  transition: all var(--transition-smooth);
  backdrop-filter: blur(4px);

  &::before {
    content: "";
    width: 0;
    height: 100%;
    border-radius: var(--radius-md);
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      135deg,
      rgba(61, 145, 170, 0.9) 0%,
      rgba(70, 135, 209, 0.8) 100%
    );
    transition: width var(--transition-smooth);
    display: block;
    z-index: -1;
  }

  &:hover {
    color: white;
    border-color: transparent;
    box-shadow: 0 6px 20px rgba(61, 145, 170, 0.35);
    transform: translateY(-1px);

    &::before {
      width: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;

  label {
    margin-bottom: 6px;
    font-weight: 600;
    font-size: 0.88rem;
    color: var(--text-primary);
    letter-spacing: 0.3px;
  }

  input,
  select {
    padding: 8px 12px;
    border: 1.5px solid #dde3ea;
    border-radius: var(--radius-sm);
    font-size: 14px;
    background: rgba(255, 255, 255, 0.8);
    color: var(--text-primary);
    transition: all var(--transition-fast);
    font-family: inherit;

    &:focus {
      border-color: var(--accent-blue);
      outline: none;
      box-shadow: 0 0 0 3px rgba(70, 135, 209, 0.15);
      background: white;
    }

    &:hover:not(:focus) {
      border-color: #b0bec5;
    }
  }

  select {
    margin-top: 6px;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 10px 30px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  transition: all var(--transition-fast);
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 123, 255, 0.4);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.3px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(70, 135, 209, 0.15);
`;

/* ── Modal inline styles (react-modal expects style objects) ── */

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  backdropFilter: "blur(4px)",
  zIndex: 2,
};

const modalContentStyle = {
  position: "absolute",
  width: "50%",
  maxWidth: "460px",
  minWidth: "300px",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  background: "rgb(235, 243, 252)",
  borderRadius: "16px",
  padding: "28px 32px",
  zIndex: 3,
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Consolas, sans-serif, 'Microsoft YaHei', 'SimHei'",
  border: "1px solid rgba(70, 135, 209, 0.12)",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
};

/* ── Component ────────────────────────────────────────────── */

const Add = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addLeave } = useLeaves();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const formData = Object.fromEntries(fd.entries());

    try {
      const payloads = generateLeavePayloads(formData);
      setSubmitting(true);
      await addLeave(payloads);
      setModalIsOpen(false);
      e.target.reset();
    } catch (err) {
      alert(err.message || "An error occurred while adding the leave.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AddButton type="button" onClick={() => setModalIsOpen(true)}>
        + Add Your Leave
      </AddButton>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Leave"
        style={{ overlay: modalOverlayStyle, content: modalContentStyle }}
      >
        <ModalTitle>New Leave Request</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>姓名</label>
            <input type="text" name="emp_name" required />
          </FormGroup>

          <FormGroup>
            <label>請假起日</label>
            <input type="date" name="start_date" required />
            <select name="start_time" defaultValue="AM">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>請假終日</label>
            <input type="date" name="end_date" required />
            <select name="end_time" defaultValue="AM">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>事由</label>
            <input type="text" name="reason" />
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit"}
          </SubmitButton>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
