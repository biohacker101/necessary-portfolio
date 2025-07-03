import { NextRequest, NextResponse } from 'next/server';
import { portfolioCompanies, NewsApiService, type FeedItem } from '@/lib/news-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(`API route /api/company/${id}/news called`);
  
  try {
    // Find the company by ID
    const company = portfolioCompanies.find(c => c.id === id);
    
    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Company not found',
          data: []
        },
        { status: 404 }
      );
    }

    console.log(`Fetching news for company: ${company.name}`);

    // Get API key from environment variables
    const apiKey = process.env.SERPAPI_KEY;
    
    if (!apiKey) {
      console.log('SERPAPI_KEY not configured, returning empty results');
      return NextResponse.json({
        success: true,
        data: [],
        totalResults: 0,
        message: 'Configure SERPAPI_KEY for real news'
      });
    }

    // Create news service and fetch company-specific news
    const newsService = new NewsApiService(apiKey);
    const companyNews = await newsService.searchCompanyNews(company);
    
    console.log(`Successfully fetched ${companyNews.length} news items for ${company.name}`);
    
    return NextResponse.json({
      success: true,
      data: companyNews,
      totalResults: companyNews.length,
      company: {
        id: company.id,
        name: company.name,
        searchTerms: company.searchTerms
      }
    });

  } catch (error) {
    console.error(`Error in /api/company/${id}/news route:`, error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch company news',
        data: []
      },
      { status: 200 } // Use 200 to prevent fetch errors on client
    );
  }
}

// Optional: Add POST method for triggering manual refresh with specific search terms
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(`API route /api/company/${id}/news POST called`);
  
  try {
    const { searchTerms } = await request.json();
    
    // Find the company by ID
    const company = portfolioCompanies.find(c => c.id === id);
    
    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Company not found'
        },
        { status: 404 }
      );
    }

    const apiKey = process.env.SERPAPI_KEY;
    
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'SERPAPI_KEY not configured'
      }, { status: 400 });
    }

    // Create a modified company object with custom search terms if provided
    const searchCompany = searchTerms ? {
      ...company,
      searchTerms: searchTerms
    } : company;

    const newsService = new NewsApiService(apiKey);
    const companyNews = await newsService.searchCompanyNews(searchCompany);
    
    return NextResponse.json({
      success: true,
      data: companyNews,
      totalResults: companyNews.length,
      refreshedAt: new Date().toISOString(),
      searchTerms: searchCompany.searchTerms
    });

  } catch (error) {
    console.error(`Error refreshing news for company ${id}:`, error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to refresh company news'
      },
      { status: 500 }
    );
  }
} 