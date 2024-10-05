import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatBillions = (value) => `$${value.toFixed(2)}B`;

const CompanyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          yAxisId="left" 
          label={{ value: 'Score (0-100)', angle: -90, position: 'insideLeft' }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickFormatter={formatBillions}
          label={{ value: 'Billion $', angle: 90, position: 'insideRight' }}
        />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'AltInsights Index' || name === 'Analyst Estimate') {
              return [formatBillions(value), name];
            }
            return [value, name];
          }}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Google Trends" name="Google Trends" stroke="#8884d8" />
        <Line yAxisId="left" type="monotone" dataKey="Website Traffic" name="Website Traffic" stroke="#82ca9d" />
        <Line yAxisId="left" type="monotone" dataKey="instagram" name="Instagram" stroke="#ffc658" />
        <Line yAxisId="right" type="monotone" dataKey="altInsightsIndex" name="AltInsights Index" stroke="#ff7300" />
        <Line yAxisId="right" type="monotone" dataKey="analystEstimate" name="Analyst Estimate" stroke="#ff0000" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CompanyChart;