
import React from 'react';
import { User, LogOut, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const UserMenu = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5" />
        <span className="text-sm">{user.email}</span>
      </div>
      <Link to="/admin">
        <Button
          variant="outline"
          size="sm"
          className="text-white border-white hover:bg-white hover:text-green-600"
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Dashboard
        </Button>
      </Link>
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="text-white border-white hover:bg-white hover:text-green-600"
      >
        <LogOut className="w-4 h-4 mr-1" />
        Sign Out
      </Button>
    </div>
  );
};

export default UserMenu;
