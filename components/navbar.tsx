"use client"

import { useState } from "react"
import { CalendarDays, Search, Bell, Settings, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { format } from "date-fns"

const portfolioCompanies = [
  "All Companies",
  "Stripe",
  "Notion",
  "Figma",
  "Linear",
  "Vercel",
  "Supabase",
  "Clerk",
  "Resend",
]

export function Navbar() {
  const [date, setDate] = useState<Date>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCompany, setSelectedCompany] = useState("All Companies")
  const { setTheme, theme } = useTheme()

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-7xl">
      <div className="glass-nav rounded-full px-6 py-3 shadow-2xl">
        <div className="flex h-12 items-center gap-4">
          <SidebarTrigger className="text-white hover:bg-white/10 rounded-full" />

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-black font-bold text-sm">NV</span>
            </div>
            <span className="font-semibold text-lg hidden sm:inline tracking-tight">Necessary Ventures Daily</span>
          </div>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="glass-button rounded-full text-white border-white/10 hover:border-white/20"
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{format(date, "MMM d")}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass-card border-white/10" align="start">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>

          {/* Company Selector */}
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="glass-button rounded-full border-white/10 text-white w-[140px] sm:w-[180px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/10">
              {portfolioCompanies.map((company) => (
                <SelectItem key={company} value={company} className="text-white hover:bg-white/10">
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
              <Input
                placeholder="Search updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass-button rounded-full border-white/10 text-white placeholder:text-white/60 focus:border-white/30"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="glass-button rounded-full text-white hover:bg-white/20"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="glass-button rounded-full text-white hover:bg-white/20 relative"
            >
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-white text-black rounded-full">
                3
              </Badge>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="glass-button rounded-full text-white hover:bg-white/20">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-white/10">
                <DropdownMenuLabel className="text-white">John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">Profile</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem className="text-white hover:bg-white/10">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
