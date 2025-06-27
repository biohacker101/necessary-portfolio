"use client"

import { BarChart3, TrendingUp, Building2, Hash } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const todayStats = {
  totalPosts: 67,
  bySource: [
    { name: "LinkedIn", count: 24, percentage: 36 },
    { name: "X/Twitter", count: 18, percentage: 27 },
    { name: "News", count: 12, percentage: 18 },
    { name: "Blog", count: 8, percentage: 12 },
    { name: "Other", count: 5, percentage: 7 },
  ],
  topCompanies: [
    { name: "Figma", mentions: 15 },
    { name: "Stripe", mentions: 12 },
    { name: "Vercel", mentions: 9 },
    { name: "Notion", mentions: 8 },
    { name: "Linear", mentions: 6 },
  ],
  topTags: [
    { name: "product-launch", count: 12 },
    { name: "fundraise", count: 8 },
    { name: "hiring", count: 6 },
    { name: "partnership", count: 5 },
    { name: "press", count: 4 },
  ],
}

export function AnalyticsWidget() {
  return (
    <div className="space-y-6">
      {/* Total Posts Today */}
      <Card className="glass-card rounded-2xl border-white/10 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-white tracking-tight">
            <div className="glass-card p-2 rounded-xl">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-white mb-2 tracking-tighter">{todayStats.totalPosts}</div>
          <p className="text-white/60 text-sm font-medium">Total posts today</p>
          <div className="flex items-center gap-2 mt-3">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">+12% from yesterday</span>
          </div>
        </CardContent>
      </Card>

      {/* Posts by Source */}
      <Card className="glass-card rounded-2xl border-white/10 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-white tracking-tight">Posts by Source</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayStats.bySource.map((source) => (
            <div key={source.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white font-medium">{source.name}</span>
                <span className="text-white/80 font-semibold">{source.count}</span>
              </div>
              <Progress value={source.percentage} className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${source.percentage}%` }}
                />
              </Progress>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Companies */}
      <Card className="glass-card rounded-2xl border-white/10 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-white tracking-tight">
            <div className="glass-card p-2 rounded-xl">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            Most Active Companies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todayStats.topCompanies.map((company, index) => (
            <div key={company.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-white/60 w-6">#{index + 1}</span>
                <span className="text-sm text-white font-medium">{company.name}</span>
              </div>
              <Badge className="glass-badge rounded-full text-white text-xs font-medium px-3 py-1">
                {company.mentions}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Tags */}
      <Card className="glass-card rounded-2xl border-white/10 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3 text-white tracking-tight">
            <div className="glass-card p-2 rounded-xl">
              <Hash className="h-5 w-5 text-white" />
            </div>
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {todayStats.topTags.map((tag) => (
              <Badge key={tag.name} className="glass-badge rounded-full text-white text-xs font-medium px-3 py-1">
                {tag.name} ({tag.count})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
