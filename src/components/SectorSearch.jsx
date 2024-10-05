import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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

const SectorSearch = () => {
  const [sector, setSector] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: sectorData, isLoading, error } = useQuery({
    queryKey: ["sectorData", searchTerm],
    queryFn: () => fetchSectorData(searchTerm),
    enabled: !!searchTerm,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(sector);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter Sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Search</Button>
        </div>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {sectorData && sectorData.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">{searchTerm}</h2>
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
                    <Link to={`/company/${company.ticker}`} className="text-blue-600 hover:underline">
                      {company.ticker}
                    </Link>
                  </TableCell>
                  <TableCell>{company.googleTrends}%</TableCell>
                  <TableCell>{company.instagramLikes}%</TableCell>
                  <TableCell>{company.websiteTraffic}%</TableCell>
                  <TableCell>${company.analystEstimate?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>${company.altInsightsIndex?.toFixed(2) ?? 'N/A'}</TableCell>
                  <TableCell>{company.recommendation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SectorSearch;