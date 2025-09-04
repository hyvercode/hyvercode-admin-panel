
import React, { useState, useEffect } from 'react';

const data = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const SampleChart: React.FC = () => {
  const [recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    // A robust way to wait for a CDN script to load and be attached to the window object.
    const checkForRecharts = () => {
      if ((window as any).Recharts) {
        setRecharts((window as any).Recharts);
        return true;
      }
      return false;
    };

    if (checkForRecharts()) {
      return; // Recharts was already loaded
    }
    
    // If not loaded, poll for it. This handles race conditions.
    const intervalId = setInterval(() => {
      if (checkForRecharts()) {
        clearInterval(intervalId);
      }
    }, 100);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (!recharts) {
    return (
      <div className="bg-white dark:bg-dark rounded-lg shadow-md p-6 h-96 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-gray-500 dark:text-gray-400 mt-4">Loading Chart Data...</p>
      </div>
    );
  }

  const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = recharts;

  return (
    <div className="bg-white dark:bg-dark rounded-lg shadow-md p-6 h-96">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Monthly Overview</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="name" stroke="rgb(107 114 128)" />
          <YAxis stroke="rgb(107 114 128)" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(31, 41, 55, 0.8)', 
              borderColor: 'rgba(55, 65, 81, 1)',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#0d6efd" name="Revenue" />
          <Bar dataKey="expenses" fill="#6c757d" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SampleChart;
