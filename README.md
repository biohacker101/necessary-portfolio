# Portfolio Intelligence Platform

A Next.js application that aggregates real-time news and updates from your portfolio companies using SerpApi's Google News API.

## Features

- **Real-time News Aggregation**: Automatically fetches news for your portfolio companies
- **LinkedIn Integration**: Scrape comprehensive company profiles and data from LinkedIn
- **Smart Categorization**: AI-powered tagging and engagement scoring
- **Beautiful UI**: Sky-blue minimalistic design with glassmorphism effects
- **Portfolio Management**: Track news for multiple companies simultaneously
- **Global News Coverage**: Access to thousands of news sources worldwide

## Quick Setup

### 1. Get SerpApi Key

1. Visit [SerpApi](https://serpapi.com/manage-api-key)
2. Sign up for a free account (100 searches/month included)
3. Get your API key from the dashboard

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
SERPAPI_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio intelligence dashboard.

## LinkedIn Integration

For enhanced company data, set up the LinkedIn scraper:

### Quick Setup

```bash
# Set up LinkedIn scraper
./setup_linkedin_scraper.sh

# Start LinkedIn service (in separate terminal)
source linkedin_scraper_env/bin/activate
python linkedin_scraper_service.py

# Test the integration
python test_linkedin_integration.py
```

The LinkedIn integration provides:
- Company profiles and descriptions
- Employee counts and company size
- Headquarters and founding information
- Industry classifications and specialties
- Website links and contact information

**Note**: LinkedIn scraping requires a LinkedIn account and should be used responsibly according to LinkedIn's Terms of Service.

For detailed setup instructions, see [README_LINKEDIN_INTEGRATION.md](README_LINKEDIN_INTEGRATION.md).

## Portfolio Companies

The platform currently tracks news for these companies:

- **Akido** - Security platform
- **AllVoices** - Workplace platform  
- **Alyf** - Technology company
- **Arc** - Browser software
- **Brellium** - Technology startup

### Customizing Portfolio Companies

Edit `lib/news-api.ts` to add or modify portfolio companies:

```typescript
export const portfolioCompanies: Company[] = [
  { 
    id: "1", 
    name: "Your Company", 
    logo: "/logo.svg", 
    searchTerms: ["Company Name", "Company Name startup"] 
  },
  // Add more companies...
];
```

## API Usage

The platform automatically:

1. **Searches for company-specific news** using exact company names and related terms
2. **Fetches general startup/tech news** for industry context
3. **Scores engagement** based on content relevance and timing
4. **Categorizes content** using keyword-based tagging
5. **Deduplicates articles** to avoid repeated content

### API Endpoints

- `GET /api/news` - Fetch all portfolio news
- `POST /api/news` - Force refresh news data

## SerpApi Pricing

- **Free Tier**: 100 searches/month - $0
- **Developer**: 5,000 searches/month - $50/month
- **Production**: 15,000 searches/month - $150/month

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom sky-blue theme
- **UI Components**: Radix UI primitives with shadcn/ui
- **API Integration**: SerpApi Google News API
- **Language**: TypeScript

## Project Structure

```
├── app/
│   ├── api/news/route.ts     # News API endpoint
│   ├── globals.css           # Global styles and theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── api-setup-guide.tsx  # Setup guide component
│   ├── dashboard-layout.tsx # Main layout wrapper
│   ├── main-feed.tsx        # News feed component
│   ├── todays-highlights.tsx # Highlights carousel
│   └── app-sidebar.tsx      # Navigation sidebar
└── lib/
    ├── news-api.ts          # SerpApi integration logic
    └── utils.ts             # Utility functions
```

## Development

### Adding New Features

1. **New Portfolio Company**: Add to `portfolioCompanies` array in `lib/news-api.ts`
2. **Custom News Sources**: Modify search queries in `NewsApiService`
3. **New UI Components**: Add to `components/` directory
4. **Additional APIs**: Create new routes in `app/api/`

### Customizing the Theme

The platform uses a custom sky-blue theme defined in `app/globals.css`. Key CSS classes:

- `.necessary-card` - Glassmorphism card style
- `.necessary-button` - Custom button styling
- CSS custom properties for consistent theming

## Deployment

### Environment Variables

Set the following environment variable in your deployment platform:

```bash
SERPAPI_KEY=your_serpapi_key_here
```

### Platforms

Deploy easily on:
- **Vercel** (recommended for Next.js)
- **Netlify** 
- **Railway**
- **DigitalOcean App Platform**

## License

MIT License - feel free to use this project as a starting point for your own portfolio intelligence platform.

## Support

For SerpApi-related questions, visit [SerpApi Documentation](https://serpapi.com/google-news-api).

For platform issues, check the console for error messages and ensure your API key is correctly configured. 