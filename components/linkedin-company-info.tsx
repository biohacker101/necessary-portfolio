"use client"

import { useState, useEffect } from "react"
import { Building2, Globe, MapPin, Calendar, Users, Briefcase, ExternalLink, RefreshCw, Loader2, Linkedin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LinkedInCompanyProfile, formatEmployeeCount, formatFoundedYear, formatSpecialties } from "@/lib/linkedin-service"

interface LinkedInCompanyInfoProps {
  companyName: string;
  companyId?: string;
}

interface LinkedInDataResponse {
  success: boolean;
  data?: LinkedInCompanyProfile;
  cached?: boolean;
  error?: string;
  timestamp?: string;
}

export function LinkedInCompanyInfo({ companyName, companyId }: LinkedInCompanyInfoProps) {
  const [linkedinData, setLinkedinData] = useState<LinkedInCompanyProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCached, setIsCached] = useState(false)

  const fetchLinkedInData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    setError(null)

    try {
      const endpoint = `/api/linkedin/${encodeURIComponent(companyName)}`
      const method = isRefresh ? 'POST' : 'GET'
      
      const response = await fetch(endpoint, { method })
      const result: LinkedInDataResponse = await response.json()

      if (result.success && result.data) {
        setLinkedinData(result.data)
        setIsCached(result.cached || false)
        setError(null)
      } else {
        setError(result.error || 'Failed to fetch LinkedIn data')
      }
    } catch (err) {
      console.error('Error fetching LinkedIn data:', err)
      setError('Network error occurred')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchLinkedInData()
  }, [companyName])

  const handleRefresh = () => {
    fetchLinkedInData(true)
  }

  if (loading) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Linkedin className="h-5 w-5" />
              LinkedIn Profile
            </CardTitle>
            <Skeleton className="h-8 w-20" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error && !linkedinData) {
    return (
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5" />
            LinkedIn Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertDescription>
              {error}. LinkedIn data may not be available for this company.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={handleRefresh} 
            variant="outline" 
            size="sm" 
            className="mt-4"
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

  if (!linkedinData) {
    return null
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-blue-600" />
            LinkedIn Profile
            {isCached && (
              <Badge variant="outline" className="text-xs">
                Cached
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {linkedinData.linkedin_url && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(linkedinData.linkedin_url, '_blank')}
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                View
              </Button>
            )}
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={refreshing}
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
        {linkedinData.about && (
          <div>
            <h4 className="font-medium text-foreground mb-2">About</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {linkedinData.about}
            </p>
          </div>
        )}

        {/* Company Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {linkedinData.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Website</div>
                <a 
                  href={linkedinData.website.startsWith('http') ? linkedinData.website : `https://${linkedinData.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {linkedinData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}

          {linkedinData.headquarters && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Headquarters</div>
                <div className="text-sm font-medium text-foreground">{linkedinData.headquarters}</div>
              </div>
            </div>
          )}

          {linkedinData.founded && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Founded</div>
                <div className="text-sm font-medium text-foreground">{formatFoundedYear(linkedinData.founded)}</div>
              </div>
            </div>
          )}

          {linkedinData.company_size && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Company Size</div>
                <div className="text-sm font-medium text-foreground">{linkedinData.company_size}</div>
              </div>
            </div>
          )}

          {linkedinData.industry && (
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Industry</div>
                <div className="text-sm font-medium text-foreground">{linkedinData.industry}</div>
              </div>
            </div>
          )}

          {linkedinData.company_type && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-xs text-muted-foreground">Company Type</div>
                <div className="text-sm font-medium text-foreground">{linkedinData.company_type}</div>
              </div>
            </div>
          )}
        </div>

        {/* Specialties */}
        {linkedinData.specialties && linkedinData.specialties.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-3">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {linkedinData.specialties.slice(0, 8).map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
              {linkedinData.specialties.length > 8 && (
                <Badge variant="outline" className="text-xs">
                  +{linkedinData.specialties.length - 8} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Last Updated */}
        {linkedinData.last_updated && (
          <div className="text-xs text-muted-foreground pt-4 border-t border-border">
            Last updated: {new Date(linkedinData.last_updated).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 