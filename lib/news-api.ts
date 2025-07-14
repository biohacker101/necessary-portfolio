// SerpApi Google News integration
interface SerpApiResponse {
  search_metadata: {
    status: string;
    total_time_taken: number;
  };
  news_results: Array<{
    position: number;
    title: string;
    snippet?: string;
    source: {
      name: string;
      icon?: string;
      authors?: string[];
    };
    link: string;
    thumbnail?: string;
    thumbnail_small?: string;
    date: string;
    story_token?: string;
    topic_token?: string;
    // Additional fields that might contain richer content
    description?: string;
    summary?: string;
    content?: string;
    excerpt?: string;
  }>;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  website?: string; // Company website URL for more accurate Crunchbase searches
  searchTerms?: string[]; // Additional search terms for better results
}

interface FeedItem {
  id: string;
  company: Company;
  source: "linkedin" | "twitter" | "news" | "blog" | "other";
  title: string;
  summary: string;
  timestamp: string;
  originalUrl: string;
  tags: string[];
  bookmarked: boolean;
  read: boolean;
  engagementScore?: number;
}

// Portfolio companies configuration with accurate website URLs and better search terms
export const portfolioCompanies: Company[] = [
  { id: "1", name: "Akido", logo: "/akido-logo.png", website: "https://www.akidolabs.com/", searchTerms: ["Akido Labs", "healthcare AI startup"] },
  { id: "2", name: "AllVoices", logo: "/all-voices.png", website: "https://www.allvoices.co/", searchTerms: ["AllVoices startup", "employee feedback platform"] },
  { id: "3", name: "Alyf", logo: "/alyf.png", website: "https://www.alyf.health/", searchTerms: ["Alyf startup", "cardiac monitoring technology"] },
  { id: "4", name: "Arc", logo: "/arc.png", website: "https://arcboats.com/", searchTerms: ["Arc electric boats", "marine startup"] },
  { id: "5", name: "Brellium", logo: "/brelium.png", website: "https://brellium.com/", searchTerms: ["Brellium startup", "AI compliance platform"] },
  { id: "6", name: "Career Karma", logo: "/career-karma.png", website: "https://careerkarma.com/", searchTerms: ["Career Karma startup", "tech education platform"] },
  { id: "7", name: "Copper", logo: "/copper.png", website: "https://copperhome.com/", searchTerms: ["Copper startup appliances", "smart kitchen technology"] },
  { id: "8", name: "EnsoData", logo: "/ensodata.png", website: "https://www.ensodata.com/", searchTerms: ["EnsoData startup", "sleep analysis AI"] },
  { id: "9", name: "EveryCare", logo: "/everycare.png", website: "https://myeverycare.com/", searchTerms: ["EveryCare startup", "senior care platform"] },
  { id: "10", name: "Farmers Business Network", logo: "/fbn.png", website: "https://www.fbn.com/", searchTerms: ["FBN startup", "agricultural technology platform"] },
  { id: "11", name: "Forage", logo: "/forage.png", website: "https://www.joinforage.com/", searchTerms: ["Forage startup payments", "SNAP EBT technology"] },
  { id: "12", name: "Infinite Machine", logo: "/infinite-machine.png", website: "https://www.infinitemachine.com/", searchTerms: ["Infinite Machine startup", "electric vehicle company"] },
  { id: "13", name: "Insightful Instruments", logo: "/insightful.png", website: "https://insightfulinstruments.com/", searchTerms: ["Insightful Instruments startup", "surgical technology"] },
  { id: "14", name: "Kurios", logo: "/kurios.png", website: "https://kurios.la/", searchTerms: ["Kurios startup", "talent platform"] },
  { id: "15", name: "Magrathea", logo: "/magrathea.png", website: "https://magratheametals.com/", searchTerms: ["Magrathea startup", "sustainable metals company"] },
  { id: "16", name: "MedTruly", logo: "/medtruly.png", website: "https://www.medtruly.org/", searchTerms: ["MedTruly startup", "healthcare platform"] },
  { id: "17", name: "Mental", logo: "/mental.png", website: "https://www.getmental.com/", searchTerms: ["Mental startup app", "fitness training platform"] },
  { id: "18", name: "Modern Health", logo: "/modern-health.png", website: "https://www.modernhealth.com/", searchTerms: ["Modern Health startup", "workplace mental health"] },
  { id: "19", name: "Moov", logo: "/moov.png", website: "https://moov.co/", searchTerms: ["Moov startup", "fintech payments platform"] },
  { id: "20", name: "Nevoya", logo: "/nevoya.png", website: "https://www.nevoya.com/", searchTerms: ["Nevoya startup", "electric freight company"] },
  { id: "21", name: "Nomba", logo: "/nomba.png", website: "https://nomba.com/", searchTerms: ["Nomba startup", "African payments platform"] },
  { id: "22", name: "OneImaging", logo: "/one-imaging.png", website: "https://oneimaging.com/", searchTerms: ["OneImaging startup", "medical imaging platform"] },
  { id: "23", name: "Perceptive", logo: "/perceptive.png", website: "https://www.perceptive.io/", searchTerms: ["Perceptive startup", "dental robotics company"] },
  { id: "24", name: "Plural Energy", logo: "/plural-energy.png", website: "https://www.pluralfinance.com/", searchTerms: ["Plural Energy startup", "renewable energy finance"] },
  { id: "25", name: "ReadoutAI", logo: "/readout-ai.png", website: "https://readout.ai/", searchTerms: ["ReadoutAI startup", "clinical trial technology"] },
  { id: "26", name: "Recursion", logo: "/recursion.png", website: "https://www.recursion.com/", searchTerms: ["Recursion Pharmaceuticals", "AI drug discovery company"] },
  { id: "27", name: "Relief", logo: "/relief.png", website: "https://www.relief.app/", searchTerms: ["Relief startup app", "debt management platform"] },
  { id: "28", name: "Rubi", logo: "/placeholder.svg", website: "https://www.rubi.earth/", searchTerms: ["Rubi startup", "sustainable fashion technology"] },
  { id: "29", name: "Taro", logo: "/taro.png", website: "https://www.tarohealth.com/", searchTerms: ["Taro Health startup", "health insurance platform"] },
  { id: "30", name: "Terra Energy", logo: "/terra.png", website: "https://www.terraenergy.io/", searchTerms: ["Terra Energy startup", "clean energy company"] },
  { id: "31", name: "Unlearn", logo: "/unlearn.png", website: "https://www.unlearn.ai/", searchTerms: ["Unlearn startup", "AI clinical trials"] },
  { id: "32", name: "Vicarious Surgical", logo: "/vicarious-surgical.png", website: "https://www.vicarioussurgical.com/", searchTerms: ["Vicarious Surgical startup", "robotic surgery platform"] },
  { id: "33", name: "Wayve", logo: "/wayve.png", website: "https://wayve.ai/", searchTerms: ["Wayve startup", "autonomous vehicle AI"] },
  { id: "34", name: "Zocalo Health", logo: "/zocalo-health.png", website: "https://www.zocalo.health/", searchTerms: ["Zocalo Health startup", "Latino healthcare platform"] },
];

