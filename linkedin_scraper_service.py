#!/usr/bin/env python3
"""
LinkedIn Scraper Service for Portfolio Companies
Uses the linkedin_scraper library to gather company information.
"""

import json
import asyncio
import logging
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import WebDriverException

# Import the linkedin_scraper library
try:
    from linkedin_scraper import Company, Person, actions
    LINKEDIN_SCRAPER_AVAILABLE = True
except ImportError:
    print("Warning: linkedin_scraper not installed. Run: pip install linkedin_scraper")
    LINKEDIN_SCRAPER_AVAILABLE = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class CompanyProfile:
    """Data structure for company LinkedIn profile"""
    name: str
    linkedin_url: str
    about: Optional[str] = None
    website: Optional[str] = None
    headquarters: Optional[str] = None
    founded: Optional[str] = None
    company_type: Optional[str] = None
    company_size: Optional[str] = None
    specialties: Optional[List[str]] = None
    employee_count: Optional[int] = None
    followers: Optional[int] = None
    logo_url: Optional[str] = None
    cover_image_url: Optional[str] = None
    industry: Optional[str] = None
    last_updated: Optional[str] = None

@dataclass
class CompanyPost:
    """Data structure for company LinkedIn posts"""
    id: str
    content: str
    timestamp: str
    engagement: Dict[str, int]
    media_urls: List[str]
    post_url: str

class LinkedInScraperService:
    """Service for scraping LinkedIn company data"""
    
    def __init__(self, headless: bool = True):
        self.headless = headless
        self.driver = None
        self.authenticated = False
        
                 # Portfolio companies with their LinkedIn URLs
         self.portfolio_companies = {
             "Akido": "https://www.linkedin.com/company/akido-labs/",
            "AllVoices": "https://www.linkedin.com/company/allvoices/",
            "Alyf": "https://www.linkedin.com/company/alyf/",
            "Arc": "https://www.linkedin.com/company/arc-boats/", 
            "Brelium": "https://www.linkedin.com/company/brelium/",
            "Career Karma": "https://www.linkedin.com/company/careerkarma/",
            "Copper": "https://www.linkedin.com/company/copper-electric/",
            "EnsoData": "https://www.linkedin.com/company/ensodata/",
            "EveryCare": "https://www.linkedin.com/company/everycare/",
            "Farmers Business Network": "https://www.linkedin.com/company/farmers-business-network/",
            "Forage": "https://www.linkedin.com/company/forage-payments/",
            "Infinite Machine": "https://www.linkedin.com/company/infinite-machine/",
            "Insightful Instruments": "https://www.linkedin.com/company/insightful-instruments/",
            "Kurios": "https://www.linkedin.com/company/kurios/",
            "Magrathea": "https://www.linkedin.com/company/magrathea-metals/",
            "MedTruly": "https://www.linkedin.com/company/medtruly/",
            "Mental": "https://www.linkedin.com/company/mental/",
            "Modern Health": "https://www.linkedin.com/company/modern-health/",
            "Moov": "https://www.linkedin.com/company/moov-semiconductor/",
            "Nevoya": "https://www.linkedin.com/company/nevoya/",
            "Nomba": "https://www.linkedin.com/company/nomba/",
            "OneImaging": "https://www.linkedin.com/company/oneimaging/",
            "Perceptive": "https://www.linkedin.com/company/perceptive-dentistry/",
            "Plural Energy": "https://www.linkedin.com/company/plural-energy/",
            "ReadoutAI": "https://www.linkedin.com/company/readout-ai/",
            "Recursion": "https://www.linkedin.com/company/recursion-pharmaceuticals/",
            "Relief": "https://www.linkedin.com/company/relief-financial/",
            "Taro": "https://www.linkedin.com/company/taro-health/",
            "Terra Energy": "https://www.linkedin.com/company/terra-energy/",
            "Unlearn": "https://www.linkedin.com/company/unlearn-ai/",
            "Vicarious Surgical": "https://www.linkedin.com/company/vicarious-surgical/",
            "Wayve": "https://www.linkedin.com/company/wayve/",
            "Zocalo Health": "https://www.linkedin.com/company/zocalo-health/"
        }
    
    def _setup_driver(self):
        """Setup Chrome driver for scraping"""
        if not LINKEDIN_SCRAPER_AVAILABLE:
            raise Exception("linkedin_scraper library not available")
            
        chrome_options = Options()
        if self.headless:
            chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36")
        
        try:
            self.driver = webdriver.Chrome(options=chrome_options)
            logger.info("Chrome driver initialized successfully")
            return True
        except WebDriverException as e:
            logger.error(f"Failed to initialize Chrome driver: {e}")
            return False
    
    def authenticate(self, email: str, password: str) -> bool:
        """Authenticate with LinkedIn"""
        if not self.driver:
            if not self._setup_driver():
                return False
        
        try:
            actions.login(self.driver, email, password)
            self.authenticated = True
            logger.info("Successfully authenticated with LinkedIn")
            return True
        except Exception as e:
            logger.error(f"Authentication failed: {e}")
            return False
    
    def scrape_company(self, company_name: str) -> Optional[CompanyProfile]:
        """Scrape a single company's LinkedIn profile"""
        if company_name not in self.portfolio_companies:
            logger.warning(f"Company {company_name} not found in portfolio")
            return None
            
        linkedin_url = self.portfolio_companies[company_name]
        
        try:
            if not self.driver:
                if not self._setup_driver():
                    return None
                    
            logger.info(f"Scraping company: {company_name}")
            
            # Create Company object and scrape
            company = Company(linkedin_url, driver=self.driver, scrape=True, close_on_complete=False)
            
            # Extract company data
            profile = CompanyProfile(
                name=company.name or company_name,
                linkedin_url=linkedin_url,
                about=company.about_us,
                website=company.website,
                headquarters=company.headquarters,
                founded=company.founded,
                company_type=company.company_type,
                company_size=company.company_size,
                specialties=company.specialties if isinstance(company.specialties, list) else [],
                employee_count=self._parse_employee_count(company.company_size),
                last_updated=time.strftime("%Y-%m-%d %H:%M:%S")
            )
            
            logger.info(f"Successfully scraped {company_name}")
            return profile
            
        except Exception as e:
            logger.error(f"Error scraping {company_name}: {e}")
            return None
    
    def _parse_employee_count(self, company_size: str) -> Optional[int]:
        """Parse employee count from company size string"""
        if not company_size:
            return None
            
        # Extract numbers from strings like "51-200 employees"
        import re
        numbers = re.findall(r'\d+', company_size.replace(',', ''))
        if numbers:
            # Take the first number as a rough estimate
            return int(numbers[0])
        return None
    
    def scrape_all_companies(self) -> Dict[str, CompanyProfile]:
        """Scrape all portfolio companies"""
        results = {}
        
        for company_name in self.portfolio_companies.keys():
            profile = self.scrape_company(company_name)
            if profile:
                results[company_name] = profile
            
            # Add delay between requests to be respectful
            time.sleep(2)
        
        return results
    
    def get_company_posts(self, company_name: str, limit: int = 10) -> List[CompanyPost]:
        """Get recent posts from a company (placeholder - requires additional implementation)"""
        # This would require more advanced scraping or LinkedIn API access
        logger.info(f"Getting posts for {company_name} - feature not yet implemented")
        return []
    
    def close(self):
        """Clean up resources"""
        if self.driver:
            self.driver.quit()
            self.driver = None
            logger.info("Driver closed")

