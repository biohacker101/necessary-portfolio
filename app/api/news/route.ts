import { NextRequest, NextResponse } from 'next/server';
import { fetchPortfolioNews } from '@/lib/news-api';

export async function GET(request: NextRequest) {
  console.log('API route /api/news called');
  
  try {
    // Get API key from environment variables
    const apiKey = process.env.SERPAPI_KEY;
    console.log('SERPAPI_KEY configured:', !!apiKey);
    
    if (!apiKey) {
      // Return mock data if no API key is configured
      console.log('SERPAPI_KEY not configured, returning mock data response');
      return NextResponse.json({
        success: true,
        data: {
          companyNews: [],
          generalNews: [],
          highlights: []
        },
        message: 'Using mock data - configure SERPAPI_KEY for real news'
      });
    }

    console.log('Fetching real news data with SerpApi...');
    
    // Fetch real news data
    const newsData = await fetchPortfolioNews(apiKey);
    
    console.log('Successfully fetched news data:', {
      companyNews: newsData.companyNews.length,
      generalNews: newsData.generalNews.length,
      highlights: newsData.highlights.length
    });
    
    return NextResponse.json({
      success: true,
      data: newsData
    });

  } catch (error) {
    console.error('Error in /api/news route:', error);
    
    // Always return a proper response, even on error
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news data',
        data: {
          companyNews: [],
          generalNews: [],
          highlights: []
        },
        message: 'configure SERPAPI_KEY for real news'
      },
      { status: 200 } // Use 200 instead of 500 to prevent fetch errors
    );
  }
}

// Optional: Add POST method for triggering manual refresh
export async function POST(request: NextRequest) {
  console.log('API route /api/news POST called');
  
  try {
    const { forceRefresh } = await request.json();
    console.log('Force refresh requested:', forceRefresh);
    
    const apiKey = process.env.SERPAPI_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'SERPAPI_KEY not configured',
        message: 'configure SERPAPI_KEY for real news'
      }, { status: 400 });
    }

    const newsData = await fetchPortfolioNews(apiKey);
    
    return NextResponse.json({
      success: true,
      data: newsData,
      refreshedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error refreshing news:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to refresh news data'
      },
      { status: 500 }
    );
  }
} 