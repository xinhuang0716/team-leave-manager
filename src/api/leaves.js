import client from './client';

export const fetchLeaves = async () => {
  const response = await client.get('/fetch');
  return response.data;
};

export const addLeave = async (leaveData) => {
  const response = await client.post('/add', leaveData);
  return response.data;
};

export const deleteLeave = async (emp_name, date, time) => {
  const response = await client.patch('/change', { emp_name, date, time });
  return response.data;
};