class NewsApiService {
  private apiKey: string;
  private baseUrl = "https://serpapi.com/search.json";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Search for news about a specific company
  async searchCompanyNews(company: Company, options: {
    gl?: string;
    hl?: string;
    timeRange?: string;
  } = {}): Promise<FeedItem[]> {
    const { gl = "us", hl = "en" } = options;
    
    console.log(`Searching news for company: ${company.name}`);
    
    // Create highly specific search queries to avoid irrelevant matches
    const searchQueries = [
      // Primary company name with startup/company context
      `"${company.name}" AND (startup OR company) AND (CEO OR founder OR funding OR raised OR investment OR partnership)`,
      // Company name with website domain for precision
      ...(company.website ? [`"${company.name}" AND "${company.website.replace('https://', '').replace('http://', '').split('/')[0]}"`] : []),
      // Search terms with company context
      ...(company.searchTerms || []).slice(0, 1).map(term => `"${term}" AND "${company.name}" AND (startup OR company OR business)`)
    ];

    const allResults: FeedItem[] = [];

    for (const query of searchQueries.slice(0, 3)) { // Increased to 3 queries for better coverage
      try {
        console.log(`Searching for: ${query}`);
        
        const url = new URL(this.baseUrl);
        url.searchParams.append("engine", "google_news");
        url.searchParams.append("q", query);
        url.searchParams.append("gl", gl);
        url.searchParams.append("hl", hl);
        url.searchParams.append("api_key", this.apiKey);
        url.searchParams.append("num", "10");

        console.log(`Making request to: ${url.toString().replace(this.apiKey, '[API_KEY]')}`);

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SerpApiResponse = await response.json();
        console.log(`SerpApi response status: ${data.search_metadata?.status}, results: ${data.news_results?.length || 0}`);

        if (data.search_metadata.status === "Success" && data.news_results) {
          // Log detailed content information for debugging
          console.log(`\n=== Debugging ${company.name} - Query: "${query}" ===`);
          const sampleItem = data.news_results[0];
          if (sampleItem) {
            console.log('Sample article fields:');
            console.log(`- Title: "${sampleItem.title}"`);
            console.log(`- Snippet: "${sampleItem.snippet || 'NONE'}"`);
            console.log(`- Content: "${sampleItem.content || 'NONE'}"`);
            console.log(`- Description: "${sampleItem.description || 'NONE'}"`);
            console.log(`- Summary: "${sampleItem.summary || 'NONE'}"`);
            console.log(`- Excerpt: "${sampleItem.excerpt || 'NONE'}"`);
            
            const bestContent = this.getBestContentText(sampleItem);
            console.log(`- Best content (${bestContent.length} chars): "${bestContent}"`);
          }
          
          const contentStats = data.news_results.map(item => {
            const contentText = this.getBestContentText(item);
            return {
              hasSnippet: !!item.snippet,
              hasContent: !!item.content,
              hasDescription: !!item.description,
              contentLength: contentText.length
            };
          });
          
          const avgContentLength = contentStats.reduce((sum, stat) => sum + stat.contentLength, 0) / contentStats.length;
          const withContent = contentStats.filter(stat => stat.contentLength > 50).length;
          console.log(`Query "${query}" - Avg content: ${avgContentLength.toFixed(0)} chars, ${withContent}/${contentStats.length} items with substantial content`);
          
          const feedItems = this.transformToFeedItems(data.news_results, company);
          allResults.push(...feedItems);
          console.log(`Added ${feedItems.length} items for ${company.name}`);
        }

        // Add delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error fetching news for ${company.name} with query "${query}":`, error);
        continue; // Continue with next query
      }
    }

    // Remove duplicates based on title and URL
    const uniqueResults = this.removeDuplicates(allResults);
    console.log(`Final results for ${company.name}: ${uniqueResults.length} unique items`);
    return uniqueResults.slice(0, 10); // Limit results per company
  }

