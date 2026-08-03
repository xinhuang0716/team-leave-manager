import React, { useMemo } from "react";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { CalendarDots, WarningCircle } from "@phosphor-icons/react";
import styled, { keyframes } from "styled-components";
import { useLeaves } from "../hooks/useLeaves";

const CalendarCard = styled.section`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-surface);
  background: var(--surface);
  box-shadow: var(--shadow-md);
`;

const CardToolbar = styled.div`
  display: flex;
  min-height: 68px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--border);

  h2 {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 0;
    color: var(--text-primary);
    font-size: 0.98rem;
    font-weight: 650;
    letter-spacing: -0.01em;

    svg {
      color: var(--primary);
    }
  }

  @media (max-width: 520px) {
    min-height: auto;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
    padding: 15px 16px;
  }
`;

const DateRange = styled.span`
  color: var(--text-tertiary);
  font-size: 0.8rem;
  font-variant-numeric: tabular-nums;
  font-weight: 560;
`;

const ScrollArea = styled.div`
  min-width: 0;
  overflow-x: auto;
  overscroll-behavior-x: contain;
`;

const Grid = styled.div`
  display: grid;
  min-width: 780px;
  grid-template-columns: repeat(5, minmax(156px, 1fr));

  @media (max-width: 860px) {
    min-width: 700px;
    grid-template-columns: repeat(5, minmax(140px, 1fr));
  }
`;

const HeaderCell = styled.div`
  padding: 10px 14px;
  border-right: 1px solid var(--border);
  background: var(--canvas-elevated);
  color: var(--text-tertiary);
  font-size: 0.72rem;
  font-weight: 710;
  letter-spacing: 0.08em;
  text-align: center;

  &:nth-child(5) {
    border-right: 0;
  }
`;

const DayCell = styled.div`
  min-height: 142px;
  padding: 12px;
  border-top: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: var(--surface);
  transition: background var(--transition-fast);

  &:nth-child(5n) {
    border-right: 0;
  }

  &:hover {
    background: var(--surface-muted);
  }
`;

const DateRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 11px;
`;

const DateNumber = styled.time`
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  border: 1px solid
    ${({ $today }) => ($today ? "var(--primary)" : "transparent")};
  border-radius: var(--radius-chip);
  background: ${({ $today }) => ($today ? "var(--primary)" : "transparent")};
  color: ${({ $today }) =>
    $today ? "var(--text-on-accent)" : "var(--text-primary)"};
  font-size: 0.87rem;
  font-variant-numeric: tabular-nums;
  font-weight: 680;
`;

const MonthLabel = styled.span`
  color: var(--text-tertiary);
  font-size: 0.71rem;
  font-weight: 600;
`;

const Slots = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TimeSlot = styled.div`
  display: grid;
  min-height: 24px;
  grid-template-columns: 23px minmax(0, 1fr);
  align-items: start;
  gap: 6px;
`;

const Period = styled.span`
  padding-top: 3px;
  color: var(--text-tertiary);
  font-size: 0.65rem;
  font-weight: 710;
  letter-spacing: 0.035em;
`;

const Names = styled.div`
  display: flex;
  min-width: 0;
  flex-wrap: wrap;
  gap: 4px;
`;

const NameChip = styled.span`
  max-width: 100%;
  overflow: hidden;
  padding: 3px 7px;
  border: 1px solid
    ${({ $period }) =>
      $period === "AM"
        ? "rgba(var(--primary-rgb), 0.22)"
        : "rgba(var(--border-rgb), 0.09)"};
  border-radius: var(--radius-chip);
  background: ${({ $period }) =>
    $period === "AM"
      ? "var(--primary-soft)"
      : "rgba(var(--border-rgb), 0.045)"};
  color: ${({ $period }) =>
    $period === "AM" ? "var(--primary-strong)" : "var(--text-secondary)"};
  font-size: 0.74rem;
  font-weight: 620;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StatusMessage = styled.div`
  display: flex;
  min-height: 310px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 11px;
  padding: 34px;
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-align: center;

  svg {
    color: var(--danger);
  }
`;

