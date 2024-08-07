import React from "react";
import { format } from "date-fns";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
      <div>
        <button
          onClick={onPrevMonth}
          className="px-4 py-2 bg-gray-200 rounded-l"
        >
          Previous
        </button>
        <button onClick={onToday} className="px-4 py-2 bg-gray-200">
          Today
        </button>
        <button
          onClick={onNextMonth}
          className="px-4 py-2 bg-gray-200 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
