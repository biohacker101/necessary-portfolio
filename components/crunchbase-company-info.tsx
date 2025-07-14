"use client"

import { useState, useEffect } from "react"
import { Building2, Globe, MapPin, Calendar, Users, DollarSign, TrendingUp, ExternalLink, RefreshCw, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CrunchbaseCompanyData, formatFunding, formatEmployeeRange } from "@/lib/crunchbase-service"

interface CrunchbaseCompanyInfoProps {
  companyName: string;
  companyId?: string;
}

interface CrunchbaseDataResponse {
  success: boolean;
  data?: CrunchbaseCompanyData;
  source?: 'crunchbase' | 'fallback';
  error?: string;
  timestamp?: string;
}

export function CrunchbaseCompanyInfo({ companyName, companyId }: CrunchbaseCompanyInfoProps) {
  const [crunchbaseData, setCrunchbaseData] = useState<CrunchbaseCompanyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEnhancedData, setIsEnhancedData] = useState(false)

  const fetchCrunchbaseData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const endpoint = `/api/crunchbase/${encodeURIComponent(companyName)}`
      const method = isRefresh ? 'POST' : 'GET'
      
      const response = await fetch(endpoint, { method })
      const result: CrunchbaseDataResponse = await response.json()

      if (result.success && result.data) {
        setCrunchbaseData(result.data)
        setIsEnhancedData(result.source === 'fallback')
        setError(null)
      } else {
        setError(result.error || 'Failed to fetch company data')
      }
    } catch (err) {
      console.error('Error fetching Crunchbase data:', err)
      setError('Network error occurred')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCrunchbaseData()
  }, [companyName])

  const handleRefresh = () => {
    fetchCrunchbaseData(true)
  }

  if (loading) {
    return (
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-light text-slate-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-sm">
                <Building2 className="h-4 w-4 text-orange-600" />
              </div>
              Company Overview
            </CardTitle>
            <Skeleton className="h-8 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error && !crunchbaseData) {
    return (
      <Card className="necessary-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-light text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-sm">
              <Building2 className="h-4 w-4 text-orange-600" />
            </div>
            Company Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-700 font-light">
              {error}. Company data may not be available.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm" 
            className="mt-4 necessary-button text-slate-600 font-light"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!crunchbaseData) {
    return null
  }

  return (
    <Card className="necessary-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-light text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl shadow-sm">
              <Building2 className="h-4 w-4 text-orange-600" />
            </div>
            Company Overview
          </CardTitle>
          <div className="flex items-center gap-2">
            {crunchbaseData.crunchbase_url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(crunchbaseData.crunchbase_url, '_blank')}
                className="necessary-button text-slate-600 font-light"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Crunchbase
              </Button>
            )}
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
              className="necessary-button text-slate-600 font-light"
            >
              {refreshing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* About Section */}
        {crunchbaseData.description && (
          <div>
            <h4 className="font-light text-slate-700 mb-2">About</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              {crunchbaseData.description}
            </p>
          </div>
        )}

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crunchbaseData.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Website</div>
                <a 
                  href={crunchbaseData.website.startsWith('http') ? crunchbaseData.website : `https://${crunchbaseData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-sky-600 hover:underline"
                >
                  {crunchbaseData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}

          {crunchbaseData.headquarters && (
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Headquarters</div>
                <div className="text-sm font-light text-slate-700">{crunchbaseData.headquarters}</div>
              </div>
            </div>
          )}

          {crunchbaseData.founded_date && (
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Founded</div>
                <div className="text-sm font-light text-slate-700">{crunchbaseData.founded_date}</div>
              </div>
            </div>
          )}

          {crunchbaseData.employee_count && (
            <div className="flex items-center gap-3">
              <Users className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Employees</div>
                <div className="text-sm font-light text-slate-700">
                  {formatEmployeeRange(crunchbaseData.employee_count)}
                </div>
              </div>
            </div>
          )}

          {crunchbaseData.industry && (
            <div className="flex items-center gap-3">
              <Building2 className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Industry</div>
                <div className="text-sm font-light text-slate-700">{crunchbaseData.industry}</div>
              </div>
            </div>
          )}

          {crunchbaseData.company_type && (
            <div className="flex items-center gap-3">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              <div>
                <div className="text-xs text-slate-500 font-light">Company Type</div>
                <div className="text-sm font-light text-slate-700">{crunchbaseData.company_type}</div>
              </div>
            </div>
          )}
        </div>

        {/* Funding Information */}
        {crunchbaseData.total_funding > 0 && (
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl shadow-sm">
                <DollarSign className="h-4 w-4 text-emerald-600" />
              </div>
              <h4 className="font-light text-slate-700">Funding</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-slate-500 font-light">Total Funding</div>
                <div className="font-light text-slate-800 text-lg">
                  {formatFunding(crunchbaseData.total_funding)}
                </div>
              </div>
              {crunchbaseData.last_funding_round && (
                <div>
                  <div className="text-xs text-slate-500 font-light">Last Round</div>
                  <div className="font-light text-slate-700">{crunchbaseData.last_funding_round}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        {crunchbaseData.categories && crunchbaseData.categories.length > 0 && (
          <div>
            <h4 className="font-light text-slate-700 mb-3">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {crunchbaseData.categories.slice(0, 4).map((category, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-light bg-sky-50 text-sky-700 border-0">
                  {category}
                </Badge>
              ))}
              {crunchbaseData.categories.length > 4 && (
                <Badge variant="outline" className="text-xs font-light border-slate-200 text-slate-500">
                  +{crunchbaseData.categories.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Last Updated */}
        {crunchbaseData.last_updated && (
          <div className="text-xs text-slate-400 pt-4 border-t border-slate-200 font-light">
            Last updated: {new Date(crunchbaseData.last_updated).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 