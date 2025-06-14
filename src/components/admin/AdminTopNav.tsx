
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Key, 
  Image, 
  Home,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "API Keys",
    url: "/admin/api-keys",
    icon: Key,
  },
  {
    title: "WordPress Setup",
    url: "/admin/wordpress-search-setup",
    icon: Image,
  },
];

export function AdminTopNav() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and main nav */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-green-600">Dashboard</span>
            </div>
            
            <div className="hidden md:flex space-x-6">
              {adminMenuItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.url
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/search"
              className="flex items-center gap-2 text-gray-600 hover:text-green-600 text-sm"
            >
              <Home className="w-4 h-4" />
              Back to Search
            </Link>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
