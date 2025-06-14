
import React, { useEffect, useState } from 'react';
import { Image, Key, Activity, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import ImageUpload from '@/components/ImageUpload';
import SearchInterface from '@/components/SearchInterface';
import { useImageSearch } from '@/hooks/useImageSearch';

interface DashboardStats {
  totalImages: number;
  hasApiKey: boolean;
  recentUploads: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { searchImages, results, isLoading, loadAllImages } = useImageSearch();
  const [stats, setStats] = useState<DashboardStats>({
    totalImages: 0,
    hasApiKey: false,
    recentUploads: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardStats();
      loadAllImages();
    }
  }, [user]);

  const loadDashboardStats = async () => {
    if (!user) return;

    try {
      // Get user's images
      const { data: images } = await supabase
        .from('uploaded_images')
        .select('id, uploaded_at')
        .eq('user_id', user.id);

      // Get user's API key settings
      const { data: settings } = await supabase
        .from('user_settings')
        .select('openai_api_key')
        .eq('user_id', user.id)
        .single();

      // Calculate recent uploads (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const recentUploads = images?.filter(img => 
        new Date(img.uploaded_at) > sevenDaysAgo
      ).length || 0;

      setStats({
        totalImages: images?.length || 0,
        hasApiKey: !!(settings?.openai_api_key),
        recentUploads
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    loadAllImages();
    loadDashboardStats();
  };

  const statCards = [
    {
      title: 'My Images',
      value: stats.totalImages,
      icon: Image,
      color: 'bg-blue-500',
      description: 'Total uploaded images'
    },
    {
      title: 'API Configuration',
      value: stats.hasApiKey ? 'Ready' : 'Setup Needed',
      icon: Key,
      color: stats.hasApiKey ? 'bg-green-500' : 'bg-orange-500',
      description: 'OpenAI API status'
    },
    {
      title: 'Recent Activity',
      value: stats.recentUploads,
      icon: Activity,
      color: 'bg-purple-500',
      description: 'Uploads this week'
    },
    {
      title: 'Search Ready',
      value: stats.hasApiKey && stats.totalImages > 0 ? 'Yes' : 'No',
      icon: Upload,
      color: stats.hasApiKey && stats.totalImages > 0 ? 'bg-emerald-500' : 'bg-gray-500',
      description: 'Ready to search images'
    }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome back, {user?.email}</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-20 bg-gray-200 rounded"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <div className="text-sm text-gray-600">Welcome back, {user?.email}</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Image Upload Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
        <ImageUpload onUploadComplete={handleUploadComplete} />
      </Card>

      {/* Search Section */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Search Your Images</h2>
        <SearchInterface 
          onSearch={searchImages}
          isLoading={isLoading}
          results={results}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Configure API key</span>
              <a href="/admin/api-keys" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Setup →
              </a>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Manage my images</span>
              <a href="/admin/images" className="text-green-600 hover:text-green-700 text-sm font-medium">
                View →
              </a>
            </div>
            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Account settings</span>
              <a href="/admin/account" className="text-green-600 hover:text-green-700 text-sm font-medium">
                Manage →
              </a>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Getting Started</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.hasApiKey ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm">Set up OpenAI API key</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.totalImages > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm">Upload your first image</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${stats.hasApiKey && stats.totalImages > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <span className="text-sm">Start searching images</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
