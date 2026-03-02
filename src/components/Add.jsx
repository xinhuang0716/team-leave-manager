import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useLeaves } from '../hooks/useLeaves';
import { generateLeavePayloads } from '../utils/dateUtils';

Modal.setAppElement('#root');

/* ── Styled Components ───────────────────────────────────── */

const AddButton = styled.button`
  margin-top: 2vh;
  margin-bottom: 5vh;
  width: 25%;
  min-width: 160px;
  height: 50px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 6px 6px 12px #c5c5c5;
  cursor: pointer;
  background: transparent;

  &::before {
    content: '';
    width: 0;
    height: 50px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to right,
      rgba(61, 145, 170) 0%,
      rgb(255, 255, 255) 100%
    );
    transition: 0.5s ease;
    display: block;
    z-index: -1;
  }

  &:hover::before {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;

  label {
    margin-bottom: 2px;
    font-weight: bold;
  }

  input,
  select {
    padding: 2px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 15px;

    &:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

const SubmitButton = styled.button`
  padding: 5px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/* ── Modal inline styles (react-modal expects style objects) ── */

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 2,
};

const modalContentStyle = {
  position: 'absolute',
  width: '50%',
  maxWidth: '500px',
  minWidth: '300px',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  background: 'rgb(225, 237, 250)',
  borderRadius: '10px',
  padding: '20px',
  zIndex: 3,
  fontFamily: 'Consolas, sans-serif, "Microsoft YaHei", "SimHei"',
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
      alert(err.message || 'An error occurred while adding the leave.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <AddButton type="button" onClick={() => setModalIsOpen(true)}>
        Add Your Leave!
      </AddButton>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Add Leave"
        style={{ overlay: modalOverlayStyle, content: modalContentStyle }}
      >
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
            {submitting ? 'Submitting…' : 'Submit'}
          </SubmitButton>
        </Form>
      </Modal>
    </>
  );
};

export default Add;
