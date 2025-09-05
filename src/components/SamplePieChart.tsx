import React, { useState, useEffect } from 'react';
import { PRODUCTS_DATA } from '../constants';

// Process data for the pie chart
const salesByCategory = PRODUCTS_DATA.reduce((acc, product) => {
    if (!acc[product.category]) {
        acc[product.category] = 0;
    }
    // Use price * reviewCount as a proxy for sales volume for demonstration
    acc[product.category] += product.price * product.reviewCount; 
    return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(salesByCategory).map(([name, value]) => ({ name, value }));
const COLORS = ['#0C66E4', '#9FB0C7', '#00875A', '#FFAB00'];

const SamplePieChart: React.FC = () => {
  const [recharts, setRecharts] = useState<any>(null);

  useEffect(() => {
    const checkForRecharts = () => {
      if ((window as any).Recharts) {
        setRecharts((window as any).Recharts);
        return true;
      }
      return false;
    };

    if (checkForRecharts()) return;
    
    const intervalId = setInterval(() => {
      if (checkForRecharts()) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  if (!recharts) {
    return (
      <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6 h-96 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = recharts;

  return (
    <div className="bg-neutral-0 dark:bg-neutral-1000 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-900 p-6 h-96">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Sales by Category</h3>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(30, 38, 51, 0.9)', 
              borderColor: 'rgba(68, 81, 102, 1)',
              color: '#fff',
              borderRadius: '0.5rem',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '14px' }}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SamplePieChart;
