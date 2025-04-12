
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
        "bg-white h-screen border-r border-gray-200 z-30 transition-all duration-300 ease-in-out",
        isSidebarOpen ? "w-64" : "w-0 -ml-4 md:w-16 md:ml-0"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {isSidebarOpen && (
            <Link to="/" className="text-xl font-bold text-primary">
              SkinTrack
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
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
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
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
