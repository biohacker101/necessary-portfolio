"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { FeedItem } from "@/lib/news-api"

interface NewsApiResponse {
  success: boolean;
  data: {
    companyNews: FeedItem[];
    generalNews: FeedItem[];
    highlights: FeedItem[];
  };
  message?: string;
  error?: string;
}

export function TodaysHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [highlights, setHighlights] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch highlights from API
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('/api/news');
        const result: NewsApiResponse = await response.json();
        
        if (result.success && result.data.highlights.length > 0) {
          setHighlights(result.data.highlights);
        } else {
          // Fallback: use top items from combined news if no highlights
          const combinedNews = [
            ...result.data.companyNews,
            ...result.data.generalNews
          ];
          
          const topNews = combinedNews
            .filter(item => item.engagementScore && item.engagementScore > 60)
            .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
            .slice(0, 5);
            
          setHighlights(topNews);
        }
      } catch (error) {
        console.error('Error fetching highlights:', error);
        setHighlights([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-sm">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-light text-slate-700 tracking-wide">TODAY'S HIGHLIGHTS</h2>
              <p className="text-slate-500 text-xs font-light">Loading top stories...</p>
            </div>
          </div>
        </div>
        <div className="necessary-card p-6">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (highlights.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-sm">
              <Star className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-light text-slate-700 tracking-wide">TODAY'S HIGHLIGHTS</h2>
              <p className="text-slate-500 text-xs font-light">No highlights available</p>
            </div>
          </div>
        </div>
        <div className="necessary-card p-6 text-center text-slate-400">
          <Star className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p className="font-light text-sm">Configure SERPAPI_KEY to see highlighted stories</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl shadow-sm">
            <Star className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-light text-slate-700 tracking-wide">TODAY'S HIGHLIGHTS</h2>
            <p className="text-slate-500 text-xs font-light">Most engaging updates from your portfolio</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 text-xs px-3 py-1 border-0 font-light rounded-full">
          {highlights.length} featured
        </Badge>
      </div>

      <div className="relative">
        <Card className="necessary-card overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-40">
              <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {highlights.map((highlight, index) => (
                  <div key={highlight.id} className="w-full flex-shrink-0 p-6">
                    <div className="flex items-start gap-4 h-full">
                      <Avatar className="h-10 w-10 border border-sky-100 shadow-sm">
                        <AvatarImage src={highlight.company.logo || "/placeholder.svg"} alt={highlight.company.name} />
                        <AvatarFallback className="bg-gradient-to-br from-sky-50 to-blue-50 text-slate-600 font-light text-xs">
                          {highlight.company.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-light text-slate-600 text-sm">{highlight.company.name}</span>
                          {highlight.engagementScore && (
                            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 border-0 font-light rounded-full">
                              {highlight.engagementScore}%
                            </Badge>
                          )}
                        </div>

                        <h3 className="font-light text-base mb-2 line-clamp-2 text-slate-800 leading-tight tracking-wide">
                          {highlight.title}
                        </h3>

                        <p className="text-slate-600 line-clamp-2 mb-3 text-xs leading-relaxed font-light">{highlight.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {highlight.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs px-2 py-0.5 text-slate-500 border-slate-200 bg-white/50 font-light rounded-full"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <a
                            href={highlight.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 transition-colors font-light"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Source
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        {highlights.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white shadow-sm border border-slate-200"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-white/80 hover:bg-white shadow-sm border border-slate-200"
              onClick={nextSlide}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </>
        )}

        {/* Dots Indicator */}
        {highlights.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {highlights.map((_, index) => (
              <button
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-sky-500 scale-125" : "bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
