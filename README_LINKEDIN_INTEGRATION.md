# LinkedIn Integration for Portfolio Intelligence Platform

This integration allows you to scrape LinkedIn company profiles for your portfolio companies using the [linkedin_scraper](https://github.com/joeyism/linkedin_scraper) library.

## 🎯 Features

- **Company Profile Scraping**: Get comprehensive LinkedIn company information
- **Real-time Data**: Refresh company data on demand
- **Cached Results**: Fast loading with intelligent caching
- **Portfolio Integration**: Seamlessly integrated with your existing company pages
- **Mock Data Fallback**: Works even when the scraper service is unavailable

## 📊 Data Collected

For each portfolio company, the system collects:

- **Basic Info**: Company name, description, website
- **Company Details**: Headquarters, founded date, company type
- **Size & Scale**: Employee count, company size category
- **Industry Info**: Industry classification, specialties
- **Social Proof**: LinkedIn follower count, engagement metrics

## 🛠️ Setup Instructions

### Prerequisites

- Python 3.7+ installed
- Google Chrome browser
- LinkedIn account (for authentication)

### 1. Install Dependencies

```bash
# Make the setup script executable
chmod +x setup_linkedin_scraper.sh

# Run the setup script
./setup_linkedin_scraper.sh
```

### 2. Manual Setup (Alternative)

```bash
# Create Python virtual environment
python3 -m venv linkedin_scraper_env
source linkedin_scraper_env/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Start the LinkedIn Scraper Service

```bash
# Activate virtual environment
source linkedin_scraper_env/bin/activate

# Start the service
python linkedin_scraper_service.py
```

The service will run on `http://localhost:5000`

### 4. Configure Environment Variables (Optional)

Create a `.env.local` file in your Next.js project:

```bash
# LinkedIn Scraper Service URL
LINKEDIN_SCRAPER_SERVICE_URL=http://localhost:5000
```

## 🚀 Usage

### 1. Start Both Services

```bash
# Terminal 1: Start LinkedIn scraper service
source linkedin_scraper_env/bin/activate
python linkedin_scraper_service.py

# Terminal 2: Start Next.js application
npm run dev
```

### 2. Access LinkedIn Data

1. Navigate to any company page: `/company/[id]`
2. You'll see a "LinkedIn Profile" card in the sidebar
3. Click "Refresh" to get the latest data from LinkedIn
4. Click "View" to open the company's LinkedIn page

### 3. Authentication

The first time you scrape data, you may need to authenticate:

```bash
curl -X POST http://localhost:5000/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email": "your-email@example.com", "password": "your-password"}'
```

## 🔧 API Endpoints

### LinkedIn Scraper Service (Python)

- `GET /health` - Check service health
- `POST /authenticate` - Authenticate with LinkedIn
- `GET /scrape/{company_name}` - Scrape specific company
- `GET /scrape/all` - Scrape all portfolio companies
- `GET /companies` - List available companies

### Next.js API Routes

- `GET /api/linkedin/{companyName}` - Get LinkedIn data for company
- `POST /api/linkedin/{companyName}` - Refresh LinkedIn data
- `GET /api/linkedin/all` - Get all companies' LinkedIn data

## 🏗️ Architecture

```
┌─────────────────┐    HTTP    ┌─────────────────┐    Selenium    ┌─────────────┐
│   Next.js App   │ ────────► │ Python Service  │ ─────────────► │  LinkedIn   │
│                 │           │                 │                │             │
│ - Company Pages │           │ - Web Scraping  │                │ - Company   │
│ - API Routes    │           │ - Data Caching  │                │   Profiles  │
│ - UI Components │           │ - Rate Limiting │                │ - Employee  │
└─────────────────┘           └─────────────────┘                │   Data      │
                                                                 └─────────────┘
```

## 📱 Components

### LinkedInCompanyInfo Component

```tsx
import { LinkedInCompanyInfo } from "@/components/linkedin-company-info"

<LinkedInCompanyInfo 
  companyName="Akido" 
  companyId="1" 
/>
```

**Features:**
- Loading states with skeletons
- Error handling with retry
- Refresh functionality
- Responsive design
- Cached data indicators

## 🔒 Security & Best Practices

### Rate Limiting
- 2-second delay between company scrapes
- Respectful of LinkedIn's rate limits
- Automatic retry with exponential backoff

### Authentication
- Use dedicated LinkedIn account for scraping
- Store credentials securely (environment variables)
- Session management for long-running scrapes

### Data Privacy
- Only scrape publicly available company information
- No personal data collection
- Comply with LinkedIn's Terms of Service

## 🐛 Troubleshooting

### Common Issues

1. **Chrome Driver Not Found**
   ```bash
   # Install webdriver-manager
   pip install webdriver-manager
   ```

2. **LinkedIn Authentication Fails**
   - Check credentials are correct
   - Use dedicated LinkedIn account
   - Ensure 2FA is disabled for scraping account

3. **Service Not Available**
   - Check if Python service is running on port 5000
   - Verify Chrome browser is installed
   - Check firewall settings

4. **Scraping Fails**
   - LinkedIn may have updated their structure
   - Check if you're rate limited
   - Verify company LinkedIn URLs are correct

### Debug Mode

Enable debug logging in the Python service:

```python
logging.basicConfig(level=logging.DEBUG)
```

## 📈 Performance Optimization

### Caching Strategy
- In-memory caching for recent requests
- Configurable cache TTL (default: 1 hour)
- Background refresh for stale data

### Batch Processing
- Queue system for bulk scraping
- Parallel processing with worker threads
- Progress tracking for large portfolios

## 🔮 Future Enhancements

- **Company Posts**: Scrape recent LinkedIn posts
- **Employee Tracking**: Monitor key employee changes
- **Sentiment Analysis**: Analyze company mentions
- **Integration**: Connect with CRM systems
- **Notifications**: Alert on significant changes

## 📄 License & Compliance

This integration is for legitimate portfolio monitoring purposes only. Please ensure you:

- Comply with LinkedIn's Terms of Service
- Respect rate limits and scraping guidelines
- Use data responsibly and ethically
- Consider LinkedIn's official APIs for production use

## 🤝 Contributing

To contribute to the LinkedIn integration:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Submit a pull request

## 📞 Support

For issues with the LinkedIn integration:

1. Check the troubleshooting section
2. Review Python service logs
3. Verify Chrome and ChromeDriver versions
4. Check LinkedIn's current structure for changes 