import { NextRequest, NextResponse } from 'next/server';
import { linkedInService } from '@/lib/linkedin-service';

// GET /api/linkedin/all - Get LinkedIn profiles for all portfolio companies
export async function GET(request: NextRequest) {
  try {
    console.log('Fetching LinkedIn data for all portfolio companies');
    
    const profiles = await linkedInService.scrapeAllCompanies();
    
    const companiesCount = Object.keys(profiles).length;
    
    return NextResponse.json({
      success: true,
      data: profiles,
      count: companiesCount,
      cached: !linkedInService['isServiceAvailable'], // Indicate if this is cached/mock data
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching all LinkedIn data:', error);
    
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

// POST /api/linkedin/all - Refresh LinkedIn data for all companies
export async function POST(request: NextRequest) {
  try {
    console.log('Refreshing LinkedIn data for all portfolio companies');
    
    // This might take a while, so we should probably implement this with a queue
    // For now, let's limit the refresh to avoid long request times
    const profiles = await linkedInService.scrapeAllCompanies();
    
    const companiesCount = Object.keys(profiles).length;
    
    return NextResponse.json({
      success: true,
      data: profiles,
      count: companiesCount,
      refreshed: true,
      timestamp: new Date().toISOString(),
      note: 'For large portfolio refreshes, consider using background job processing'
    });
    
  } catch (error) {
    console.error('Error refreshing all LinkedIn data:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to refresh all company data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 