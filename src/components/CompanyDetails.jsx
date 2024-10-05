import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import CompanyChart from "./CompanyChart";

const fetchCompanyDetails = async (ticker) => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ticker,
        name: "Example Company",
        quarterlyData: [
          { quarter: "Q2 2022", googleTrends: 2000, websiteTraffic: 9800, instagram: 2290, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { quarter: "Q3 2022", googleTrends: 2780, websiteTraffic: 3908, instagram: 2000, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { quarter: "Q4 2022", googleTrends: 1890, websiteTraffic: 4800, instagram: 2181, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { quarter: "Q1 2023", googleTrends: 2390, websiteTraffic: 3800, instagram: 2500, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { quarter: "Q2 2023", googleTrends: 3490, websiteTraffic: 4300, instagram: 2800, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { quarter: "Q3 2023", googleTrends: 3000, websiteTraffic: 4100, instagram: 2600, altInsightsIndex: 1.9, analystEstimate: 1.8 },
          { quarter: "Q4 2023 (Predicted)", googleTrends: 3200, websiteTraffic: 4500, instagram: 2900, altInsightsIndex: 2.0, analystEstimate: 1.9 },
        ],
        chartData: [
          { name: 'Q2 2022', googleTrends: 2000, websiteTraffic: 9800, instagram: 2290, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { name: 'Q3 2022', googleTrends: 2780, websiteTraffic: 3908, instagram: 2000, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { name: 'Q4 2022', googleTrends: 1890, websiteTraffic: 4800, instagram: 2181, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { name: 'Q1 2023', googleTrends: 2390, websiteTraffic: 3800, instagram: 2500, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { name: 'Q2 2023', googleTrends: 3490, websiteTraffic: 4300, instagram: 2800, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { name: 'Q3 2023', googleTrends: 3000, websiteTraffic: 4100, instagram: 2600, altInsightsIndex: 1.9, analystEstimate: 1.8 },
        ],
      });
    }, 1000);
  });
};

const CompanyDetails = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const sector = location.state?.sector || "Unknown Sector";

  const { data: companyDetails, isLoading, error } = useQuery({
    queryKey: ["companyDetails", ticker],
    queryFn: () => fetchCompanyDetails(ticker),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const latestData = companyDetails.quarterlyData[companyDetails.quarterlyData.length - 2]; // Excluding prediction
  const recommendation = latestData.altInsightsIndex > latestData.analystEstimate ? "Buy" :
    latestData.altInsightsIndex < latestData.analystEstimate ? "Sell" : "Hold";

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => navigate(`/sector/${sector}`, { state: { sector } })}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {sector} Sector
      </Button>
      <h2 className="text-2xl font-bold mb-4">{companyDetails.name} ({companyDetails.ticker})</h2>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyChart data={companyDetails.chartData} />
        </CardContent>
      </Card>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {companyDetails.quarterlyData.map((quarter) => (
                <TableRow key={quarter.quarter}>
                  <TableCell>{quarter.quarter}</TableCell>
                  <TableCell>{quarter.googleTrends}</TableCell>
                  <TableCell>{quarter.websiteTraffic}</TableCell>
                  <TableCell>{quarter.instagram}</TableCell>
                  <TableCell>${quarter.altInsightsIndex.toFixed(2)}</TableCell>
                  <TableCell>${quarter.analystEstimate.toFixed(2)}</TableCell>
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
    </div>
  );
};

export default CompanyDetails;