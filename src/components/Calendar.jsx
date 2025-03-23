import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format, addDays, startOfWeek } from "date-fns";

const CalendarContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  max-height: 76vh;
  overflow-y: auto;
`;

const DayCell = styled.div`
  padding: 10px;
  background-color: rgb(225, 237, 250);
  border-radius: 5px;
`;

const DaySlot = styled.div`
  padding: 8px;
  background-color:rgb(70, 135, 209);
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  color: whitesmoke;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }
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
  color:rgb(252, 215, 252);
  -webkit-text-stroke: 3px black;
  text-shadow: 2px 2px black;
`;

const Calendar = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/fetch/ds")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data["data"].reduce((acc, item) => {
          const key = `${item.DATE}-${item.TIME}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item.EMP_NAME);
          return acc;
        }, {});
        setData(formattedData);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  const renderHeader = () => {
    const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    return daysOfWeek.map((day, index) => (
      <HeaderCell key={index}>{day}</HeaderCell>
    ));
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
    for (let i = 0; i < 35; i++) {
      const date = addDays(startDate, i);
      const formattedDate = format(date, "yyyy-MM-dd");
      const morningData = data[`${formattedDate}-AM`] || [];
      const afternoonData = data[`${formattedDate}-PM`] || [];

      days.push(
        <DayCell key={i}>
          <DaySlot>{format(date, "M/d")}</DaySlot>
          <TimeSlot>
            <strong
              style={{
                visibility: morningData.length > 0 ? "visible" : "hidden",
              }}
            >
              AM{" "}
            </strong>
            <span>{morningData.sort().join(" ")}</span>
          </TimeSlot>
          <TimeSlot>
            <strong
              style={{
                visibility: afternoonData.length > 0 ? "visible" : "hidden",
              }}
            >
              PM{" "}
            </strong>
            <span>{afternoonData.sort().join(" ")}</span>
          </TimeSlot>
        </DayCell>
      );
    }
    return days;
  };

  return (
    <CalendarContainer>
      {renderHeader()}
      {renderDays()}
    </CalendarContainer>
  );
};

export default Calendar;
