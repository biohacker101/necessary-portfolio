"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchQuery.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    // Trigger search as user types (debounced)
    if (onSearch) {
      onSearch(value.trim())
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 necessary-card border-0 bg-white/30 backdrop-blur-md">
      <div className="px-6 py-4">
        <div className="flex h-10 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-slate-600 hover:bg-white/50 rounded-lg transition-colors" />

            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/necessary.png" 
                alt="Necessary" 
                className="h-10 w-auto object-contain rounded-md"
                onError={(e) => {
                  console.error('Failed to load necessary.png');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end flex-1">
            {/* Search */}
            <form onSubmit={handleSearch} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search portfolio updates..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="pl-10 necessary-button text-slate-600 placeholder:text-slate-400 font-light"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
