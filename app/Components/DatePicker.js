'use client';
import { useState, useEffect } from 'react';


const DatePicker = (props) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [availableDays, setAvailableDays] = useState([]);

  const years = Array.from({ length: 2100 - 2000 + 1 }, (_, i) => 2000 + i);
  
  const months = Array.from({ length: 12 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );

  async function generateDays() {
    if (!selectedYear || !selectedMonth) {
        setAvailableDays([]);
        return;
    }
    const yearNum = parseInt(selectedYear, 10);
    const monthNum = parseInt(selectedMonth, 10);
    const res = await fetch(`/api/get-available-days?year=${yearNum}&month=${monthNum}`);
    const availableDays = await res.json();
    const formattedDays = availableDays.map(day =>
      day.toString().padStart(2, '0')
    );
    setAvailableDays(formattedDays);
  };

  useEffect(() => {
    generateDays();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if(!selectedDay || !selectedMonth || !selectedYear) return;
    const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    props.newDate(formattedDate);
    
  }, [selectedDay, selectedMonth, selectedYear]);


  return (
    <div className="flex gap-4 p-6 bg-white rounded-lg shadow-sm">
      {/* Year Selector */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="w-32 px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Year</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Month Selector */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-32 px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!selectedYear}
      >
        <option value="">Month</option>
        {months.map((month) => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>

      {/* Day Selector */}
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="w-40 px-4 py-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!selectedMonth}
      >
        <option value="">Available Dates</option>
        {availableDays.map((day) => (
          <option key={day} value={day}>{day}</option>
        ))}
      </select>
    </div>
  );
};

export default DatePicker;