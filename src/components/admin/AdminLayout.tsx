
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminSidebar } from './AdminSidebar';
import { ExternalLink } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full flex-col">
        <div className="flex flex-1">
          <AdminSidebar />
          <main className="flex-1 p-6 bg-gray-50">
            {children}
          </main>
        </div>
        <footer className="bg-white border-t border-gray-200 py-3 px-6">
          <div className="flex justify-center items-center">
            <a
              href="https://lovable.dev/invite/de9ea0bd-3b51-4f3f-b027-cff747c4792a"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
            >
              Built by Lovable
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
