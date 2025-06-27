"use client"

import { useState } from "react"
import {
  Calendar,
  Building2,
  Globe,
  Bookmark,
  TrendingUp,
  BarChart3,
  Filter,
  ChevronDown,
  ChevronRight,
  Linkedin,
  Twitter,
  Newspaper,
  FileText,
  Hash,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const portfolioCompanies = [
  { name: "Stripe", count: 12 },
  { name: "Notion", count: 8 },
  { name: "Figma", count: 15 },
  { name: "Linear", count: 6 },
  { name: "Vercel", count: 9 },
  { name: "Supabase", count: 4 },
  { name: "Clerk", count: 3 },
  { name: "Resend", count: 2 },
]

const sources = [
  { name: "LinkedIn", icon: Linkedin, count: 24 },
  { name: "X/Twitter", icon: Twitter, count: 18 },
  { name: "News", icon: Newspaper, count: 12 },
  { name: "Blog", icon: FileText, count: 8 },
  { name: "Other", icon: Hash, count: 5 },
]

export function AppSidebar() {
  const [expandedSections, setExpandedSections] = useState({
    companies: true,
    sources: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  return (
    <Sidebar className="border-r border-white/10 bg-black">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="glass-card p-2 rounded-xl">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-white tracking-tight">Filters & Navigation</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {/* Today's Highlights */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs font-medium tracking-wider uppercase mb-3">
            Quick Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-12">
                  <TrendingUp className="h-4 w-4" />
                  <span>Today's Highlights</span>
                  <Badge className="ml-auto glass-badge rounded-full text-white text-xs">5</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-12">
                  <Bookmark className="h-4 w-4" />
                  <span>Saved Items</span>
                  <Badge className="ml-auto glass-badge rounded-full text-white text-xs">12</Badge>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-12">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* By Company */}
        <Collapsible open={expandedSections.companies} onOpenChange={() => toggleSection("companies")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-white/60 text-xs font-medium tracking-wider uppercase mb-3 hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  By Company
                </div>
                {expandedSections.companies ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {portfolioCompanies.map((company) => (
                    <SidebarMenuItem key={company.name}>
                      <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-10">
                        <span className="text-sm">{company.name}</span>
                        <Badge className="ml-auto glass-badge rounded-full text-white text-xs">{company.count}</Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* By Source */}
        <Collapsible open={expandedSections.sources} onOpenChange={() => toggleSection("sources")}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-white/60 text-xs font-medium tracking-wider uppercase mb-3 hover:text-white transition-colors">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  By Source
                </div>
                {expandedSections.sources ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {sources.map((source) => (
                    <SidebarMenuItem key={source.name}>
                      <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-10">
                        <source.icon className="h-4 w-4" />
                        <span className="text-sm">{source.name}</span>
                        <Badge className="ml-auto glass-badge rounded-full text-white text-xs">{source.count}</Badge>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Date Filters */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs font-medium tracking-wider uppercase mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton isActive className="glass-button rounded-xl text-white bg-white/20 h-10">
                  <span className="text-sm">Today</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-10">
                  <span className="text-sm">Yesterday</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-10">
                  <span className="text-sm">Last 7 days</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="glass-button rounded-xl text-white hover:bg-white/20 h-10">
                  <span className="text-sm">Last 30 days</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full glass-button rounded-full text-white border-white/20 hover:bg-white/20 bg-transparent"
        >
          Clear All Filters
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
