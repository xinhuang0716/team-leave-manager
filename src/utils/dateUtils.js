/**
 * Validate form data and generate an array of leave payloads
 * (one per AM/PM slot) to be sent to the backend.
 *
 * Throws an Error with a user-facing message on validation failure.
 */
export const generateLeavePayloads = (formData) => {
  const data = { ...formData };

  if (!data.reason) {
    delete data.reason;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);

  if (startDate < today) {
    throw new Error('請假起日需大於或等於今日');
  }

  if (startDate > endDate) {
    throw new Error('請假起日需小於或等於請假迄日');
  }

  const payloadList = [];
  const iterDate = new Date(startDate);

  while (iterDate <= endDate) {
    const dateStr = iterDate.toISOString().split('T')[0];
    payloadList.push({ emp_name: data.emp_name, date: dateStr, time: 'AM' });
    payloadList.push({ emp_name: data.emp_name, date: dateStr, time: 'PM' });
    iterDate.setDate(iterDate.getDate() + 1);
  }

  if (data.start_time === 'PM') {
    payloadList.shift();
  }

  if (data.end_time === 'AM') {
    payloadList.pop();
  }

  if (data.reason) {
    payloadList.forEach((item) => {
      item.reason = data.reason;
    });
  }

  return payloadList;
};
