import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const formatBillions = (value) => `$${value.toFixed(2)}B`;
const formatPercentage = (value) => `${value}%`;

const QuarterlyDataTable = ({ quarterlyData }) => {
  const latestData = quarterlyData[quarterlyData.length - 2]; // Excluding prediction
  const recommendation = latestData.altInsightsIndex > latestData.analystEstimate ? "Buy" :
    latestData.altInsightsIndex < latestData.analystEstimate ? "Sell" : "Hold";

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quarterly Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quarter</TableHead>
                <TableHead>Google Trends</TableHead>
                <TableHead>Website Traffic</TableHead>
                <TableHead>Instagram</TableHead>
                <TableHead>AltInsights Index</TableHead>
                <TableHead>Analyst Estimate</TableHead>
                <TableHead>Actual Earnings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quarterlyData.map((quarter) => (
                <TableRow key={quarter.quarter}>
                  <TableCell>{quarter.quarter}</TableCell>
                  <TableCell>{formatPercentage(quarter["Google Trends"])}</TableCell>
                  <TableCell>{formatPercentage(quarter["Website Traffic"])}</TableCell>
                  <TableCell>{formatPercentage(quarter.instagram)}</TableCell>
                  <TableCell>{formatBillions(quarter.altInsightsIndex)}</TableCell>
                  <TableCell>{formatBillions(quarter.analystEstimate)}</TableCell>
                  <TableCell>{formatBillions(quarter.actualEarnings)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Latest Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{recommendation}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default QuarterlyDataTable;