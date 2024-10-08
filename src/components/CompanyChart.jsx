import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const formatBillions = (value) => (value === 0 ? '' : `$${value.toFixed(2)}B`);
const formatPercentage = (value) => (value === 0 ? '' : `${value}%`);

const CompanyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis 
          yAxisId="left" 
          tickFormatter={formatPercentage}
          allowDecimals={false}
          domain={[0, 'dataMax']}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          tickFormatter={formatBillions}
          domain={[0, 'dataMax']}
        />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'AltInsights Index' || name === 'Analyst Estimate' || name === 'Actual Earnings') {
              return [formatBillions(value), name];
            }
            return [formatPercentage(value), name];
          }}
        />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="Google Trends" name="Google Trends" stroke="#8884d8" />
        <Line yAxisId="left" type="monotone" dataKey="Website Traffic" name="Website Traffic" stroke="#82ca9d" />
        <Line yAxisId="left" type="monotone" dataKey="instagram" name="Instagram" stroke="#ffc658" />
        <Line yAxisId="right" type="monotone" dataKey="altInsightsIndex" name="AltInsights Index" stroke="#ff7300" />
        <Line yAxisId="right" type="monotone" dataKey="analystEstimate" name="Analyst Estimate" stroke="#ff0000" />
        <Line yAxisId="right" type="monotone" dataKey="actualEarnings" name="Actual Earnings" stroke="#ddc57e" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CompanyChart;