import React, { useState } from "react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import CalendarHeader from "./CalenderHeader";
import CalendarGrid from "./CalenderGrid";

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState<string[]>(["Resource 1"]);

  const goToPreviousMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const goToNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));
  const goToToday = () => setCurrentDate(new Date());

  const addResource = () => {
    setResources((prev) => [...prev, `Resource ${prev.length + 1}`]);
  };

  const removeResource = (index: number) => {
    setResources((prev) => prev.filter((_, i) => i !== index));
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  return (
    <div className="container mx-auto p-4">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onToday={goToToday}
      />
      <button
        onClick={addResource}
        className="mt-4 mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Resource
      </button>
      <CalendarGrid
        days={daysInMonth}
        resources={resources}
        onRemoveResource={removeResource}
      />
    </div>
  );
};

export default Calendar;
