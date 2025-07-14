"use client"

import * as React from "react"
import { Cloud, ChevronUp, User2, Settings, Building2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { portfolioCompanies } from "@/lib/news-api"

// Simplified data structure
const data = {
  user: {
    name: "Portfolio Manager",
    email: "manager@necessary.com",
    avatar: "/placeholder-user.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props} className="border-r border-slate-200/60">
      <SidebarHeader className="border-b border-slate-200/60 bg-white/40 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="text-slate-700 hover:bg-slate-100/60" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white/50 border border-sky-200">
                  <img
                    src="/necessary.png?v=2"
                    alt="Necessary"
                    className="h-4 w-auto object-contain max-w-7"
                    onError={(e) => {
                      console.log('Image failed to load:', e);
                      // Fallback to cloud icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<svg class="size-4 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path></svg>';
                      }
                    }}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium tracking-wide">NECESSARY</span>
                  <span className="truncate text-xs text-slate-500 font-light">Portfolio Intelligence</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <SidebarContent className="bg-white/20 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-600 font-light tracking-wide flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Portfolio Companies
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portfolioCompanies.map((company) => (
                <SidebarMenuItem key={company.id}>
                  <SidebarMenuButton asChild className="text-slate-700 hover:bg-white/60 transition-colors">
                    <a href={`/company/${company.id}`} className="font-light group">
                      <span className="truncate group-hover:text-sky-700 transition-colors">{company.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-white/60"
                >
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-sky-50 to-blue-50 text-slate-600 font-light">
                      {data.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium text-slate-700">{data.user.name}</span>
                    <span className="truncate text-xs text-slate-500 font-light">{data.user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4 text-slate-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white/90 backdrop-blur-sm border border-slate-200"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 border border-slate-200">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback className="bg-gradient-to-br from-sky-50 to-blue-50 text-slate-600 font-light">
                        {data.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium text-slate-700">{data.user.name}</span>
                      <span className="truncate text-xs text-slate-500 font-light">{data.user.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-slate-700 hover:bg-white/60 font-light">
                  <User2 className="mr-2 h-4 w-4" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-700 hover:bg-white/60 font-light">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 hover:bg-red-50 font-light">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
