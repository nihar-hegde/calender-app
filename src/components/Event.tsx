// Event.tsx
import React from "react";

interface EventProps {
  id: string;
  name: string;
  color: string;
  onClose: (id: string) => void;
}

const Event: React.FC<EventProps> = ({ id, name, color, onClose }) => {
  return (
    <div
      className="p-2 rounded shadow-md cursor-move"
      style={{ backgroundColor: color }}
    >
      {name}
      <button className="ml-2 text-white" onClick={() => onClose(id)}>
        x
      </button>
    </div>
  );
};

export default Event;
