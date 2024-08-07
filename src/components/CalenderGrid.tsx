import React from "react";
import { format, isToday } from "date-fns";

interface CalendarGridProps {
  days: Date[];
  resources: string[];
  onRemoveResource: (index: number) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  resources,
  onRemoveResource,
}) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-white border p-2 min-w-[150px]">
              Resources
            </th>
            {days.map((day) => (
              <th key={day.toISOString()} className="border p-2 min-w-[100px]">
                <div
                  className={`flex flex-row gap-2 justify-center ${
                    isToday(day) ? "bg-blue-500 text-white p-2 rounded-lg" : ""
                  }`}
                >
                  <div>{format(day, "EEE")}</div>
                  <div>{format(day, "d")}</div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={resource}>
              <td className="sticky left-0 z-10 bg-white border p-2 min-w-[150px]">
                <div className="flex justify-between items-center">
                  {resource}
                  <button
                    onClick={() => onRemoveResource(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              </td>
              {days.map((day) => (
                <td
                  key={day.toISOString()}
                  className="border p-2 min-w-[100px] h-[50px]"
                >
                  {/* Event cells will go here */}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarGrid;