  // Search for general tech/startup news
  async searchGeneralNews(options: {
    gl?: string;
    hl?: string;
    topics?: string[];
  } = {}): Promise<FeedItem[]> {
    const { gl = "us", hl = "en", topics = ["startup funding", "venture capital", "startup acquisition"] } = options;

    console.log('Searching for general news topics:', topics);
    const allResults: FeedItem[] = [];

    for (const topic of topics.slice(0, 3)) {
      try {
        console.log(`Searching for general topic: ${topic}`);
        
        const url = new URL(this.baseUrl);
        url.searchParams.append("engine", "google_news");
        url.searchParams.append("q", topic);
        url.searchParams.append("gl", gl);
        url.searchParams.append("hl", hl);
        url.searchParams.append("api_key", this.apiKey);

        const response = await fetch(url.toString());
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: SerpApiResponse = await response.json();
        console.log(`General news response for "${topic}": ${data.news_results?.length || 0} results`);

        if (data.search_metadata.status === "Success" && data.news_results) {
          const feedItems = this.transformToFeedItems(data.news_results, {
            id: "general",
            name: "Industry News",
            logo: "/placeholder.svg?height=40&width=40"
          });
          allResults.push(...feedItems);
        }

        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error fetching general news for topic ${topic}:`, error);
        continue;
      }
    }

    const uniqueResults = this.removeDuplicates(allResults);
    console.log(`General news: ${uniqueResults.length} unique items`);
    return uniqueResults.slice(0, 15);
  }

  // Get news from a specific publication
  async getPublicationNews(publicationToken: string, options: {
    gl?: string;
    hl?: string;
  } = {}): Promise<FeedItem[]> {
    const { gl = "us", hl = "en" } = options;

    try {
      const url = new URL(this.baseUrl);
      url.searchParams.append("engine", "google_news");
      url.searchParams.append("publication_token", publicationToken);
      url.searchParams.append("gl", gl);
      url.searchParams.append("hl", hl);
      url.searchParams.append("api_key", this.apiKey);

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SerpApiResponse = await response.json();

      if (data.search_metadata.status === "Success" && data.news_results) {
        return this.transformToFeedItems(data.news_results, {
          id: "publication",
          name: "Publication",
          logo: "/placeholder.svg?height=40&width=40"
        });
      }

      return [];
    } catch (error) {
      console.error("Error fetching publication news:", error);
      return [];
    }
  }

  // Transform SerpApi results to our FeedItem format with relevance filtering
  private transformToFeedItems(results: SerpApiResponse['news_results'], company: Company): FeedItem[] {
    return results
      .filter(item => this.isRelevantToCompany(item, company))
      .map((item, index) => {
        // Get the best available content for summary
        const contentText = this.getBestContentText(item);
        
        return {
          id: `${company.id}-${Date.now()}-${index}`,
          company,
          source: this.determineSource(item.source.name),
          title: this.enhanceTitle(item.title, company),
          summary: this.generateEnhancedSummary(item.title, contentText, company),
          timestamp: this.parseDate(item.date),
          originalUrl: item.link,
          tags: this.extractEnhancedTags(item.title, contentText, company),
          bookmarked: false,
          read: false,
          engagementScore: this.calculateEngagementScore(item.title, contentText),
        };
      });
  }

  // Check if a news item is actually relevant to the company
  private isRelevantToCompany(item: SerpApiResponse['news_results'][0], company: Company): boolean {
    const titleLower = item.title.toLowerCase();
    const snippetLower = (item.snippet || '').toLowerCase();
    const fullText = `${titleLower} ${snippetLower}`;
    const companyNameLower = company.name.toLowerCase();

    // Must contain the company name
    if (!fullText.includes(companyNameLower)) {
      return false;
    }

    // Filter out common false positives
    const irrelevantPatterns = [
      // Medical/research terms that might match company names
      'pain relief', 'inflammatory', 'medication', 'clinical trial', 'medical research',
      'pharmaceutical', 'drug development', 'therapy', 'treatment', 'patient',
      // Generic terms that are too broad
      'the relief', 'stress relief', 'debt relief act', 'disaster relief',
      'tax relief', 'mortgage relief', 'student loan relief',
      // Location/geographic terms
      'relief efforts', 'hurricane relief', 'flood relief', 'emergency relief',
      // Metal/materials (for companies like Arc, Copper)
      'copper wire', 'copper price', 'copper mining', 'metal prices', 'arc welding',
      'electrical arc', 'arc flash', 'copper sulfate',
      // Generic business terms without startup context
      'mental health awareness', 'mental health month', 'mental health day'
    ];

    // Check if title/snippet contains irrelevant patterns
    for (const pattern of irrelevantPatterns) {
      if (fullText.includes(pattern)) {
        return false;
      }
    }

    // Positive signals that indicate company relevance
    const relevantSignals = [
      'startup', 'company', 'ceo', 'founder', 'funding', 'investment', 'venture capital',
      'series a', 'series b', 'seed round', 'valuation', 'partnership', 'acquisition',
      'launches', 'announces', 'platform', 'app', 'technology', 'raises', 'secures',
      'appoints', 'hires', 'expands', 'grows', 'revenue', 'customers', 'users'
    ];

    // Must have at least one relevant signal
    const hasRelevantSignal = relevantSignals.some(signal => fullText.includes(signal));
    if (!hasRelevantSignal) {
      return false;
    }

    // Additional validation for specific companies with common words
    if (company.name === 'Relief') {
      // Must have startup/business context and not be about general relief
      return fullText.includes('startup') || fullText.includes('company') || 
             fullText.includes('app') || fullText.includes('debt management') ||
             item.link.includes('relief.app') || item.link.includes('getrelief.com');
    }

    if (company.name === 'Arc') {
      // Must be about the boat company, not electrical arcs
      return fullText.includes('boat') || fullText.includes('electric vehicle') ||
             fullText.includes('marine') || fullText.includes('startup') ||
             item.link.includes('arcboats.com');
    }

    if (company.name === 'Copper') {
      // Must be about the appliance company, not the metal
      return fullText.includes('appliance') || fullText.includes('kitchen') ||
             fullText.includes('induction') || fullText.includes('startup') ||
             item.link.includes('copperhome.com');
    }

    if (company.name === 'Mental') {
      // Must be about the fitness app, not general mental health
      return fullText.includes('app') || fullText.includes('fitness') ||
             fullText.includes('training') || fullText.includes('startup') ||
             item.link.includes('getmental.com');
    }

    return true;
  }

  // Get the best available content text from multiple possible fields
  private getBestContentText(item: SerpApiResponse['news_results'][0]): string {
    // Priority order: content > excerpt > description > summary > snippet
    const candidates = [
      item.content,
      item.excerpt, 
      item.description,
      item.summary,
      item.snippet
    ].filter((text): text is string => text !== undefined && text.trim().length > 0);

    if (candidates.length === 0) {
      return '';
    }

    // Return the longest meaningful content
    return candidates.reduce((best, current) => 
      current.length > best.length ? current : best
    );
  }

  // Determine source type based on source name
  private determineSource(sourceName: string): "linkedin" | "twitter" | "news" | "blog" | "other" {
    const source = sourceName.toLowerCase();
    
    if (source.includes("linkedin")) return "linkedin";
    if (source.includes("twitter") || source.includes("x.com")) return "twitter";
    if (source.includes("blog") || source.includes("medium")) return "blog";
    if (source.includes("techcrunch") || source.includes("reuters") || 
        source.includes("bloomberg") || source.includes("cnn") ||
        source.includes("forbes") || source.includes("wall street")) return "news";
    
    return "other";
  }

  // Parse date string to ISO format with better handling
  private parseDate(dateStr: string): string {
    try {
      // Handle various date formats from Google News
      let parsedDate: Date;

      // Common Google News date formats
      if (dateStr.includes('ago')) {
        // Handle "2 hours ago", "1 day ago", etc.
        const now = new Date();
        const match = dateStr.match(/(\d+)\s*(minute|hour|day|week|month)s?\s*ago/i);
        
        if (match) {
          const value = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          
          switch (unit) {
            case 'minute':
              parsedDate = new Date(now.getTime() - value * 60 * 1000);
              break;
            case 'hour':
              parsedDate = new Date(now.getTime() - value * 60 * 60 * 1000);
              break;
            case 'day':
              parsedDate = new Date(now.getTime() - value * 24 * 60 * 60 * 1000);
              break;
            case 'week':
              parsedDate = new Date(now.getTime() - value * 7 * 24 * 60 * 60 * 1000);
              break;
            case 'month':
              parsedDate = new Date(now.getTime() - value * 30 * 24 * 60 * 60 * 1000);
              break;
            default:
              parsedDate = new Date(dateStr);
          }
        } else {
          parsedDate = new Date(dateStr);
        }
      } else {
        // Standard date parsing
        parsedDate = new Date(dateStr);
      }

      // Validate the date
      if (isNaN(parsedDate.getTime())) {
        return new Date().toISOString();
      }

      return parsedDate.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }

  // Generate summary if snippet is not available
  private generateSummary(title: string): string {
    return `${title.slice(0, 150)}${title.length > 150 ? "..." : ""}`;
  }

  // Enhance title for better readability and context
  private enhanceTitle(title: string, company: Company): string {
    // Clean up common title formatting issues
    let enhancedTitle = title
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^-\s*/, '') // Remove leading dashes
      .replace(/\s*-\s*$/, ''); // Remove trailing dashes

    // Ensure company name is properly formatted
    if (!enhancedTitle.includes(company.name) && company.searchTerms) {
      const companyTerm = company.searchTerms.find(term => 
        enhancedTitle.toLowerCase().includes(term.toLowerCase())
      );
      if (companyTerm) {
        enhancedTitle = enhancedTitle.replace(
          new RegExp(companyTerm, 'gi'), 
          company.name
        );
      }
    }

    return enhancedTitle;
  }

  // Generate enhanced summary with more context, prioritizing article content
  private generateEnhancedSummary(title: string, snippet: string | undefined, company: Company): string {
    if (snippet && snippet.trim().length > 0) {
      // Clean and enhance the snippet from actual article content
      let enhancedSummary = snippet
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^\.+\s*/, '') // Remove leading dots
        .replace(/\s*\.+$/, '') // Remove trailing dots
        .replace(/^["\u201C\u201D]+|["\u201C\u201D]+$/g, '') // Remove surrounding quotes
        .replace(/^\s*[-\u2013\u2014]\s*/, '') // Remove leading dashes
        .replace(/\s*[-\u2013\u2014]\s*$/, ''); // Remove trailing dashes

      // If snippet is very short (likely truncated), try to make it more complete
      if (enhancedSummary.length < 50) {
        // If snippet seems incomplete, try to extract meaningful content from title
        const titleWithoutCompany = title.replace(new RegExp(company.name, 'gi'), '').trim();
        if (titleWithoutCompany.length > enhancedSummary.length) {
          enhancedSummary = `${enhancedSummary} ${titleWithoutCompany}`.trim();
        }
      }

      // Clean up redundant company mentions
      const companyRegex = new RegExp(`\\b${company.name}\\b`, 'gi');
      const mentions = (enhancedSummary.match(companyRegex) || []).length;
      if (mentions > 1) {
        // Keep only the first mention
        let firstMention = true;
        enhancedSummary = enhancedSummary.replace(companyRegex, (match) => {
          if (firstMention) {
            firstMention = false;
            return match;
          }
          return 'the company';
        });
      }

      // Add industry context if company is not mentioned and summary is vague
      if (!enhancedSummary.toLowerCase().includes(company.name.toLowerCase()) && enhancedSummary.length < 100) {
        const industryContext = this.getIndustryContext(company);
        if (industryContext) {
          enhancedSummary = `${company.name}, ${industryContext}, ${enhancedSummary.toLowerCase()}`;
        }
      }

      // Ensure proper sentence structure
      if (!enhancedSummary.endsWith('.') && !enhancedSummary.endsWith('!') && !enhancedSummary.endsWith('?')) {
        enhancedSummary += '.';
      }

      // Capitalize first letter
      enhancedSummary = enhancedSummary.charAt(0).toUpperCase() + enhancedSummary.slice(1);

      return enhancedSummary;
    }

    // Fallback: Generate intelligent summary from title when no article content is available
    const industryContext = this.getIndustryContext(company);
    const cleanTitle = title.replace(new RegExp(company.name, 'gi'), '').trim().replace(/^[-:\s]+/, '');
    
    // Enhanced contextual description based on title analysis
    const titleLower = cleanTitle.toLowerCase();
    let enhancedDescription = '';
    
    if (titleLower.includes('funding') || titleLower.includes('raised') || titleLower.includes('investment')) {
      enhancedDescription = this.generateFundingDescription(cleanTitle, company, industryContext);
    } else if (titleLower.includes('partnership') || titleLower.includes('collaboration')) {
      enhancedDescription = this.generatePartnershipDescription(cleanTitle, company, industryContext);
    } else if (titleLower.includes('launch') || titleLower.includes('announces') || titleLower.includes('unveils')) {
      enhancedDescription = this.generateLaunchDescription(cleanTitle, company, industryContext);
    } else if (titleLower.includes('acquisition') || titleLower.includes('acquires') || titleLower.includes('merger')) {
      enhancedDescription = this.generateAcquisitionDescription(cleanTitle, company, industryContext);
    } else {
      // General business update
      enhancedDescription = `${company.name}${industryContext ? `, ${industryContext},` : ''} ${cleanTitle.toLowerCase()}.`;
    }
    
    return enhancedDescription;
  }

  // Get industry context for a company
  private getIndustryContext(company: Company): string {
    const industryMap: Record<string, string> = {
      "Akido": "a healthcare AI platform",
      "AllVoices": "an employee relations platform",
      "Alyf": "a cardiac care technology company",
      "Arc": "an electric boat manufacturer",
      "Brellium": "a clinical compliance AI platform",
      "Career Karma": "a tech education platform",
      "Copper": "a smart home appliance company",
      "EnsoData": "a sleep diagnostics AI platform",
      "EveryCare": "an aging care platform",
      "Farmers Business Network": "an agricultural technology platform",
      "Forage": "a government benefits payment platform",
      "Infinite Machine": "an electric vehicle manufacturer",
      "Insightful Instruments": "a surgical instrument company",
      "Kurios": "a fractional talent platform",
      "Magrathea": "a sustainable metals company",
      "MedTruly": "a chronic care management platform",
      "Mental": "a mental fitness app",
      "Modern Health": "a mental health platform",
      "Moov": "a financial infrastructure platform",
      "Nevoya": "a zero-emission freight platform",
      "Nomba": "a mobile payments platform",
      "OneImaging": "a radiology management platform",
      "Perceptive": "a dental robotics company",
      "Plural Energy": "a renewable energy finance platform",
      "ReadoutAI": "a clinical trials AI platform",
      "Recursion": "an AI drug discovery company",
      "Relief": "a debt management app",
      "Rubi": "a sustainable textiles company",
      "Taro": "a health insurance technology platform",
      "Terra Energy": "a renewable energy platform",
      "Unlearn": "a clinical trials AI platform",
      "Vicarious Surgical": "a robotic surgery platform",
      "Wayve": "an autonomous driving AI company",
      "Zocalo Health": "a Latino healthcare platform"
    };

    return industryMap[company.name] || "";
  }

  // Generate funding-specific descriptions
  private generateFundingDescription(cleanTitle: string, company: Company, industryContext: string): string {
    const fundingAmount = this.extractFundingAmount(cleanTitle);
    const roundType = this.extractRoundType(cleanTitle);
    
    let description = `${company.name}${industryContext ? `, ${industryContext},` : ''} has `;
    
    if (fundingAmount && roundType) {
      description += `raised ${fundingAmount} in ${roundType} funding`;
    } else if (fundingAmount) {
      description += `secured ${fundingAmount} in funding`;
    } else if (roundType) {
      description += `completed ${roundType} funding round`;
    } else {
      description += `secured new funding`;
    }
    
    // Add purpose if mentioned
    if (cleanTitle.toLowerCase().includes('to support') || cleanTitle.toLowerCase().includes('for')) {
      const purpose = this.extractFundingPurpose(cleanTitle);
      if (purpose) {
        description += ` to ${purpose}`;
      }
    }
    
    return description + '.';
  }

  // Generate partnership-specific descriptions
  private generatePartnershipDescription(cleanTitle: string, company: Company, industryContext: string): string {
    const partner = this.extractPartnerName(cleanTitle);
    
    let description = `${company.name}${industryContext ? `, ${industryContext},` : ''} has `;
    
    if (cleanTitle.toLowerCase().includes('partnership')) {
      description += partner ? `announced a strategic partnership with ${partner}` : 'formed a new strategic partnership';
    } else if (cleanTitle.toLowerCase().includes('collaboration')) {
      description += partner ? `entered into a collaboration with ${partner}` : 'announced a new collaboration';
    } else {
      description += 'established a new business relationship';
    }
    
    return description + '.';
  }

  // Generate launch-specific descriptions
  private generateLaunchDescription(cleanTitle: string, company: Company, industryContext: string): string {
    const product = this.extractProductName(cleanTitle);
    
    let description = `${company.name}${industryContext ? `, ${industryContext},` : ''} has `;
    
    if (cleanTitle.toLowerCase().includes('launch')) {
      description += product ? `launched ${product}` : 'launched a new offering';
    } else if (cleanTitle.toLowerCase().includes('announces')) {
      description += product ? `announced ${product}` : 'made a significant announcement';
    } else if (cleanTitle.toLowerCase().includes('unveils')) {
      description += product ? `unveiled ${product}` : 'unveiled new developments';
    } else {
      description += 'introduced new capabilities';
    }
    
    return description + '.';
  }

  // Generate acquisition-specific descriptions
  private generateAcquisitionDescription(cleanTitle: string, company: Company, industryContext: string): string {
    const target = this.extractAcquisitionTarget(cleanTitle);
    
    let description = `${company.name}${industryContext ? `, ${industryContext},` : ''} has `;
    
    if (cleanTitle.toLowerCase().includes('acquires') || cleanTitle.toLowerCase().includes('acquisition')) {
      description += target ? `acquired ${target}` : 'completed an acquisition';
    } else if (cleanTitle.toLowerCase().includes('merger')) {
      description += target ? `announced a merger with ${target}` : 'announced a strategic merger';
    } else {
      description += 'engaged in corporate development activity';
    }
    
    return description + '.';
  }

  // Helper methods to extract specific information from titles
  private extractFundingAmount(title: string): string | null {
    const amountMatch = title.match(/\$([0-9,.]+\s*(million|billion|M|B))/i);
    return amountMatch ? amountMatch[0] : null;
  }

  private extractRoundType(title: string): string | null {
    const roundMatch = title.match(/(seed|series\s*[A-Z]|pre-seed|bridge)/i);
    return roundMatch ? roundMatch[0] : null;
  }

  private extractFundingPurpose(title: string): string | null {
    const purposeMatch = title.match(/(?:to support|for)\s+([^.]+)/i);
    if (purposeMatch) {
      return purposeMatch[1].trim().toLowerCase();
    }
    return null;
  }

  private extractPartnerName(title: string): string | null {
    // Simple extraction - could be enhanced with more sophisticated NLP
    const partnerMatch = title.match(/(?:with|partnership with)\s+([A-Z][a-zA-Z\s]+?)(?:\s|$|,|\.)/);
    return partnerMatch ? partnerMatch[1].trim() : null;
  }

  private extractProductName(title: string): string | null {
    // Look for quoted product names or capitalized terms after launch/announces
    const productMatch = title.match(/(?:launch|announces|unveils)\s+["']?([A-Z][a-zA-Z\s]+?)["']?(?:\s|$|,|\.)/);
    return productMatch ? productMatch[1].trim() : null;
  }

  private extractAcquisitionTarget(title: string): string | null {
    const targetMatch = title.match(/(?:acquires|acquisition of)\s+([A-Z][a-zA-Z\s]+?)(?:\s|$|,|\.)/);
    return targetMatch ? targetMatch[1].trim() : null;
  }

  // Extract relevant tags from title and snippet
  private extractTags(title: string, snippet?: string): string[] {
    const text = `${title} ${snippet || ""}`.toLowerCase();
    const tags: string[] = [];

    const tagKeywords = {
      "funding": ["funding", "investment", "raised", "series", "round", "capital"],
      "product-launch": ["launch", "releases", "announces", "unveils", "introduces"],
      "partnership": ["partnership", "collaboration", "teams up", "joins forces"],
      "acquisition": ["acquires", "acquisition", "buys", "purchases", "merger"],
      "hiring": ["hiring", "joins", "appointed", "ceo", "cto", "hires"],
      "growth": ["growth", "expansion", "scales", "increases", "growing"],
      "ai": ["artificial intelligence", "ai", "machine learning", "ml"],
      "technology": ["technology", "tech", "innovation", "platform"]
    };

    for (const [tag, keywords] of Object.entries(tagKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }

    return tags.length > 0 ? tags.slice(0, 3) : ["general"];
  }

  // Extract enhanced tags with company-specific context
  private extractEnhancedTags(title: string, snippet: string | undefined, company: Company): string[] {
    const text = `${title} ${snippet || ""}`.toLowerCase();
    const tags: string[] = [];

    const enhancedTagKeywords = {
      "funding": ["funding", "investment", "raised", "series", "round", "capital", "valuation", "venture", "equity"],
      "product-launch": ["launch", "releases", "announces", "unveils", "introduces", "debuts", "rolls out"],
      "partnership": ["partnership", "collaboration", "teams up", "joins forces", "alliance", "agreement"],
      "acquisition": ["acquires", "acquisition", "buys", "purchases", "merger", "acquired by", "takeover"],
      "hiring": ["hiring", "joins", "appointed", "ceo", "cto", "hires", "executive", "leadership"],
      "growth": ["growth", "expansion", "scales", "increases", "growing", "expands", "revenue"],
      "ai": ["artificial intelligence", "ai", "machine learning", "ml", "automation", "neural", "algorithm"],
      "technology": ["technology", "tech", "innovation", "platform", "software", "digital"],
      "regulatory": ["regulation", "regulatory", "compliance", "fda", "approval", "licensed"],
      "clinical": ["clinical", "trial", "patient", "medical", "health", "treatment"],
      "sustainability": ["sustainable", "green", "carbon", "environment", "renewable", "clean"],
      "ipo": ["ipo", "public", "nasdaq", "stock", "shares", "listing"],
      "milestone": ["milestone", "achievement", "breakthrough", "success", "award"]
    };

    // Add company-specific tags
    const companySpecificTags = this.getCompanySpecificTags(company);
    
    for (const [tag, keywords] of Object.entries(enhancedTagKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        tags.push(tag);
      }
    }

    // Add company-specific tags if relevant
    companySpecificTags.forEach(tag => {
      if (text.includes(tag.toLowerCase()) && !tags.includes(tag)) {
        tags.push(tag);
      }
    });

    return tags.length > 0 ? tags.slice(0, 4) : ["general"];
  }

  // Get company-specific tags
  private getCompanySpecificTags(company: Company): string[] {
    const companyTagMap: Record<string, string[]> = {
      "Akido": ["healthcare", "ai", "telemedicine"],
      "AllVoices": ["hr-tech", "workplace"],
      "Alyf": ["healthcare", "cardiology"],
      "Arc": ["electric-vehicles", "marine"],
      "Brellium": ["healthcare", "compliance"],
      "Career Karma": ["education", "bootcamp"],
      "Copper": ["smart-home", "iot"],
      "EnsoData": ["healthcare", "sleep", "ai"],
      "EveryCare": ["healthcare", "aging"],
      "Farmers Business Network": ["agriculture", "agtech"],
      "Forage": ["fintech", "government"],
      "Infinite Machine": ["electric-vehicles"],
      "Insightful Instruments": ["medical-devices"],
      "Kurios": ["hr-tech", "talent"],
      "Magrathea": ["sustainability", "materials"],
      "MedTruly": ["healthcare", "chronic-care"],
      "Mental": ["mental-health", "wellness"],
      "Modern Health": ["mental-health", "hr-tech"],
      "Moov": ["fintech", "payments"],
      "Nevoya": ["logistics", "sustainability"],
      "Nomba": ["fintech", "emerging-markets"],
      "OneImaging": ["healthcare", "radiology"],
      "Perceptive": ["healthcare", "robotics"],
      "Plural Energy": ["renewable-energy", "finance"],
      "ReadoutAI": ["healthcare", "clinical-trials"],
      "Recursion": ["biotech", "drug-discovery"],
      "Relief": ["fintech", "debt"],
      "Rubi": ["sustainability", "fashion"],
      "Taro": ["healthcare", "insurance"],
      "Terra Energy": ["renewable-energy"],
      "Unlearn": ["healthcare", "clinical-trials"],
      "Vicarious Surgical": ["healthcare", "robotics"],
      "Wayve": ["autonomous-vehicles", "ai"],
      "Zocalo Health": ["healthcare", "diversity"]
    };

    return companyTagMap[company.name] || [];
  }

  // Calculate engagement score based on content relevance
  private calculateEngagementScore(title: string, snippet?: string): number {
    const text = `${title} ${snippet || ""}`.toLowerCase();
    let score = 50; // Base score

    // High-impact keywords increase score
    const highImpactKeywords = [
      "raises", "funding", "series", "million", "billion", "acquisition", "ipo", 
      "breakthrough", "partnership", "launch", "approved", "expansion"
    ];

    const mediumImpactKeywords = [
      "announces", "growth", "hiring", "technology", "innovation", "platform"
    ];

    highImpactKeywords.forEach(keyword => {
      if (text.includes(keyword)) score += 15;
    });

    mediumImpactKeywords.forEach(keyword => {
      if (text.includes(keyword)) score += 8;
    });

    // Recency bonus (newer articles get higher scores)
    const now = new Date();
    const articleAge = Math.random() * 30; // Mock age in days
    if (articleAge < 1) score += 20;
    else if (articleAge < 7) score += 10;
    else if (articleAge < 30) score += 5;

    return Math.min(Math.max(score, 1), 100);
  }

  // Remove duplicate articles
  private removeDuplicates(items: FeedItem[]): FeedItem[] {
    const seen = new Set<string>();
    return items.filter(item => {
      const key = `${item.title}-${item.originalUrl}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

// Main function to fetch all news for portfolio companies
export async function fetchPortfolioNews(apiKey: string): Promise<{
  companyNews: FeedItem[];
  generalNews: FeedItem[];
  highlights: FeedItem[];
}> {
  console.log('Starting fetchPortfolioNews with API key:', !!apiKey);
  
  const newsService = new NewsApiService(apiKey);
  
  try {
    console.log(`Fetching news for ${portfolioCompanies.length} portfolio companies`);
    
    // Fetch news for each portfolio company
    const companyNewsPromises = portfolioCompanies.map(company => 
      newsService.searchCompanyNews(company)
    );

    // Fetch general startup/tech news
    const generalNewsPromise = newsService.searchGeneralNews();

    console.log('Waiting for all news requests to complete...');
    
    // Wait for all requests to complete
    const [companyNewsArrays, generalNews] = await Promise.all([
      Promise.all(companyNewsPromises),
      generalNewsPromise
    ]);

    // Flatten company news
    const companyNews = companyNewsArrays.flat();
    console.log(`Total company news items: ${companyNews.length}`);
    console.log(`Total general news items: ${generalNews.length}`);

    // Sort all news by timestamp (newest first) for proper chronological order
    const sortedCompanyNews = companyNews.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    const sortedGeneralNews = generalNews.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Combine all news and sort by engagement score for highlights
    const allNews = [...sortedCompanyNews, ...sortedGeneralNews];
    const highlights = allNews
      .filter(item => item.engagementScore && item.engagementScore > 70)
      .sort((a, b) => (b.engagementScore || 0) - (a.engagementScore || 0))
      .slice(0, 5);

    console.log(`Generated ${highlights.length} highlights`);

    const result = {
      companyNews: sortedCompanyNews.slice(0, 50), // Return properly sorted company news
      generalNews: sortedGeneralNews.slice(0, 20), // Return properly sorted general news  
      highlights
    };

    console.log('fetchPortfolioNews completed successfully');
    return result;

  } catch (error) {
    console.error("Error in fetchPortfolioNews:", error);
    
    // Return empty arrays if API fails
    return {
      companyNews: [],
      generalNews: [],
      highlights: []
    };
  }
}

// Export types and constants
export type { FeedItem, Company };
export { NewsApiService }; 