# Flask app for serving the scraper as a web service
app = Flask(__name__)
CORS(app)

# Global scraper instance
scraper = LinkedInScraperService(headless=True)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "linkedin_scraper_available": LINKEDIN_SCRAPER_AVAILABLE,
        "authenticated": scraper.authenticated
    })

@app.route('/authenticate', methods=['POST'])
def authenticate():
    """Authenticate with LinkedIn"""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    success = scraper.authenticate(email, password)
    
    return jsonify({
        "success": success,
        "authenticated": scraper.authenticated
    })

@app.route('/scrape/<company_name>', methods=['GET'])
def scrape_company_endpoint(company_name):
    """Scrape a specific company"""
    profile = scraper.scrape_company(company_name)
    
    if profile:
        return jsonify({
            "success": True,
            "data": asdict(profile)
        })
    else:
        return jsonify({
            "success": False,
            "error": f"Failed to scrape {company_name}"
        }), 404

@app.route('/scrape/all', methods=['GET'])
def scrape_all_companies_endpoint():
    """Scrape all portfolio companies"""
    results = scraper.scrape_all_companies()
    
    return jsonify({
        "success": True,
        "data": {name: asdict(profile) for name, profile in results.items()},
        "count": len(results)
    })

@app.route('/companies', methods=['GET'])
def list_companies():
    """List all available portfolio companies"""
    return jsonify({
        "companies": list(scraper.portfolio_companies.keys()),
        "count": len(scraper.portfolio_companies)
    })

if __name__ == '__main__':
    import atexit
    atexit.register(scraper.close)
    
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 