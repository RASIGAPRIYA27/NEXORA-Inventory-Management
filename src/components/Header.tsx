
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-card border-b border-border h-16 flex items-center px-6 sticky top-0 z-10">
      <div className="flex-1 flex items-center">
        <div className="hidden md:flex items-center mr-4">
          <div className="flex items-center">
            <svg id="logo-39" width="40" height="32" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"> 
              <path d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z" fill="#A5B4FC" className="ccompli2"></path> 
              <path fillRule="evenodd" clipRule="evenodd" d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z" fill="#4F46E5" className="ccustom"></path> 
              <path d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z" fill="#A5B4FC" className="ccompli2" fillOpacity="0.3"></path> 
            </svg>
            <span className="text-lg font-bold">NEXORA</span>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 h-9 w-full" 
          />
        </div>
      </div>
      <div className="flex items-center ml-auto">
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell size={20} />
          <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs flex items-center justify-center w-4 h-4 rounded-full">
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
