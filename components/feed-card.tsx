"use client"

import { useState } from "react"
import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Eye,
  EyeOff,
  Linkedin,
  Twitter,
  Newspaper,
  FileText,
  Hash,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { FeedItem } from "@/lib/mock-data"
import { formatDistanceToNow, format, isToday, isYesterday } from "date-fns"

interface FeedCardProps {
  item: FeedItem
  onBookmark: (id: string) => void
  onMarkAsRead: (id: string) => void
}

const sourceIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  news: Newspaper,
  blog: FileText,
  other: Hash,
}

const sourceColors = {
  linkedin: "text-sky-600",
  twitter: "text-blue-500",
  news: "text-indigo-500",
  blog: "text-purple-500",
  other: "text-slate-500",
}

export function FeedCard({ item, onBookmark, onMarkAsRead }: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const SourceIcon = sourceIcons[item.source as keyof typeof sourceIcons]

  // Format date more specifically
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    
    if (isToday(date)) {
      return `Today, ${format(date, "h:mm a")}`
    } else if (isYesterday(date)) {
      return `Yesterday, ${format(date, "h:mm a")}`
    } else {
      const now = new Date()
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diffInDays < 7) {
        return `${format(date, "EEEE")}, ${format(date, "h:mm a")}`
      } else {
        return format(date, "MMM d, yyyy")
      }
    }
  }

  return (
    <Card
      className={cn(
        "necessary-card transition-all duration-300 hover:shadow-xl",
        item.read && "opacity-60 bg-white/40",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Avatar className="h-12 w-12 border border-sky-100 shadow-sm">
              <AvatarImage src={item.company.logo || "/placeholder.svg"} alt={item.company.name} />
              <AvatarFallback className="bg-gradient-to-br from-sky-50 to-blue-50 text-slate-600 font-light">
                {item.company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-medium text-slate-700">{item.company.name}</span>
                <div className="flex items-center gap-2">
                  <SourceIcon className={cn("h-4 w-4", sourceColors[item.source as keyof typeof sourceColors])} />
                  <span className="text-xs text-slate-400 capitalize font-light">{item.source}</span>
                </div>
              </div>

              <h3 className="font-light text-lg leading-tight line-clamp-2 text-slate-800 tracking-wide">
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-600 transition-colors"
                >
                  {item.title}
                </a>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(item.id)}
              className="h-8 w-8 text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
            >
              {item.bookmarked ? <BookmarkCheck className="h-4 w-4 text-sky-600" /> : <Bookmark className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMarkAsRead(item.id)}
              className="h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {item.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className={cn("text-slate-600 leading-relaxed font-light", !isExpanded && "line-clamp-3")}>
            {item.summary}
          </p>

          {item.summary.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-sky-600 hover:text-sky-700 font-light"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-3 py-1 bg-sky-50 text-sky-700 border-0 font-light rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="font-light">{formatTimestamp(item.timestamp)}</span>
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-sky-600 transition-colors font-light"
              >
                <ExternalLink className="h-3 w-3" />
                Source
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
