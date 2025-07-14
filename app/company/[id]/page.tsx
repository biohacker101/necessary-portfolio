"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Building2, Globe, Calendar, TrendingUp, ExternalLink, RefreshCw, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FeedCard } from "@/components/feed-card"
import { CrunchbaseCompanyInfo } from "@/components/crunchbase-company-info"
import { portfolioCompanies, type Company, type FeedItem } from "@/lib/news-api"

interface CompanyNewsResponse {
  success: boolean;
  data: FeedItem[];
  totalResults: number;
}

export default function CompanyPage() {
  const params = useParams()
  const companyId = params.id as string
  
  const [company, setCompany] = useState<Company | null>(null)
  const [news, setNews] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Find the company by ID
  useEffect(() => {
    const foundCompany = portfolioCompanies.find(c => c.id === companyId)
    if (foundCompany) {
      setCompany(foundCompany)
    } else {
      setError("Company not found")
      setLoading(false)
    }
  }, [companyId])

  // Fetch company-specific news
  const fetchCompanyNews = async (isRefresh = false) => {
    if (!company) return
    
    if (isRefresh) {
      setRefreshing(true)
    }

    try {
      const response = await fetch(`/api/company/${company.id}/news`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: CompanyNewsResponse = await response.json()
      
      if (result.success) {
        setNews(result.data)
        setError(null)
      } else {
        throw new Error("Failed to fetch company news")
      }
    } catch (err) {
      console.error("Error fetching company news:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch news")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    if (company) {
      fetchCompanyNews()
    }
  }, [company])

  const handleBookmark = (id: string) => {
    setNews((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    )
  }

  const handleMarkAsRead = (id: string) => {
    setNews((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, read: !item.read } : item
      )
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-light">Loading company details...</p>
        </div>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-light text-slate-800 mb-4">Company Not Found</h1>
          <p className="text-slate-600 mb-6">{error || "The requested company could not be found."}</p>
          <Link href="/">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white font-light">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const recentNews = news.slice(0, 5)
  const totalEngagement = news.reduce((sum, item) => sum + (item.engagementScore || 0), 0)
  const avgEngagement = news.length > 0 ? Math.round(totalEngagement / news.length) : 0

  // Get unique tags
  const allTags = news.flatMap(item => item.tags)
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)

  return (
    <div className="flex-1 space-y-8 p-8 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm" className="necessary-button">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        
        <div className="flex items-center gap-4 flex-1">
          <img
            src={company.logo}
            alt={company.name + ' Logo'}
            className="h-16 w-32 max-w-[128px] object-contain bg-white p-2"
            style={{ borderRadius: 0, boxShadow: 'none', border: 'none' }}
          />
          <div className="flex-1">
            <h1 className="text-4xl font-light text-slate-800 tracking-wide mb-2">{company.name}</h1>
            <p className="text-slate-500 font-light">Portfolio Company Intelligence</p>
          </div>

          <Button
            onClick={() => fetchCompanyNews(true)}
            disabled={refreshing}
            variant="outline"
            className="necessary-button"
          >
            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>



      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* News Feed */}
        <div className="lg:col-span-2">
          <Card className="necessary-card">
            <CardHeader>
              <CardTitle className="text-xl font-light text-slate-800 tracking-wide flex items-center gap-3">
                <Building2 className="h-5 w-5 text-sky-600" />
                Latest News
              </CardTitle>
            </CardHeader>
            <CardContent>
              {news.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="font-light">No news found for {company.name}</p>
                  <p className="text-sm mt-2 font-light">Try refreshing to fetch the latest updates</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {news.map((item) => (
                    <FeedCard 
                      key={item.id} 
                      item={item} 
                      onBookmark={handleBookmark} 
                      onMarkAsRead={handleMarkAsRead} 
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Crunchbase Company Info */}
          <CrunchbaseCompanyInfo companyName={company.name} companyId={company.id} />

          {/* Company Info */}
          <Card className="necessary-card">
            <CardHeader>
              <CardTitle className="text-lg font-light text-slate-800">Company Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-slate-500 font-light">Search Terms</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-slate-600 font-light">
                    {company.name}
                  </Badge>
                  {company.searchTerms?.map((term) => (
                    <Badge key={term} variant="outline" className="text-slate-600 font-light">
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-500 font-light">Company ID</p>
                <p className="text-sm text-slate-700 font-mono mt-1">{company.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Top Topics */}
          {topTags.length > 0 && (
            <Card className="necessary-card">
              <CardHeader>
                <CardTitle className="text-lg font-light text-slate-800">Top Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topTags.map(([tag, count]) => (
                    <div key={tag} className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-sky-50 text-sky-700 font-light">
                        {tag}
                      </Badge>
                      <span className="text-sm text-slate-500 font-light">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="necessary-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-light text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl shadow-sm">
                  <ExternalLink className="h-4 w-4 text-purple-600" />
                </div>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full necessary-button justify-start text-slate-600 font-light hover:bg-slate-50" asChild>
                <a href={`https://www.google.com/search?q=${encodeURIComponent(company.name)}`} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-3 text-slate-400" />
                  Google Search
                </a>
              </Button>
              
              <Button variant="outline" className="w-full necessary-button justify-start text-slate-600 font-light hover:bg-slate-50" asChild>
                <a href={`https://news.google.com/search?q=${encodeURIComponent(company.name)}`} target="_blank" rel="noopener noreferrer">
                  <Building2 className="h-4 w-4 mr-3 text-slate-400" />
                  Google News
                </a>
              </Button>
              
              <Button variant="outline" className="w-full necessary-button justify-start text-slate-600 font-light hover:bg-slate-50" asChild>
                <a href={`https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(company.name)}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-3 text-slate-400" />
                  LinkedIn Search
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}