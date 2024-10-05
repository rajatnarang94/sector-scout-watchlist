import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatBillions = (value) => `$${(value).toFixed(2)}B`;

const CompanyChart = ({ data }) => {
  const formattedData = data.map(item => ({
    ...item,
    'AltInsights Index': formatBillions(item.altInsightsIndex),
    'Analyst Estimate': formatBillions(item.analystEstimate)
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Google Trends" name="Google Trends" stroke="#8884d8" />
        <Line yAxisId="left" type="monotone" dataKey="Website Traffic" name="Website Traffic" stroke="#82ca9d" />
        <Line yAxisId="left" type="monotone" dataKey="instagram" name="Instagram" stroke="#ffc658" />
        <Line yAxisId="right" type="monotone" dataKey="AltInsights Index" name="AltInsights Index" stroke="#ff7300" />
        <Line yAxisId="right" type="monotone" dataKey="Analyst Estimate" name="Analyst Estimate" stroke="#ff0000" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CompanyChart;