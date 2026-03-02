import React, { useState, useCallback, useEffect } from 'react';
import { LeaveContext } from './leaveContextValue';
import {
  fetchLeaves as apiFetchLeaves,
  addLeave as apiAddLeave,
  deleteLeave as apiDeleteLeave,
} from '../api/leaves';

export const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const result = await apiFetchLeaves();
      setLeaves(result.data ?? []);
      setError(null);
    } catch (err) {
      setError(err);
      console.error('Error fetching leaves:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addLeave = useCallback(
    async (payloads) => {
      setLoading(true);
      try {
        for (const payload of payloads) {
          await apiAddLeave(payload);
        }
        await refresh();
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [refresh],
  );

  const deleteLeave = useCallback(
    async (emp_name, date, time) => {
      try {
        await apiDeleteLeave(emp_name, date, time);
        await refresh();
      } catch (err) {
        setError(err);
        throw err;
      }
    },
    [refresh],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <LeaveContext.Provider value={{ leaves, loading, error, addLeave, deleteLeave, refresh }}>
      {children}
    </LeaveContext.Provider>
  );
};
