import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchWatchlistData = async () => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { ticker: "AAPL", googleTrends: 2, instagramLikes: 5, websiteTraffic: 8 },
        { ticker: "GOOGL", googleTrends: 4, instagramLikes: 7, websiteTraffic: 10 },
        { ticker: "AMZN", googleTrends: 3, instagramLikes: 6, websiteTraffic: 9 },
      ]);
    }, 1000);
  });
};

const Watchlist = () => {
  const { data: watchlistData, isLoading, error } = useQuery({
    queryKey: ["watchlistData"],
    queryFn: fetchWatchlistData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ticker</TableHead>
            <TableHead>Google Trends</TableHead>
            <TableHead>Instagram Likes</TableHead>
            <TableHead>Website Traffic</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlistData.map((company) => (
            <TableRow key={company.ticker}>
              <TableCell>
                <Link to={`/company/${company.ticker}`} className="text-blue-600 hover:underline">
                  {company.ticker}
                </Link>
              </TableCell>
              <TableCell>{company.googleTrends}%</TableCell>
              <TableCell>{company.instagramLikes}%</TableCell>
              <TableCell>{company.websiteTraffic}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;