const shimmer = keyframes`
  0% { opacity: 0.42; }
  50% { opacity: 0.82; }
  100% { opacity: 0.42; }
`;

const SkeletonGrid = styled.div`
  display: grid;
  min-width: 780px;
  grid-template-columns: repeat(5, minmax(156px, 1fr));

  span {
    display: block;
    min-height: 142px;
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background:
      linear-gradient(var(--surface), var(--surface)) padding-box,
      var(--surface);
    animation: ${shimmer} 1.3s ease-in-out infinite;

    &:nth-child(5n) {
      border-right: 0;
    }
  }
`;

const DAYS_OF_WEEK = ["MON", "TUE", "WED", "THU", "FRI"];
const TOTAL_WEEKS = 5;
const WORK_DAYS_PER_WEEK = 5;

const Calendar = () => {
  const { leaves, loading, error } = useLeaves();

  const calendarData = useMemo(() => {
    if (!leaves?.length) return {};

    return leaves.reduce((result, item) => {
      const key = `${item.DATE}-${item.TIME}`;
      if (!result[key]) result[key] = [];
      result[key].push(item.EMP_NAME);
      return result;
    }, {});
  }, [leaves]);

  const startDate = useMemo(
    () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    [],
  );
  const calendarDates = useMemo(
    () =>
      Array.from({ length: TOTAL_WEEKS }, (_, weekIndex) =>
        Array.from({ length: WORK_DAYS_PER_WEEK }, (_, dayIndex) =>
          addDays(startDate, weekIndex * 7 + dayIndex),
        ),
      ).flat(),
    [startDate],
  );
  const endDate = calendarDates[calendarDates.length - 1];

  return (
    <CalendarCard>
      <CardToolbar>
        <h2>
          <CalendarDots size={19} weight="regular" aria-hidden="true" />
          Upcoming 5 weeks
        </h2>
        <DateRange>
          {format(startDate, "MMM d")} / {format(endDate, "MMM d, yyyy")}
        </DateRange>
      </CardToolbar>

      {error && !leaves.length ? (
        <StatusMessage role="alert">
          <WarningCircle size={28} weight="light" aria-hidden="true" />
          Calendar data is unavailable. Please check the backend connection.
        </StatusMessage>
      ) : loading && !leaves.length ? (
        <ScrollArea aria-label="Loading calendar">
          <SkeletonGrid aria-hidden="true">
            {Array.from(
              { length: TOTAL_WEEKS * WORK_DAYS_PER_WEEK },
              (_, index) => (
                <span key={index} />
              ),
            )}
          </SkeletonGrid>
        </ScrollArea>
      ) : (
        <ScrollArea>
          <Grid>
            {DAYS_OF_WEEK.map((day) => (
              <HeaderCell key={day}>{day}</HeaderCell>
            ))}

            {calendarDates.map((date) => {
              const dateKey = format(date, "yyyy-MM-dd");
              const am = [...(calendarData[`${dateKey}-AM`] || [])].sort();
              const pm = [...(calendarData[`${dateKey}-PM`] || [])].sort();
              const today = isSameDay(date, new Date());

              return (
                <DayCell key={dateKey}>
                  <DateRow>
                    <DateNumber dateTime={dateKey} $today={today}>
                      {format(date, "d")}
                    </DateNumber>
                    {date.getDate() === 1 && (
                      <MonthLabel>{format(date, "MMM")}</MonthLabel>
                    )}
                  </DateRow>

                  <Slots>
                    {[
                      ["AM", am],
                      ["PM", pm],
                    ].map(([period, names]) => (
                      <TimeSlot key={period}>
                        <Period>{period}</Period>
                        <Names>
                          {names.length
                            ? names.map((name, nameIndex) => (
                                <NameChip
                                  key={`${name}-${nameIndex}`}
                                  $period={period}
                                >
                                  {name}
                                </NameChip>
                              ))
                            : null}
                        </Names>
                      </TimeSlot>
                    ))}
                  </Slots>
                </DayCell>
              );
            })}
          </Grid>
        </ScrollArea>
      )}
    </CalendarCard>
  );
};

export default Calendar;
