import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const fetchCompanyDetails = async (ticker) => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ticker,
        name: "Example Company",
        data: [
          { name: 'Jan', googleTrends: 4000, websiteTraffic: 2400, instagram: 2400 },
          { name: 'Feb', googleTrends: 3000, websiteTraffic: 1398, instagram: 2210 },
          { name: 'Mar', googleTrends: 2000, websiteTraffic: 9800, instagram: 2290 },
          { name: 'Apr', googleTrends: 2780, websiteTraffic: 3908, instagram: 2000 },
          { name: 'May', googleTrends: 1890, websiteTraffic: 4800, instagram: 2181 },
          { name: 'Jun', googleTrends: 2390, websiteTraffic: 3800, instagram: 2500 },
        ],
      });
    }, 1000);
  });
};

const CompanyDetails = () => {
  const { ticker } = useParams();
  const { data: companyDetails, isLoading, error } = useQuery({
    queryKey: ["companyDetails", ticker],
    queryFn: () => fetchCompanyDetails(ticker),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="googleTrends" stroke="#8884d8" />
              <Line type="monotone" dataKey="websiteTraffic" stroke="#82ca9d" />
              <Line type="monotone" dataKey="instagram" stroke="#ffc658" />
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
            <p className="text-2xl font-bold">{companyDetails.data[companyDetails.data.length - 1].googleTrends}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Website Traffic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{companyDetails.data[companyDetails.data.length - 1].websiteTraffic}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Instagram</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{companyDetails.data[companyDetails.data.length - 1].instagram}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyDetails;