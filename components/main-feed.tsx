"use client"

import { useState, useEffect } from "react"
import { FeedCard } from "@/components/feed-card"
import { Button } from "@/components/ui/button"
import { Loader2, Layers, RefreshCw } from "lucide-react"
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

interface MainFeedProps {
  searchQuery?: string;
}

export function MainFeed({ searchQuery }: MainFeedProps) {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  // Filter items based on search query
  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredItems(feedItems)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = feedItems.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.company.name.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      )
      setFilteredItems(filtered)
    }
  }, [feedItems, searchQuery])

  // Fetch news data from API
  const fetchNews = async (isRefresh = false) => {
    if (isRefresh) {
      setLoading(true)
    }
    
    try {
      const response = await fetch('/api/news', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: NewsApiResponse = await response.json();
      
      if (result.success) {
        // Combine company news and general news
        const combinedNews = [
          ...result.data.companyNews,
          ...result.data.generalNews
        ];
        
        // Sort by timestamp (newest first)
        const sortedNews = combinedNews.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        setFeedItems(sortedNews);
        setLastUpdated(new Date());
        setError(null);
        
        if (result.message) {
          console.log(result.message);
        }
      } else {
        throw new Error(result.error || 'Failed to fetch news');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
      
      // Keep existing data if refresh fails
      if (!isRefresh && feedItems.length === 0) {
        setFeedItems([]);
      }
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // Load initial news
  useEffect(() => {
    fetchNews();
  }, []);

  const handleBookmark = (id: string) => {
    setFeedItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  const handleMarkAsRead = (id: string) => {
    setFeedItems((prev) => 
      prev.map((item) => 
        item.id === id ? { ...item, read: !item.read } : item
      )
    );
  };

  const handleRefresh = () => {
    fetchNews(true);
  };

  if (initialLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-slate-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-light">Loading portfolio news...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl shadow-sm">
            <Layers className="h-5 w-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-2xl font-light text-slate-800 tracking-wide">LATEST UPDATES</h2>
            <p className="text-slate-500 text-sm font-light mt-1">
              {lastUpdated 
                ? `Last updated ${lastUpdated.toLocaleTimeString()}`
                : "Real-time intelligence from your portfolio"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-400 font-light">
            {searchQuery ? `${filteredItems.length} of ${feedItems.length} updates` : `${feedItems.length} updates`}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="outline"
            size="sm"
            className="necessary-button text-slate-600 font-light"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {error && (
        <div className="necessary-card bg-red-50 border-red-200 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-red-700">
            <span className="text-sm font-light">⚠️ {error}</span>
          </div>
          <p className="text-xs text-red-600 mt-1 font-light">
            Make sure SERPAPI_KEY is configured in your environment variables.
          </p>
        </div>
      )}

      {feedItems.length === 0 && !error ? (
        <div className="necessary-card p-8 text-center">
          <div className="text-slate-400 font-light">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg mb-2">No news found</h3>
            <p className="text-sm">
              Configure SERPAPI_KEY to fetch real news about your portfolio companies.
            </p>
            <Button
              onClick={handleRefresh}
              variant="outline"
              className="mt-4 necessary-button text-slate-600 font-light"
            >
              Try Again
            </Button>
          </div>
        </div>
      ) : filteredItems.length === 0 && searchQuery ? (
        <div className="necessary-card p-8 text-center">
          <div className="text-slate-400 font-light">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg mb-2">No results found</h3>
            <p className="text-sm">
              No updates match your search for "{searchQuery}". Try different keywords.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredItems.map((item) => (
            <FeedCard 
              key={item.id} 
              item={item} 
              onBookmark={handleBookmark} 
              onMarkAsRead={handleMarkAsRead} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
