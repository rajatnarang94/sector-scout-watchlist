import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AltInsights</Link>
        <nav>
          <Button asChild variant="ghost" className="text-white hover:text-gold-300">
            <Link to="/">Sector Search</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:text-gold-300">
            <Link to="/watchlist">Watchlist</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;