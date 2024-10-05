import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
          { quarter: "Q2 2022", "Google Trends": 20, "Website Traffic": 98, instagram: 22.9, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { quarter: "Q3 2022", "Google Trends": 27.8, "Website Traffic": 39.1, instagram: 20, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { quarter: "Q4 2022", "Google Trends": 18.9, "Website Traffic": 48, instagram: 21.8, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { quarter: "Q1 2023", "Google Trends": 23.9, "Website Traffic": 38, instagram: 25, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { quarter: "Q2 2023", "Google Trends": 34.9, "Website Traffic": 43, instagram: 28, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { quarter: "Q3 2023", "Google Trends": 30, "Website Traffic": 41, instagram: 26, altInsightsIndex: 1.9, analystEstimate: 1.8 },
          { quarter: "Q4 2023 (Predicted)", "Google Trends": 32, "Website Traffic": 45, instagram: 29, altInsightsIndex: 2.0, analystEstimate: 1.9 },
        ],
        chartData: [
          { name: 'Q2 2022', "Google Trends": 20, "Website Traffic": 98, instagram: 22.9, altInsightsIndex: 1.4, analystEstimate: 1.3 },
          { name: 'Q3 2022', "Google Trends": 27.8, "Website Traffic": 39.1, instagram: 20, altInsightsIndex: 1.6, analystEstimate: 1.5 },
          { name: 'Q4 2022', "Google Trends": 18.9, "Website Traffic": 48, instagram: 21.8, altInsightsIndex: 1.5, analystEstimate: 1.4 },
          { name: 'Q1 2023', "Google Trends": 23.9, "Website Traffic": 38, instagram: 25, altInsightsIndex: 1.8, analystEstimate: 1.7 },
          { name: 'Q2 2023', "Google Trends": 34.9, "Website Traffic": 43, instagram: 28, altInsightsIndex: 1.7, analystEstimate: 1.6 },
          { name: 'Q3 2023', "Google Trends": 30, "Website Traffic": 41, instagram: 26, altInsightsIndex: 1.9, analystEstimate: 1.8 },
        ],
      });
    }, 1000);
  });
};

const CompanyDetails = () => {
  const { ticker } = useParams();
  const navigate = useNavigate();

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
        onClick={() => navigate("/watchlist")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Watchlist
      </Button>
      <h2 className="text-2xl font-bold mb-4">{ticker}</h2>
      <CompanySummary chartData={companyDetails.chartData} />
      <QuarterlyDataTable quarterlyData={companyDetails.quarterlyData} />
    </div>
  );
};

export default CompanyDetails;
