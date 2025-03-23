// data preprocessing function
export const dataPreprocessing = (formData) => {
  const data = formData;

  // check whether reason is empty or not
  if (!data.reason) {
    delete data.reason;
  }

  // check whether start_date larger than or equal to current date
  if (new Date(data.start_date) < new Date().setHours(0, 0, 0, 0)) {
    alert("請假起日需大於或等於今日");
    return;
  }

  // check whether start_date larger than end_date
  if (new Date(data.start_date) > new Date(data.end_date)) {
    alert("請假起日需小於或等於請假迄日");
    return;
  }

  // transfer date interval into list of date objects
  const payload_list = [];
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split("T")[0];
    payload_list.push({ emp_name: data.emp_name, date: dateStr, time: "AM" });
    payload_list.push({ emp_name: data.emp_name, date: dateStr, time: "PM" });
  }

  if (data.start_time === "PM") {
    payload_list.shift();
  }

  if (data.end_time === "AM") {
    payload_list.pop();
  }

  if (data.reason) {
    payload_list.forEach((item) => {
      item.reason = data.reason;
    });
  }

  return payload_list;
};

// add new data function
export const addNewData = (payload) => {
  const url = "http://localhost:8000/add/ds";
  console.log("Payload to be sent:", payload);

  fetch(url, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("Response received:", responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error occurred during data insertion:", error);
      alert("An error occurred while inserting data. Please try again.");
    });
};
