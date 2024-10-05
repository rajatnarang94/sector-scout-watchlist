import { useParams, useLocation, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const fetchSectorData = async (sector) => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { ticker: "NKE", googleTrends: 5, instagramLikes: 10, websiteTraffic: 15, analystEstimate: 1.2, altInsightsIndex: 1.3, recommendation: "Buy" },
        { ticker: "LULU", googleTrends: 3, instagramLikes: 8, websiteTraffic: 12, analystEstimate: 0.9, altInsightsIndex: 0.85, recommendation: "Sell" },
        { ticker: "FOSL", googleTrends: -2, instagramLikes: -5, websiteTraffic: -8, analystEstimate: 0.3, altInsightsIndex: 0.31, recommendation: "Hold" },
        { ticker: "URBN", googleTrends: 1, instagramLikes: 2, websiteTraffic: 3, analystEstimate: 0.7, altInsightsIndex: 0.8, recommendation: "Buy" },
      ]);
    }, 1000);
  });
};

const SectorResults = () => {
  const { sector } = useParams();
  const location = useLocation();

  const { data: sectorData, isLoading, error } = useQuery({
    queryKey: ["sectorData", sector],
    queryFn: () => fetchSectorData(sector),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{sector} Sector Results</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Google Trends</TableHead>
            <TableHead>Instagram Likes</TableHead>
            <TableHead>Website Traffic</TableHead>
            <TableHead>Analyst Estimate</TableHead>
            <TableHead>AltInsights Index</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectorData.map((company) => (
            <TableRow key={company.ticker}>
              <TableCell>
                <Link
                  to={`/company/${company.ticker}`}
                  state={{ sector }}
                  className="text-blue-600 hover:underline"
                >
                  {company.ticker}
                </Link>
              </TableCell>
              <TableCell>{company.googleTrends}%</TableCell>
              <TableCell>{company.instagramLikes}%</TableCell>
              <TableCell>{company.websiteTraffic}%</TableCell>
              <TableCell>${company.analystEstimate.toFixed(2)}</TableCell>
              <TableCell>${company.altInsightsIndex.toFixed(2)}</TableCell>
              <TableCell>{company.recommendation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SectorResults;