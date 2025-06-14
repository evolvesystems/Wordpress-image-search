
import React from 'react';
import { AdminTopNav } from './AdminTopNav';
import { ExternalLink } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AdminTopNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-5 px-6">
        <div className="flex justify-center items-center">
          <a
            href="https://lovable.dev/invite/de9ea0bd-3b51-4f3f-b027-cff747c4792a"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-md font-semibold"
          >
            Built with 💙 by Lovable - Get your own AI app!
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
