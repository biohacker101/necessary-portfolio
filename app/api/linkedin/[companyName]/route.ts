import { NextRequest, NextResponse } from 'next/server';
import { linkedInService } from '@/lib/linkedin-service';

// GET /api/linkedin/[companyName] - Get LinkedIn profile for a specific company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyName: string }> }
) {
  try {
    const { companyName: encodedName } = await params;
    const companyName = decodeURIComponent(encodedName);
    
    console.log(`Fetching LinkedIn data for: ${companyName}`);
    
    const profile = await linkedInService.scrapeCompany(companyName);
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: `No LinkedIn data found for ${companyName}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: profile,
      cached: !linkedInService['isServiceAvailable'], // Indicate if this is cached/mock data
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching LinkedIn data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST /api/linkedin/[companyName] - Refresh LinkedIn data for a company
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyName: string }> }
) {
  try {
    const { companyName: encodedName } = await params;
    const companyName = decodeURIComponent(encodedName);
    
    console.log(`Refreshing LinkedIn data for: ${companyName}`);
    
    // Force a fresh scrape by calling the service directly
    const profile = await linkedInService.scrapeCompany(companyName);
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: `Failed to refresh LinkedIn data for ${companyName}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: profile,
      refreshed: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error refreshing LinkedIn data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to refresh data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 