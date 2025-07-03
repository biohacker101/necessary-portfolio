#!/usr/bin/env python3
"""
Test script for LinkedIn integration
Tests the LinkedIn scraper service without requiring authentication
"""

import json
import requests
import time
from typing import Dict, Any

def test_service_health() -> bool:
    """Test if the LinkedIn scraper service is running"""
    try:
        response = requests.get('http://localhost:5000/health', timeout=5)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Service health: {data}")
            return data.get('status') == 'healthy'
        else:
            print(f"❌ Health check failed with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Service not available: {e}")
        return False

def test_available_companies() -> bool:
    """Test getting list of available companies"""
    try:
        response = requests.get('http://localhost:5000/companies', timeout=10)
        if response.status_code == 200:
            data = response.json()
            companies = data.get('companies', [])
            print(f"✅ Available companies ({len(companies)}): {companies[:5]}...")
            return len(companies) > 0
        else:
            print(f"❌ Companies list failed with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Companies list error: {e}")
        return False

def test_company_scraping(company_name: str = "Akido") -> bool:
    """Test scraping a specific company (will use mock data if service unavailable)"""
    try:
        response = requests.get(f'http://localhost:5000/scrape/{company_name}', timeout=30)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                profile = data.get('data', {})
                print(f"✅ Scraped {company_name}:")
                print(f"   - About: {profile.get('about', 'N/A')[:100]}...")
                print(f"   - Website: {profile.get('website', 'N/A')}")
                print(f"   - Headquarters: {profile.get('headquarters', 'N/A')}")
                print(f"   - Founded: {profile.get('founded', 'N/A')}")
                print(f"   - Company Size: {profile.get('company_size', 'N/A')}")
                return True
            else:
                print(f"❌ Scraping failed: {data.get('error', 'Unknown error')}")
                return False
        else:
            print(f"❌ Scraping failed with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Scraping error: {e}")
        return False

def test_nextjs_api() -> bool:
    """Test the Next.js API endpoint (assumes Next.js is running on port 3000)"""
    try:
        response = requests.get('http://localhost:3000/api/linkedin/Akido', timeout=15)
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                profile = data.get('data', {})
                cached = data.get('cached', False)
                print(f"✅ Next.js API test successful (cached: {cached})")
                print(f"   - Company: {profile.get('name', 'N/A')}")
                print(f"   - LinkedIn URL: {profile.get('linkedin_url', 'N/A')}")
                return True
            else:
                print(f"❌ Next.js API failed: {data.get('error', 'Unknown error')}")
                return False
        else:
            print(f"❌ Next.js API failed with status: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Next.js API error: {e}")
        print("   Make sure your Next.js app is running on http://localhost:3000")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing LinkedIn Integration")
    print("=" * 50)
    
    tests = [
        ("Service Health Check", test_service_health),
        ("Available Companies", test_available_companies),
        ("Company Scraping", lambda: test_company_scraping("Akido")),
        ("Next.js API Integration", test_nextjs_api),
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n📝 Running: {test_name}")
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ Test failed with exception: {e}")
            results.append((test_name, False))
        
        time.sleep(1)  # Brief pause between tests
    
    print("\n" + "=" * 50)
    print("📊 Test Results Summary:")
    print("=" * 50)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 Score: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! LinkedIn integration is working correctly.")
        print("\n📋 Next steps:")
        print("1. Visit a company page in your browser: http://localhost:3000/company/1")
        print("2. Look for the 'LinkedIn Profile' card in the sidebar")
        print("3. Click 'Refresh' to get fresh LinkedIn data")
    else:
        print("\n⚠️  Some tests failed. Check the output above for details.")
        print("\n🔧 Troubleshooting:")
        print("1. Make sure the Python service is running: python linkedin_scraper_service.py")
        print("2. Make sure Chrome browser is installed")
        print("3. Make sure Next.js app is running: npm run dev")
        print("4. Check for any error messages in the service logs")

if __name__ == "__main__":
    main() 