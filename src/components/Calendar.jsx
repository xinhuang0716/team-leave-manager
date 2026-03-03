import React, { useMemo } from "react";
import styled from "styled-components";
import { format, addDays, startOfWeek } from "date-fns";
import { useLeaves } from "../hooks/useLeaves";

const Wrapper = styled.div`
  overflow-x: auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
    font-size: clamp(1.1rem, 4.5vw, 2.2rem);
  max-height: 80vh;
  overflow-y: auto;
  min-width: 700px;
`;

const DayCell = styled.div`
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: var(--radius-md);
  border: 1px solid rgba(70, 135, 209, 0.08);
  transition: all var(--transition-fast);

  &:hover {
    background: rgba(255, 255, 255, 0.85);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
`;

const DaySlot = styled.div`
  padding: 8px;
  background: linear-gradient(135deg, rgb(70, 135, 209) 0%, #5a9de6 100%);
  text-align: center;
  font-weight: 600;
      font-size: clamp(1rem, 6.5vw, 1.6rem);
  color: white;
  box-shadow: 0 2px 8px rgba(70, 135, 209, 0.3);
  font-size: 1rem;
  letter-spacing: 0.5px;
`;

const TimeSlot = styled.div`
  padding: 4px 6px;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-primary);

  strong {
    color: var(--accent-blue);
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    margin-right: 4px;
  }

  span {
    color: var(--text-secondary);
  }
`;

const HeaderCell = styled.div`
  padding: 10px;
  text-align: center;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  font-weight: 700;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  letter-spacing: -0.03em;
  line-height: 1;
  color: rgb(252, 215, 252);

  /* Improve consistency of font rendering across platforms */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Smaller stroke that looks acceptable on most screens */
  -webkit-text-stroke: 1.5px rgba(0,0,0,0.95);

  /* Provide a cross-browser fallback that approximates an outline */
  text-shadow:
    0.5px 0.5px 0 rgba(0,0,0,0.9),
    -0.5px 0.5px 0 rgba(0,0,0,0.9),
    0.5px -0.5px 0 rgba(0,0,0,0.9),
    -0.5px -0.5px 0 rgba(0,0,0,0.9);

  /* Prevent awkward wrapping or clipping in small header cells */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 420px) {
    font-size: clamp(0.85rem, 5.5vw, 1.2rem);
    -webkit-text-stroke: 1px rgba(0,0,0,0.9);
    text-shadow:
      0.3px 0.3px 0 rgba(0,0,0,0.9),
      -0.3px 0.3px 0 rgba(0,0,0,0.9);
  }
`;

const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
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
          const formatted = format(date, "yyyy-MM-dd");
          const am = calendarData[`${formatted}-AM`] || [];
          const pm = calendarData[`${formatted}-PM`] || [];

          return (
            <DayCell key={i}>
              <DaySlot>{format(date, "M/d")}</DaySlot>
              <TimeSlot>
                <strong
                  style={{ visibility: am.length ? "visible" : "hidden" }}
                >
                  AM{" "}
                </strong>
                <span>{am.sort().join(" ")}</span>
              </TimeSlot>
              <TimeSlot>
                <strong
                  style={{ visibility: pm.length ? "visible" : "hidden" }}
                >
                  PM{" "}
                </strong>
                <span>{pm.sort().join(" ")}</span>
              </TimeSlot>
            </DayCell>
          );
        })}
      </Grid>
    </Wrapper>
  );
};

export default Calendar;
