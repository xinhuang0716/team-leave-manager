import React from "react";
import Add from "../components/Add";
import Calendar from "../components/Calendar";
import PageHeader from "../components/PageHeader";

const CalendarPage = () => (
  <>
    <PageHeader
      eyebrow="Team overview"
      title="Leave Calendar"
      description="See who is away and plan the next few weeks with fewer surprises."
      action={<Add />}
    />
    <Calendar />
  </>
);

export default CalendarPage;
