
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 h-9 w-full" 
          />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <Button variant="ghost" size="icon" className="text-gray-500 relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs flex items-center justify-center w-4 h-4 rounded-full">
            3
          </span>
        </Button>
        <div className="ml-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
            AS
          </div>
          <span className="ml-2 text-sm font-medium hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
