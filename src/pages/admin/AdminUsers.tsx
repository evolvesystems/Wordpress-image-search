
import React from 'react';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminUsers = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{user?.email}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(user?.created_at || '').toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Account Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Image Upload</h4>
            <p className="text-sm text-gray-600">Upload and manage your agricultural images for AI-powered search and analysis.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">AI Search</h4>
            <p className="text-sm text-gray-600">Search through your images using natural language with OpenAI integration.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Personal Dashboard</h4>
            <p className="text-sm text-gray-600">Track your uploads, manage settings, and monitor your AI search usage.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Privacy</h4>
            <p className="text-sm text-gray-600">Your images and data are private and only accessible to you.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
