import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompanyChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Line yAxisId="left" type="monotone" dataKey="googleTrends" stroke="#8884d8" />
      <Line yAxisId="left" type="monotone" dataKey="websiteTraffic" stroke="#82ca9d" />
      <Line yAxisId="left" type="monotone" dataKey="instagram" stroke="#ffc658" />
      <Line yAxisId="right" type="monotone" dataKey="altInsightsIndex" stroke="#ff7300" />
      <Line yAxisId="right" type="monotone" dataKey="analystEstimate" stroke="#ff0000" />
    </LineChart>
  </ResponsiveContainer>
);

export default CompanyChart;