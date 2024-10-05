import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchCompanyDetails = async (ticker) => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ticker,
        name: "Example Company",
        data: [
          { name: 'Jan', googleTrends: 4000, websiteTraffic: 2400, instagram: 2400, altInsightsIndex: 1.2, analystEstimate: 1.1 },
          { name: 'Feb', googleTrends: 3000, websiteTraffic: 1398, instagram: 2210, altInsightsIndex: 1.3, analystEstimate: 1.2 },
          { name: 'Mar', googleTrends: 2000, websiteTraffic: 9800, instagram: 2290, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { name: 'Apr', googleTrends: 2780, websiteTraffic: 3908, instagram: 2000, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { name: 'May', googleTrends: 1890, websiteTraffic: 4800, instagram: 2181, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { name: 'Jun', googleTrends: 2390, websiteTraffic: 3800, instagram: 2500, altInsightsIndex: 1.7, analystEstimate: 1.6 },
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

  const latestData = companyDetails.data[companyDetails.data.length - 1];
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={companyDetails.data}>
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
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Google Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{latestData.googleTrends}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{latestData.websiteTraffic}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{latestData.instagram}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analyst Estimate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${latestData.analystEstimate.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AltInsights Index</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${latestData.altInsightsIndex.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{recommendation}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDetails;