import React from "react";
import { format, isToday } from "date-fns";
import Event from "./Event";

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
  onResizeEvent: (
    id: string,
    newStartDayIndex: number,
    newEndDayIndex: number
  ) => void;
}

interface Event {
  id: string;
  name: string;
  color: string;
  resourceIndex: number;
  startDayIndex: number;
  endDayIndex: number;
}

const CELL_WIDTH = 100; // Adjust this value based on your cell width

const CalendarGrid: React.FC<CalendarGridProps> = ({
  days,
  resources,
  onRemoveResource,
  events,
  onAddEvent,
  onRemoveEvent,
  onMoveEvent,
  onResizeEvent,
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
              <td>
                <div
                  className="relative"
                  style={{
                    height: "50px",
                    width: `${days.length * CELL_WIDTH}px`,
                  }}
                >
                  {events
                    .filter((event) => event.resourceIndex === resourceIndex)
                    .map((event) => (
                      <Event
                        key={event.id}
                        id={event.id}
                        name={event.name}
                        color={event.color}
                        startDayIndex={event.startDayIndex}
                        endDayIndex={event.endDayIndex}
                        onClose={onRemoveEvent}
                        onResize={onResizeEvent}
                        onDragStart={handleDragStart}
                        cellWidth={CELL_WIDTH}
                      />
                    ))}
                  {days.map((day, dayIndex) => (
                    <div
                      key={day.toISOString()}
                      className="absolute border-r border-b"
                      style={{
                        left: `${dayIndex * CELL_WIDTH}px`,
                        top: 0,
                        width: `${CELL_WIDTH}px`,
                        height: "100%",
                      }}
                      onDoubleClick={() => onAddEvent(resourceIndex, dayIndex)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, resourceIndex, dayIndex)}
                    >
                      <div
                        className={`h-full w-full ${
                          isToday(day) ? "bg-blue-100" : ""
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarGrid;
