import React, { useState, useRef, useEffect } from "react";

interface EventProps {
  id: string;
  name: string;
  color: string;
  startDayIndex: number;
  endDayIndex: number;
  onClose: (id: string) => void;
  onResize: (
    id: string,
    newStartDayIndex: number,
    newEndDayIndex: number
  ) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  cellWidth: number;
}

const Event: React.FC<EventProps> = ({
  id,
  name,
  color,
  startDayIndex,
  endDayIndex,
  onClose,
  onResize,
  onDragStart,
  cellWidth,
}) => {
  const [resizing, setResizing] = useState<"left" | "right" | null>(null);
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing && eventRef.current) {
        const rect = eventRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const deltaColumns = Math.round(offsetX / cellWidth);

        if (resizing === "left") {
          const newStartDayIndex = Math.max(startDayIndex + deltaColumns, 0);
          if (newStartDayIndex < endDayIndex) {
            onResize(id, newStartDayIndex, endDayIndex);
          }
        } else {
          const newEndDayIndex = Math.max(
            startDayIndex + deltaColumns - 1,
            startDayIndex
          );
          onResize(id, startDayIndex, newEndDayIndex);
        }
      }
    };

    const handleMouseUp = () => {
      setResizing(null);
    };

    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizing, id, startDayIndex, endDayIndex, onResize, cellWidth]);

  const handleResizeStart = (
    e: React.MouseEvent,
    direction: "left" | "right"
  ) => {
    e.stopPropagation();
    setResizing(direction);
  };

  return (
    <div
      ref={eventRef}
      className="p-2 rounded shadow-md cursor-move relative"
      style={{
        backgroundColor: color,
        width: `${(endDayIndex - startDayIndex + 1) * cellWidth}px`,
        position: "absolute",
        left: `${startDayIndex * cellWidth}px`,
        top: 0,
        bottom: 0,
        zIndex: 10,
      }}
      draggable={!resizing}
      onDragStart={(e) => !resizing && onDragStart(e, id)}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize"
        onMouseDown={(e) => handleResizeStart(e, "left")}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize"
        onMouseDown={(e) => handleResizeStart(e, "right")}
      />
      {name}
      <button className="ml-2 text-white" onClick={() => onClose(id)}>
        x
      </button>
    </div>
  );
};

export default Event;
