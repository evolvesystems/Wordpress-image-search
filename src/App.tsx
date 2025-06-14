import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminImages from "./pages/admin/AdminImages";
import ApiKeys from "./pages/admin/ApiKeys";
import WordPressSearchSetup from "./pages/admin/WordPressSearchSetup";
import ImageAIAssistant from "@/components/ImageAIAssistant";
import AuthPage from "@/components/AuthPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* AI Chat Assistant bubble now inside BrowserRouter */}
        <ImageAIAssistant />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/account" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          <Route path="/admin/images" element={<AdminLayout><AdminImages /></AdminLayout>} />
          <Route path="/admin/api-keys" element={<AdminLayout><ApiKeys /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><div className="p-6"><h1 className="text-3xl font-bold">Personal Settings</h1><p className="text-gray-600 mt-2">Manage your account preferences and application settings.</p></div></AdminLayout>} />
          <Route path="/admin/wordpress-search-setup" element={<AdminLayout><WordPressSearchSetup /></AdminLayout>} />
          {/* REMOVED AI CHAT - it's globally available now */}
          {/* <Route path="/ai-chat" element={<ImageAIAssistantPage />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
