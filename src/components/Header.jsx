import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-altinsights-white text-black py-4 shadow-[0_0.25rem_1rem_0_rgba(0,0,0,0.15)] rounded-[2.25rem]">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/altinsights-logo.png" alt="AltInsights Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold text-altinsights-darkBlue">Alt</span><span className="text-2xl font-bold text-altinsights-gold">Insights</span>
        </Link>
        <nav>
          <Button asChild variant="ghost" className="text-black hover:text-altinsights-white">
            <Link to="/">Sector Search</Link>
          </Button>
          <Button asChild variant="ghost" className="text-black hover:text-altinsights-white">
            <Link to="/watchlist">Watchlist</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;