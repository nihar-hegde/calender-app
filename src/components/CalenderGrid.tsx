import React from "react";
import { format, isToday } from "date-fns";
import Event from "./Event";

interface Event {
  id: string;
  name: string;
  color: string;
  resourceIndex: number;
  dayIndex: number;
}

interface CalendarGridProps {
  days: Date[];
  resources: string[];
  onRemoveResource: (index: number) => void;
  events: Event[];
  onAddEvent: (resourceIndex: number, dayIndex: number) => void;
  onRemoveEvent: (id: string) => void;
  onMoveEvent: (
    id: string,
    newResourceIndex: number,
    newDayIndex: number
  ) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  resources,
  onRemoveResource,
  events,
  onAddEvent,
  onRemoveEvent,
  onMoveEvent,
}) => {
  const handleDragStart = (e: React.DragEvent, eventId: string) => {
    e.dataTransfer.setData("text/plain", eventId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent,
    resourceIndex: number,
    dayIndex: number
  ) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData("text/plain");
    onMoveEvent(eventId, resourceIndex, dayIndex);
  };

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
          {resources.map((resource, resourceIndex) => (
            <tr key={resource}>
              <td className="sticky left-0 z-10 bg-white border p-2 min-w-[150px]">
                <div className="flex justify-between items-center">
                  {resource}
                  <button
                    onClick={() => onRemoveResource(resourceIndex)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    x
                  </button>
                </div>
              </td>
              {days.map((day, dayIndex) => (
                <td
                  key={day.toISOString()}
                  className="border p-2 min-w-[100px] h-[50px]"
                  onDoubleClick={() => onAddEvent(resourceIndex, dayIndex)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, resourceIndex, dayIndex)}
                >
                  {events
                    .filter(
                      (event) =>
                        event.resourceIndex === resourceIndex &&
                        event.dayIndex === dayIndex
                    )
                    .map((event) => (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, event.id)}
                      >
                        <Event
                          id={event.id}
                          name={event.name}
                          color={event.color}
                          onClose={onRemoveEvent}
                        />
                      </div>
                    ))}
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
