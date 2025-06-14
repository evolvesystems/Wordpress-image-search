
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const UserMenu = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <User className="w-5 h-5" />
        <span className="text-sm">{user.email}</span>
      </div>
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
