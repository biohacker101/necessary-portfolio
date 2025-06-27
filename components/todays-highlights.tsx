"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, TrendingUp, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockHighlights } from "@/lib/mock-data"

export function TodaysHighlights() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const highlights = mockHighlights

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % highlights.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="glass-card p-3 rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tighter">Today's Highlights</h2>
            <p className="text-white/60 text-sm">Top engagement updates from your portfolio</p>
          </div>
          <Badge className="glass-badge rounded-full text-white font-medium px-3 py-1">{highlights.length}</Badge>
        </div>
        <Button className="glass-button rounded-full text-white border-white/20 hover:bg-white/20 px-6">
          View All
        </Button>
      </div>

      <div className="relative">
        <Card className="glass-card rounded-2xl overflow-hidden border-white/10 shadow-2xl">
          <CardContent className="p-0">
            <div className="relative h-56 md:h-40">
              <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {highlights.map((highlight, index) => (
                  <div key={highlight.id} className="w-full flex-shrink-0 p-8">
                    <div className="flex items-start gap-6 h-full">
                      <Avatar className="h-16 w-16 ring-2 ring-white/20">
                        <AvatarImage src={highlight.company.logo || "/placeholder.svg"} alt={highlight.company.name} />
                        <AvatarFallback className="bg-white/10 text-white font-medium text-lg">
                          {highlight.company.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-semibold text-white tracking-tight">{highlight.company.name}</span>
                          <Badge className="glass-badge rounded-full text-white text-xs font-medium px-2 py-1">
                            {highlight.engagementScore} engagement
                          </Badge>
                        </div>

                        <h3 className="font-medium text-xl mb-3 line-clamp-2 text-white tracking-tight leading-tight">
                          {highlight.title}
                        </h3>

                        <p className="text-white/80 line-clamp-2 mb-4 leading-relaxed">{highlight.summary}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {highlight.tags.slice(0, 2).map((tag) => (
                              <Badge
                                key={tag}
                                className="glass-badge rounded-full text-white text-xs font-medium px-3 py-1"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <a
                            href={highlight.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors font-medium"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View Original
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
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 glass-button rounded-full border-white/20 text-white hover:bg-white/20 bg-transparent"
          onClick={prevSlide}
          disabled={highlights.length <= 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 glass-button rounded-full border-white/20 text-white hover:bg-white/20 bg-transparent"
          onClick={nextSlide}
          disabled={highlights.length <= 1}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Dots Indicator */}
        {highlights.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {highlights.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white scale-110" : "bg-white/30 hover:bg-white/50"
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
