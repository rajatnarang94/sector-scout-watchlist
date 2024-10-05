import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CompanyChart from "./CompanyChart";

const CompanySummary = ({ chartData }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <CompanyChart data={chartData} />
      </CardContent>
    </Card>
  );
};

export default CompanySummary;