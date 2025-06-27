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
  MoreHorizontal,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { FeedItem } from "@/lib/mock-data"
import { formatDistanceToNow } from "date-fns"

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
  linkedin: "text-blue-400",
  twitter: "text-sky-400",
  news: "text-orange-400",
  blog: "text-green-400",
  other: "text-gray-400",
}

export function FeedCard({ item, onBookmark, onMarkAsRead }: FeedCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const SourceIcon = sourceIcons[item.source as keyof typeof sourceIcons]

  return (
    <Card
      className={cn(
        "glass-card rounded-2xl transition-all duration-300 hover:bg-white/10 hover:shadow-2xl border-white/10",
        item.read && "opacity-60",
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Avatar className="h-12 w-12 ring-2 ring-white/20">
              <AvatarImage src={item.company.logo || "/placeholder.svg"} alt={item.company.name} />
              <AvatarFallback className="bg-white/10 text-white font-medium">
                {item.company.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-white tracking-tight">{item.company.name}</span>
                <div className="flex items-center gap-2">
                  <SourceIcon className={cn("h-4 w-4", sourceColors[item.source as keyof typeof sourceColors])} />
                  <span className="text-xs text-white/60 capitalize font-medium">{item.source}</span>
                </div>
              </div>

              <h3 className="font-medium text-lg leading-tight line-clamp-2 text-white tracking-tight">
                <a
                  href={item.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white/80 transition-colors"
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
              className="h-10 w-10 glass-button rounded-full text-white hover:bg-white/20"
            >
              {item.bookmarked ? <BookmarkCheck className="h-4 w-4 text-white" /> : <Bookmark className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onMarkAsRead(item.id)}
              className="h-10 w-10 glass-button rounded-full text-white hover:bg-white/20"
            >
              {item.read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 glass-button rounded-full text-white hover:bg-white/20"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-card border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Original
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">Share</DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10">Hide Similar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className={cn("text-white/80 leading-relaxed tracking-tight", !isExpanded && "line-clamp-3")}>
            {item.summary}
          </p>

          {item.summary.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-auto p-0 text-white/60 hover:text-white font-medium"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} className="glass-badge rounded-full text-white text-xs font-medium px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="font-medium">{formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}</span>
              <a
                href={item.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors font-medium"
              >
                <ExternalLink className="h-3 w-3" />
                View Original
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
