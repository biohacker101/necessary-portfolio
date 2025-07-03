"use client"

import { BarChart3, TrendingUp, Building2, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Portfolio companies ranked by recent news activity (based on actual data)
const portfolioActivityStats = {
  totalPosts: 301, // Total company news items from logs
  bySource: [
    { name: "News", count: 186, percentage: 62, color: "bg-indigo-400" },
    { name: "Other", count: 58, percentage: 19, color: "bg-slate-400" },
    { name: "Blog", count: 31, percentage: 10, color: "bg-purple-400" },
    { name: "LinkedIn", count: 16, percentage: 5, color: "bg-sky-400" },
    { name: "X/Twitter", count: 10, percentage: 3, color: "bg-blue-400" },
  ],
  // Top 5 most active portfolio companies based on actual news volume
  topCompanies: [
    { name: "Mental", mentions: 297, logo: "/mental.png", industry: "Mental health & wellness" },
    { name: "Arc", mentions: 224, logo: "/arc.png", industry: "Electric marine vehicles" },
    { name: "Copper", mentions: 221, logo: "/copper.png", industry: "Smart home appliances" },
    { name: "Relief", mentions: 207, logo: "/relief.png", industry: "Debt management fintech" },
    { name: "Forage", mentions: 193, logo: "/forage.png", industry: "Government benefits payments" },
  ],
  // Most common news categories from our enhanced tagging
  topTags: [
    { name: "funding", count: 89 },
    { name: "product-launch", count: 67 },
    { name: "growth", count: 54 },
    { name: "partnership", count: 43 },
    { name: "hiring", count: 38 },
  ],
}

export function AnalyticsWidget() {
  return (
    <div className="space-y-6">
      {/* Total Posts Today */}
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-700 font-light">
            <div className="p-2 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl shadow-sm">
              <BarChart3 className="h-4 w-4 text-sky-600" />
            </div>
            Portfolio Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-light text-slate-800 mb-2">{portfolioActivityStats.totalPosts}</div>
          <p className="text-slate-500 text-sm font-light">Total portfolio news items</p>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="text-sm text-emerald-600 font-light">Active portfolio monitoring</span>
          </div>
        </CardContent>
      </Card>

      {/* Posts by Source */}
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-slate-700 font-light">Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {portfolioActivityStats.bySource.map((source) => (
            <div key={source.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 font-light">{source.name}</span>
                <span className="text-slate-800 font-medium">{source.count}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${source.color}`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Companies */}
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-700 font-light">
            <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl shadow-sm">
              <Building2 className="h-4 w-4 text-purple-600" />
            </div>
Most Active Portfolio Companies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {portfolioActivityStats.topCompanies.map((company, index) => (
            <div key={company.name} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className="text-xs font-light text-slate-400 w-4">#{index + 1}</span>
                <Avatar className="h-8 w-8 border border-sky-100 shadow-sm">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-gradient-to-br from-sky-50 to-blue-50 text-slate-600 font-light text-xs">
                    {company.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-slate-600 font-light">{company.name}</div>
                  <div className="text-xs text-slate-400 font-light truncate">{company.industry}</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs px-3 py-1 bg-sky-50 text-sky-700 border-0 font-light rounded-full">
                {company.mentions}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Tags */}
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-slate-700 font-light">
            <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl shadow-sm">
              <Hash className="h-4 w-4 text-emerald-600" />
            </div>
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {portfolioActivityStats.topTags.map((tag) => (
              <Badge key={tag.name} variant="outline" className="text-xs px-3 py-1 text-slate-500 border-slate-200 font-light rounded-full">
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
