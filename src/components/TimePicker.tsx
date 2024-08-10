import { ClockIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

const TimePicker: React.FC<{ onTimeChange: (string: String) => void }> = ({ onTimeChange }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  const timeSlots = [
    '00:01 às 17:00'
  ];

  const handleTimeChange = (time: string) => {
    setSelectedTimeSlot(time);
    onTimeChange(time);
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center flex-col mb-4">
        <ClockIcon className="h-10 w-10 mr-2 text-[#0088cc]" />
        <h2 className="text-md">Em qual horário?</h2>
      </div>
      <div className="flex flex-row gap-3">
        {timeSlots.map((slot) => (
          <button
            type="button"
            key={slot}
            onClick={() => handleTimeChange(slot)}
            className={`p-2 rounded-md w-[135px] ${
              selectedTimeSlot === slot ? 'bg-blue-500 text-white' : 'border'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePicker;
