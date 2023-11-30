// PieChartComponent.jsx
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartComponent = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <PieChart width={200} height={150}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={40}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
