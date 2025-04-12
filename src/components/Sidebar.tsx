
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  DollarSign, 
  Users, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { 
      path: "/", 
      name: "Dashboard", 
      icon: LayoutDashboard 
    },
    { 
      path: "/inventory", 
      name: "Inventory", 
      icon: Package 
    },
    { 
      path: "/expenses", 
      name: "Expenses", 
      icon: DollarSign 
    },
    { 
      path: "/users", 
      name: "Users", 
      icon: Users 
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className={cn(
        "bg-sidebar h-screen border-r border-sidebar-border z-30 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-0 -ml-4 md:w-16 md:ml-0"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center text-xl font-bold text-sidebar-foreground">
              <svg id="logo-39" width="32" height="26" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"> 
                <path d="M25.0001 0L50 15.0098V24.9863L25.0001 40L0 24.9863V15.0099L25.0001 0Z" fill="#A5B4FC" className="ccompli2"></path> 
                <path fillRule="evenodd" clipRule="evenodd" d="M0 15.0098L25 0L50 15.0098V24.9863L25 40L0 24.9863V15.0098ZM25 33.631L44.6967 21.8022V18.1951L44.6957 18.1945L25 30.0197L5.30426 18.1945L5.3033 18.1951V21.8022L25 33.631ZM25 24.5046L40.1018 15.4376L36.4229 13.2298L25 20.0881L13.5771 13.2298L9.89822 15.4376L25 24.5046ZM25 14.573L31.829 10.4729L25 6.37467L18.171 10.4729L25 14.573Z" fill="#4F46E5" className="ccustom"></path> 
                <path d="M25.0001 0L0 15.0099V24.9863L25 40L25.0001 0Z" fill="#A5B4FC" className="ccompli2" fillOpacity="0.3"></path> 
              </svg>
              NEXORA
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        <nav className="px-2 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon size={20} className={cn("mr-3", !isSidebarOpen && "mx-auto")} />
              {isSidebarOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default Sidebar;
