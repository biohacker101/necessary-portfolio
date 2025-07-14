#!/bin/bash

echo "🚀 Setting up LinkedIn Scraper for Portfolio Intelligence Platform"
echo "================================================================="

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed. Please install Python 3 first."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is required but not installed. Please install pip3 first."
    exit 1
fi

# Create virtual environment
echo "📦 Creating Python virtual environment..."
python3 -m venv linkedin_scraper_env

# Activate virtual environment
echo "🔄 Activating virtual environment..."
source linkedin_scraper_env/bin/activate

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install -r requirements.txt

# Install Chrome browser if not present (macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if ! command -v google-chrome &> /dev/null && ! [ -d "/Applications/Google Chrome.app" ]; then
        echo "🌐 Chrome not found. Please install Google Chrome manually:"
        echo "   Download from: https://www.google.com/chrome/"
        echo "   Or install via Homebrew: brew install --cask google-chrome"
    fi
fi

# Install chromedriver
echo "🚗 Installing ChromeDriver..."
pip install webdriver-manager

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Make sure Google Chrome is installed on your system"
echo "2. Activate the virtual environment:"
echo "   source linkedin_scraper_env/bin/activate"
echo "3. Start the LinkedIn scraper service:"
echo "   python linkedin_scraper_service.py"
echo "4. The service will run on http://localhost:5000"
echo "5. Start your Next.js application:"
echo "   npm run dev"
echo ""
echo "🔑 LinkedIn Authentication:"
echo "   You'll need to authenticate with LinkedIn credentials when scraping"
echo "   Use the /authenticate endpoint or provide credentials when prompted"
echo ""
echo "🎯 Usage:"
echo "   - Visit your company pages to see LinkedIn data"
echo "   - Data will be cached and refreshed automatically"
echo "   - Use the refresh button to get latest LinkedIn information"
echo ""
echo "⚠️  Important Notes:"
echo "   - Be respectful of LinkedIn's rate limits"
echo "   - Consider using a dedicated LinkedIn account for scraping"
echo "   - This tool is for legitimate portfolio monitoring only" 