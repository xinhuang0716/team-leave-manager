import React, { useMemo } from 'react';
import styled from 'styled-components';
import { format, addDays, startOfWeek } from 'date-fns';
import { useLeaves } from '../hooks/useLeaves';

const Wrapper = styled.div`
  overflow-x: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  max-height: 76vh;
  overflow-y: auto;
  min-width: 700px;
`;

const DayCell = styled.div`
  padding: 10px;
  background-color: rgb(225, 237, 250);
  border-radius: 5px;
`;

const DaySlot = styled.div`
  padding: 8px;
  background-color: rgb(70, 135, 209);
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: whitesmoke;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const TimeSlot = styled.div`
  padding: 2px;
  margin-top: 10px;
  border-radius: 5px;
`;

const HeaderCell = styled.div`
  padding: 10px;
  text-align: center;
  font-size: calc(1rem + min(30px, 5vw));
  font-weight: bold;
  font-family: cursive;
  letter-spacing: -0.15ch;
  line-height: 0.9;
  color: rgb(252, 215, 252);
  -webkit-text-stroke: 3px black;
  text-shadow: 2px 2px black;
`;

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TOTAL_CELLS = 35;

const Calendar = () => {
  const { leaves, loading } = useLeaves();

  // Transform flat leave array into a lookup map: "YYYY-MM-DD-AM/PM" -> [names]
  const calendarData = useMemo(() => {
    if (!leaves?.length) return {};

    return leaves.reduce((acc, item) => {
      const key = `${item.DATE}-${item.TIME}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item.EMP_NAME);
      return acc;
    }, {});
  }, [leaves]);

  const startDate = useMemo(
    () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    [],
  );

  if (loading && !leaves.length) return <p>Loading calendar…</p>;

  return (
    <Wrapper>
      <Grid>
        {DAYS_OF_WEEK.map((day) => (
          <HeaderCell key={day}>{day}</HeaderCell>
        ))}

        {Array.from({ length: TOTAL_CELLS }, (_, i) => {
          const date = addDays(startDate, i);
          const formatted = format(date, 'yyyy-MM-dd');
          const am = calendarData[`${formatted}-AM`] || [];
          const pm = calendarData[`${formatted}-PM`] || [];

          return (
            <DayCell key={i}>
              <DaySlot>{format(date, 'M/d')}</DaySlot>
              <TimeSlot>
                <strong style={{ visibility: am.length ? 'visible' : 'hidden' }}>
                  AM{' '}
                </strong>
                <span>{am.sort().join(' ')}</span>
              </TimeSlot>
              <TimeSlot>
                <strong style={{ visibility: pm.length ? 'visible' : 'hidden' }}>
                  PM{' '}
                </strong>
                <span>{pm.sort().join(' ')}</span>
              </TimeSlot>
            </DayCell>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Calendar;
