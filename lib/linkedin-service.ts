/**
 * LinkedIn Service for Portfolio Intelligence Platform
 * Interfaces with the Python LinkedIn scraper service
 */

export interface LinkedInCompanyProfile {
  name: string;
  linkedin_url: string;
  about?: string;
  website?: string;
  headquarters?: string;
  founded?: string;
  company_type?: string;
  company_size?: string;
  specialties?: string[];
  employee_count?: number;
  followers?: number;
  logo_url?: string;
  cover_image_url?: string;
  industry?: string;
  last_updated?: string;
}

export interface LinkedInCompanyPost {
  id: string;
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  media_urls: string[];
  post_url: string;
}

export interface LinkedInServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

class LinkedInService {
  private baseUrl: string;
  private isServiceAvailable: boolean = false;

  constructor() {
    // Default to localhost, can be configured via environment variable
    this.baseUrl = process.env.LINKEDIN_SCRAPER_SERVICE_URL || 'http://localhost:5000';
    this.checkServiceHealth();
  }

  /**
   * Check if the LinkedIn scraper service is running
   */
  async checkServiceHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        this.isServiceAvailable = data.status === 'healthy';
        return this.isServiceAvailable;
      }
      
      this.isServiceAvailable = false;
      return false;
    } catch (error) {
      console.warn('LinkedIn scraper service not available:', error);
      this.isServiceAvailable = false;
      return false;
    }
  }

  /**
   * Authenticate with LinkedIn through the scraper service
   */
  async authenticate(email: string, password: string): Promise<boolean> {
    if (!this.isServiceAvailable) {
      throw new Error('LinkedIn scraper service is not available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      return data.success || false;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }

  /**
   * Scrape a specific company's LinkedIn profile
   */
  async scrapeCompany(companyName: string): Promise<LinkedInCompanyProfile | null> {
    if (!this.isServiceAvailable) {
      console.warn('LinkedIn scraper service not available, returning mock data');
      return this.getMockCompanyData(companyName);
    }

    try {
      const response = await fetch(`${this.baseUrl}/scrape/${encodeURIComponent(companyName)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result: LinkedInServiceResponse<LinkedInCompanyProfile> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.warn(`Failed to scrape ${companyName}:`, result.error);
      return this.getMockCompanyData(companyName);
    } catch (error) {
      console.error(`Error scraping ${companyName}:`, error);
      return this.getMockCompanyData(companyName);
    }
  }

  /**
   * Scrape all portfolio companies
   */
  async scrapeAllCompanies(): Promise<Record<string, LinkedInCompanyProfile>> {
    if (!this.isServiceAvailable) {
      console.warn('LinkedIn scraper service not available, returning mock data');
      return this.getAllMockCompanyData();
    }

    try {
      const response = await fetch(`${this.baseUrl}/scrape/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result: LinkedInServiceResponse<Record<string, LinkedInCompanyProfile>> = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      console.warn('Failed to scrape all companies:', result.error);
      return this.getAllMockCompanyData();
    } catch (error) {
      console.error('Error scraping all companies:', error);
      return this.getAllMockCompanyData();
    }
  }

  /**
   * Get list of available companies for scraping
   */
  async getAvailableCompanies(): Promise<string[]> {
    if (!this.isServiceAvailable) {
      return Object.keys(this.getAllMockCompanyData());
    }

    try {
      const response = await fetch(`${this.baseUrl}/companies`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const result = await response.json();
      return result.companies || [];
    } catch (error) {
      console.error('Error getting available companies:', error);
      return [];
    }
  }

  /**
   * Get company posts (placeholder for future implementation)
   */
  async getCompanyPosts(companyName: string, limit: number = 10): Promise<LinkedInCompanyPost[]> {
    // This would be implemented when the posts scraping is added to the Python service
    console.log(`Getting posts for ${companyName} - feature coming soon`);
    return [];
  }

  /**
   * Mock data for when the service is not available
   */
  private getMockCompanyData(companyName: string): LinkedInCompanyProfile {
         const mockProfiles: Record<string, Partial<LinkedInCompanyProfile>> = {
       "Akido": {
         about: "Akido Labs is a healthcare technology company making exceptional healthcare universal through AI. They operate Scope AI and Akido Care, providing 10x more capacity for in-person visits across primary care and specialties.",
         website: "https://akidolabs.com",
         headquarters: "Los Angeles, CA",
         founded: "2015",
         company_type: "Healthcare Technology",
         company_size: "501-1000 employees",
         specialties: ["Healthcare AI", "Primary Care", "Telemedicine", "Medical Technology", "Healthcare Access"],
         employee_count: 750,
         industry: "Healthcare Technology"
       },
      "AllVoices": {
        about: "AllVoices is a platform for employee relations and workplace issues.",
        website: "https://allvoices.co",
        headquarters: "Los Angeles, CA",
        founded: "2018",
        company_type: "Technology",
        company_size: "51-200 employees",
        specialties: ["HR Technology", "Employee Relations", "Workplace Safety"],
        employee_count: 75,
        industry: "Human Resources"
      },
      "Alyf": {
        about: "Alyf is developing AI-powered solutions for cardiology and healthcare.",
        website: "https://alyf.com",
        headquarters: "Boston, MA",
        founded: "2021",
        company_type: "Healthcare Technology",
        company_size: "11-50 employees",
        specialties: ["AI", "Cardiology", "Medical Devices"],
        employee_count: 30,
        industry: "Medical Technology"
      }
    };

         const baseProfile: LinkedInCompanyProfile = {
       name: companyName,
       linkedin_url: companyName === "Akido" 
         ? "https://www.linkedin.com/company/akido-labs/"
         : `https://www.linkedin.com/company/${companyName.toLowerCase().replace(/\s+/g, '-')}/`,
       last_updated: new Date().toISOString()
     };

    return { ...baseProfile, ...mockProfiles[companyName] };
  }

  /**
   * Get all mock company data
   */
  private getAllMockCompanyData(): Record<string, LinkedInCompanyProfile> {
    const companies = [
      "Akido", "AllVoices", "Alyf", "Arc", "Brelium", "Career Karma", 
      "Copper", "EnsoData", "EveryCare", "Farmers Business Network", 
      "Forage", "Infinite Machine", "Insightful Instruments", "Kurios", 
      "Magrathea", "MedTruly", "Mental", "Modern Health", "Moov", 
      "Nevoya", "Nomba", "OneImaging", "Perceptive", "Plural Energy", 
      "ReadoutAI", "Recursion", "Relief", "Taro", "Terra Energy", 
      "Unlearn", "Vicarious Surgical", "Wayve", "Zocalo Health"
    ];

    const result: Record<string, LinkedInCompanyProfile> = {};
    companies.forEach(company => {
      result[company] = this.getMockCompanyData(company);
    });

    return result;
  }

  /**
   * Enhanced company information by combining LinkedIn data with existing company data
   */
  async getEnhancedCompanyInfo(companyId: string, companyName: string): Promise<any> {
    const linkedinProfile = await this.scrapeCompany(companyName);
    
    // Combine LinkedIn data with existing company data
    return {
      id: companyId,
      name: companyName,
      linkedin: linkedinProfile,
      // Add any other enhanced data here
      enhanced_at: new Date().toISOString()
    };
  }
}

// Export singleton instance
export const linkedInService = new LinkedInService();

// Utility functions for the frontend
export const formatEmployeeCount = (count?: number): string => {
  if (!count) return 'Unknown';
  if (count < 10) return '1-10';
  if (count < 50) return '11-50';
  if (count < 200) return '51-200';
  if (count < 1000) return '201-1,000';
  return '1,000+';
};

export const formatFoundedYear = (founded?: string): string => {
  if (!founded) return 'Unknown';
  const year = parseInt(founded);
  if (isNaN(year)) return founded;
  return `Founded ${year}`;
};

export const formatSpecialties = (specialties?: string[]): string => {
  if (!specialties || specialties.length === 0) return '';
  if (specialties.length <= 3) return specialties.join(', ');
  return `${specialties.slice(0, 3).join(', ')} +${specialties.length - 3} more`;
}; 