
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, 
  Users, 
  Image, 
  BarChart3, 
  Key, 
  Home,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BarChart3,
  },
  {
    title: "My Images",
    url: "/admin/images",
    icon: Image,
  },
  {
    title: "API Keys",
    url: "/admin/api-keys",
    icon: Key,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-lg font-bold px-2 py-4">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span className="text-green-600">My Dashboard</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                    <Home className="w-4 h-4" />
                    <span>Back to Search</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600 font-medium">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="hover:bg-green-50 hover:text-green-700 data-[active=true]:bg-green-100 data-[active=true]:text-green-700"
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t bg-gray-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="px-2 py-2 text-sm text-gray-600 border-b border-gray-200 mb-2">
              <div className="font-medium">{user?.email}</div>
              <div className="text-xs text-gray-500">Personal Dashboard</div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={signOut}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarTrigger className="mt-2" />
      </SidebarFooter>
    </Sidebar>
  );
}
