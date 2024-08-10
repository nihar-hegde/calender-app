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

interface Event {
  id: string;
  name: string;
  color: string;
  resourceIndex: number;
  startDayIndex: number;
  endDayIndex: number;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [resources, setResources] = useState<string[]>(["Resource 1"]);
  const [events, setEvents] = useState<Event[]>([]);

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
  const addEvent = (resourceIndex: number, dayIndex: number) => {
    const newEvent: Event = {
      id: `event-${events.length + 1}`,
      name: `New Event ${events.length + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`,
      resourceIndex,
      startDayIndex: dayIndex,
      endDayIndex: dayIndex,
    };
    setEvents([...events, newEvent]);
  };
  const removeEvent = (id: string) => {
    if (window.confirm("Are you sure you want to remove this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const resizeEvent = (
    id: string,
    newStartDayIndex: number,
    newEndDayIndex: number
  ) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? {
              ...event,
              startDayIndex: newStartDayIndex,
              endDayIndex: newEndDayIndex,
            }
          : event
      )
    );
  };

  const moveEvent = (
    id: string,
    newResourceIndex: number,
    newStartDayIndex: number
  ) => {
    setEvents(
      events.map((event) => {
        if (event.id === id) {
          const duration = event.endDayIndex - event.startDayIndex;
          return {
            ...event,
            resourceIndex: newResourceIndex,
            startDayIndex: newStartDayIndex,
            endDayIndex: newStartDayIndex + duration,
          };
        }
        return event;
      })
    );
  };

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
        events={events}
        onAddEvent={addEvent}
        onRemoveEvent={removeEvent}
        onMoveEvent={moveEvent}
        onResizeEvent={resizeEvent}
      />
    </div>
  );
};

export default Calendar;
