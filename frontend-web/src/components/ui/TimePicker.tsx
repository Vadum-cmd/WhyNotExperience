import React from 'react';
import './TimePicker.css';

interface TimePickerProps {
  times: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  times,
  selectedTime,
  onTimeSelect,
  className = '',
}) => {
  return (
    <div className={`time-picker ${className}`}>
      {times.map((time) => (
        <button
          key={time}
          className={`time-slot ${selectedTime === time ? 'time-slot-selected' : ''}`}
          onClick={() => onTimeSelect(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default TimePicker;

