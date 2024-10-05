import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SectorSearch = () => {
  const [sector, setSector] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (sector.trim()) {
      navigate(`/sector/${encodeURIComponent(sector.trim())}`, { state: { sector: sector.trim() } });
    }
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
    </div>
  );
};

export default SectorSearch;