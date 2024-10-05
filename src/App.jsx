import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SectorSearch from "./components/SectorSearch";
import SectorResults from "./components/SectorResults";
import Watchlist from "./components/Watchlist";
import CompanyDetails from "./components/CompanyDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<SectorSearch />} />
              <Route path="/sector/:sector" element={<SectorResults />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/company/:ticker" element={<CompanyDetails />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;