import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import CompanyChart from "./CompanyChart";
import CompanySummary from "./CompanySummary";
import QuarterlyDataTable from "./QuarterlyDataTable";

const fetchCompanyDetails = async (ticker) => {
  // This is a mock API call. Replace with actual API endpoint.
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ticker,
        name: "Example Company",
        quarterlyData: [
          { quarter: "Q2 2022", "Google Trends": 2000, "Website Traffic": 9800, instagram: 2290, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { quarter: "Q3 2022", "Google Trends": 2780, "Website Traffic": 3908, instagram: 2000, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { quarter: "Q4 2022", "Google Trends": 1890, "Website Traffic": 4800, instagram: 2181, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { quarter: "Q1 2023", "Google Trends": 2390, "Website Traffic": 3800, instagram: 2500, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { quarter: "Q2 2023", "Google Trends": 3490, "Website Traffic": 4300, instagram: 2800, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { quarter: "Q3 2023", "Google Trends": 3000, "Website Traffic": 4100, instagram: 2600, altInsightsIndex: 1.9, analystEstimate: 1.8 },
          { quarter: "Q4 2023 (Predicted)", "Google Trends": 3200, "Website Traffic": 4500, instagram: 2900, altInsightsIndex: 2.0, analystEstimate: 1.9 },
        ],
        chartData: [
          { name: 'Q2 2022', "Google Trends": 2000, "Website Traffic": 9800, instagram: 2290, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { name: 'Q3 2022', "Google Trends": 2780, "Website Traffic": 3908, instagram: 2000, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { name: 'Q4 2022', "Google Trends": 1890, "Website Traffic": 4800, instagram: 2181, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { name: 'Q1 2023', "Google Trends": 2390, "Website Traffic": 3800, instagram: 2500, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { name: 'Q2 2023', "Google Trends": 3490, "Website Traffic": 4300, instagram: 2800, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { name: 'Q3 2023', "Google Trends": 3000, "Website Traffic": 4100, instagram: 2600, altInsightsIndex: 1.9, analystEstimate: 1.8 },
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

  if (!companyDetails || !companyDetails.quarterlyData) {
    return <p>No data available for this company.</p>;
  }

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => navigate(`/sector/${sector}`, { state: { sector } })}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {sector} Sector
      </Button>
      <h2 className="text-2xl font-bold mb-4">{ticker}</h2>
      <CompanySummary chartData={companyDetails.chartData} />
      <QuarterlyDataTable quarterlyData={companyDetails.quarterlyData} />
    </div>
  );
};

export default CompanyDetails;
