"use client"

import { useState, useEffect } from "react"
import { FeedCard } from "@/components/feed-card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { mockFeedData, type FeedItem } from "@/lib/mock-data"

export function MainFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  // Simulate API call
  const loadMoreItems = async () => {
    setLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const startIndex = (page - 1) * 10
    const endIndex = startIndex + 10
    const newItems = mockFeedData.slice(startIndex, endIndex)

    if (newItems.length === 0) {
      setHasMore(false)
    } else {
      setFeedItems((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)
    }

    setLoading(false)
  }

  // Load initial items
  useEffect(() => {
    loadMoreItems()
  }, [])

  const handleBookmark = (id: string) => {
    setFeedItems((prev) => prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)))
  }

  const handleMarkAsRead = (id: string) => {
    setFeedItems((prev) => prev.map((item) => (item.id === id ? { ...item, read: !item.read } : item)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-white tracking-tighter">Latest Updates</h2>
          <p className="text-white/60 text-sm font-medium mt-1">Stay up to date with your portfolio companies</p>
        </div>
        <div className="text-sm text-white/60 font-medium">{feedItems.length} updates loaded</div>
      </div>

      <div className="space-y-6">
        {feedItems.map((item) => (
          <FeedCard key={item.id} item={item} onBookmark={handleBookmark} onMarkAsRead={handleMarkAsRead} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={loadMoreItems}
            disabled={loading}
            className="glass-button rounded-full text-white border-white/20 hover:bg-white/20 px-8 py-3 font-medium"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading more updates...
              </>
            ) : (
              "Load More Updates"
            )}
          </Button>
        </div>
      )}

      {!hasMore && feedItems.length > 0 && (
        <div className="text-center py-8 text-white/60 font-medium">You've reached the end of the feed</div>
      )}
    </div>
  )
}
