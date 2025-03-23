import React from "react";
import Records from "../components/Records";
import "./RecordsPage.css";

function RecordsPage() {
  const data = Records({});

  const handleDelete = async (emp_name, date, time) => {
    console.log(
      `Deleting record with EMP_NAME: ${emp_name}, DATE: ${date}, TIME: ${time}`
    );
    const response = await fetch("http://localhost:8000/change/ds", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emp_name: emp_name,
        date: date,
        time: time,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  const handleDeleteClick = (emp_name, date, time) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the record for ${emp_name} on ${date} ${time}?`
    );
    if (isConfirmed) {
      handleDelete(emp_name, date, time);
    }
  };

  return (
    <div className="records-page">
      {data ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>請假日期</th>
                <th>請假時段</th>
                <th>事由</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.IDX}>
                  <td>{item.EMP_NAME}</td>
                  <td>{item.DATE}</td>
                  <td>{item.TIME}</td>
                  <td>{item.REASON}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() =>
                        handleDeleteClick(item.EMP_NAME, item.DATE, item.TIME)
                      }
                    >
                      <img src="/trash.png" alt="Delete icon" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RecordsPage;
