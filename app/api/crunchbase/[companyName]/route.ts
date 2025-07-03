import { NextRequest, NextResponse } from 'next/server';
import { crunchbaseService } from '@/lib/crunchbase-service';
import { portfolioCompanies } from '@/lib/news-api';

// GET /api/crunchbase/[companyName] - Get Crunchbase data for a specific company
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ companyName: string }> }
) {
  try {
    const { companyName: encodedName } = await params;
    const companyName = decodeURIComponent(encodedName);
    
    console.log(`Fetching Crunchbase data for: ${companyName}`);
    
    // Find the company website from our portfolio companies list
    const portfolioCompany = portfolioCompanies.find(
      company => company.name.toLowerCase() === companyName.toLowerCase()
    );
    
    const companyWebsite = portfolioCompany?.website;
    
    if (companyWebsite) {
      console.log(`Using website URL for enhanced search: ${companyWebsite}`);
    }
    
    const result = await crunchbaseService.searchCompany(companyName, companyWebsite);
    
    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || `No Crunchbase data found for ${companyName}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
      source: result.source,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching Crunchbase data:', error);
    
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

// POST /api/crunchbase/[companyName] - Refresh Crunchbase data for a company
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ companyName: string }> }
) {
  try {
    const { companyName: encodedName } = await params;
    const companyName = decodeURIComponent(encodedName);
    
    console.log(`Refreshing Crunchbase data for: ${companyName}`);
    
    // Find the company website from our portfolio companies list
    const portfolioCompany = portfolioCompanies.find(
      company => company.name.toLowerCase() === companyName.toLowerCase()
    );
    
    const companyWebsite = portfolioCompany?.website;
    
    if (companyWebsite) {
      console.log(`Using website URL for enhanced refresh: ${companyWebsite}`);
    }
    
    // Force a fresh lookup by calling the service directly
    const result = await crunchbaseService.searchCompany(companyName, companyWebsite);
    
    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || `Failed to refresh Crunchbase data for ${companyName}` },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: result.data,
      source: result.source,
      refreshed: true,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error refreshing Crunchbase data:', error);
    
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