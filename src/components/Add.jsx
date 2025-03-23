import React, { useState } from "react";
import Modal from "react-modal";
import "./Add.css";
import { dataPreprocessing, addNewData } from "./PostNewData.jsx";

Modal.setAppElement("#root");

const Add = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // data preprocessing
    let data;
    try {
      data = dataPreprocessing(Object.fromEntries(formData.entries()));
    } catch (error) {
      alert(error);
      return;
    }

    // add new data
    data.forEach((item) => {
        addNewData(item);
        setTimeout(() => {}, 500);
    });

    closeModal();
  };

  return (
    <div>
      <button className="Add-button" onClick={handleClick}>
        Add Your Leave!
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Add-Modal"
        overlayClassName="Add-modal-overlay"
        className="Add-modal-content"
      >
        <div className="Add-card">
          <form className="Add-form" onSubmit={handleSubmit}>
            <div className="Add-form-group">
              <label htmlFor="name">姓名</label>
              <input type="text" name="emp_name" required />
            </div>
            <div className="Add-form-group">
              <label htmlFor="startDay">請假起日</label>
              <input type="date" name="start_date" required />
              <select name="start_time" required>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="Add-form-group">
              <label htmlFor="endDate">請假終日</label>
              <input type="date" name="end_date" required />
              <select name="end_time" required>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="Add-form-group">
              <label htmlFor="reason">事由</label>
              <input type="text" name="reason" />
            </div>
            <button type="submit" className="Add-submit-button">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Add;
