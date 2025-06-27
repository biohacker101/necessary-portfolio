export interface Company {
  id: string
  name: string
  logo: string
}

export interface FeedItem {
  id: string
  company: Company
  source: "linkedin" | "twitter" | "news" | "blog" | "other"
  title: string
  summary: string
  timestamp: string
  originalUrl: string
  tags: string[]
  bookmarked: boolean
  read: boolean
  engagementScore?: number
}

export interface Highlight extends FeedItem {
  engagementScore: number
}

const companies: Company[] = [
  { id: "1", name: "Stripe", logo: "/placeholder.svg?height=40&width=40" },
  { id: "2", name: "Notion", logo: "/placeholder.svg?height=40&width=40" },
  { id: "3", name: "Figma", logo: "/placeholder.svg?height=40&width=40" },
  { id: "4", name: "Linear", logo: "/placeholder.svg?height=40&width=40" },
  { id: "5", name: "Vercel", logo: "/placeholder.svg?height=40&width=40" },
  { id: "6", name: "Supabase", logo: "/placeholder.svg?height=40&width=40" },
  { id: "7", name: "Clerk", logo: "/placeholder.svg?height=40&width=40" },
  { id: "8", name: "Resend", logo: "/placeholder.svg?height=40&width=40" },
]

export const mockFeedData: FeedItem[] = [
  {
    id: "1",
    company: companies[0],
    source: "linkedin",
    title: "Stripe announces new payment infrastructure for emerging markets",
    summary:
      "Stripe today announced a major expansion of its payment infrastructure to support emerging markets across Southeast Asia and Latin America. The new infrastructure promises to reduce transaction fees by up to 30% and improve payment success rates. This move is part of Stripe's broader strategy to democratize internet commerce globally and support the next billion online businesses.",
    timestamp: "2024-01-15T10:30:00Z",
    originalUrl: "https://linkedin.com/posts/stripe-announcement",
    tags: ["product-launch", "expansion", "payments"],
    bookmarked: false,
    read: false,
    engagementScore: 95,
  },
  {
    id: "2",
    company: companies[1],
    source: "twitter",
    title: "Notion AI gets major upgrade with advanced automation features",
    summary:
      "Notion has rolled out significant improvements to its AI capabilities, introducing advanced automation workflows that can help teams streamline their project management processes. The update includes smart templates, automated task assignment, and intelligent content suggestions that adapt to team workflows.",
    timestamp: "2024-01-15T09:15:00Z",
    originalUrl: "https://twitter.com/notion/status/123456789",
    tags: ["ai", "product-update", "automation"],
    bookmarked: true,
    read: false,
    engagementScore: 87,
  },
  {
    id: "3",
    company: companies[2],
    source: "news",
    title: "Figma raises $200M Series D at $20B valuation",
    summary:
      "Design platform Figma has closed a $200 million Series D funding round, valuing the company at $20 billion. The round was led by Durable Capital Partners with participation from existing investors. Figma plans to use the funding to expand its enterprise offerings and invest heavily in AI-powered design tools.",
    timestamp: "2024-01-15T08:45:00Z",
    originalUrl: "https://techcrunch.com/figma-series-d",
    tags: ["fundraise", "series-d", "valuation"],
    bookmarked: false,
    read: true,
    engagementScore: 92,
  },
  {
    id: "4",
    company: companies[3],
    source: "blog",
    title: "Linear introduces new project timeline visualization",
    summary:
      "Linear has launched a comprehensive timeline view that gives teams better visibility into project progress and dependencies. The new feature includes Gantt-style charts, milestone tracking, and resource allocation views. This update addresses one of the most requested features from Linear's enterprise customers.",
    timestamp: "2024-01-15T07:20:00Z",
    originalUrl: "https://linear.app/blog/timeline-view",
    tags: ["product-launch", "project-management", "visualization"],
    bookmarked: false,
    read: false,
    engagementScore: 78,
  },
  {
    id: "5",
    company: companies[4],
    source: "linkedin",
    title: "Vercel partners with AWS to enhance edge computing capabilities",
    summary:
      "Vercel announced a strategic partnership with Amazon Web Services to expand its edge computing infrastructure. The collaboration will bring Vercel's edge functions to more AWS regions worldwide, reducing latency for developers and improving performance for end users. This partnership represents a significant step in Vercel's mission to make the web faster.",
    timestamp: "2024-01-15T06:30:00Z",
    originalUrl: "https://linkedin.com/posts/vercel-aws-partnership",
    tags: ["partnership", "edge-computing", "infrastructure"],
    bookmarked: true,
    read: false,
    engagementScore: 84,
  },
  {
    id: "6",
    company: companies[5],
    source: "twitter",
    title: "Supabase launches real-time multiplayer features",
    summary:
      "Supabase has introduced new real-time multiplayer capabilities that make it easier for developers to build collaborative applications. The features include presence indicators, real-time cursors, and conflict resolution for simultaneous edits. These tools are designed to help developers create more engaging, collaborative user experiences.",
    timestamp: "2024-01-14T16:45:00Z",
    originalUrl: "https://twitter.com/supabase/status/987654321",
    tags: ["product-launch", "real-time", "multiplayer"],
    bookmarked: false,
    read: false,
    engagementScore: 76,
  },
  {
    id: "7",
    company: companies[6],
    source: "news",
    title: "Clerk secures $30M Series B to expand authentication platform",
    summary:
      "Authentication startup Clerk has raised $30 million in Series B funding to expand its developer-first authentication platform. The round was led by Andreessen Horowitz with participation from existing investors. Clerk plans to use the funding to build more integrations and expand internationally.",
    timestamp: "2024-01-14T14:20:00Z",
    originalUrl: "https://venturebeat.com/clerk-series-b",
    tags: ["fundraise", "series-b", "authentication"],
    bookmarked: false,
    read: true,
    engagementScore: 71,
  },
  {
    id: "8",
    company: companies[7],
    source: "blog",
    title: "Resend introduces advanced email analytics and tracking",
    summary:
      "Email API platform Resend has launched comprehensive analytics and tracking features for developers. The new capabilities include detailed delivery metrics, engagement tracking, and A/B testing tools. These features help developers optimize their email campaigns and improve user engagement rates.",
    timestamp: "2024-01-14T12:10:00Z",
    originalUrl: "https://resend.com/blog/analytics-launch",
    tags: ["product-launch", "analytics", "email"],
    bookmarked: false,
    read: false,
    engagementScore: 68,
  },
  {
    id: "9",
    company: companies[0],
    source: "news",
    title: "Stripe Connect adds new marketplace features for platforms",
    summary:
      "Stripe has enhanced its Connect platform with new marketplace features designed to help platforms manage complex payment flows. The updates include improved onboarding for sellers, enhanced dispute management, and better reporting tools. These improvements make it easier for platforms to scale their marketplace operations.",
    timestamp: "2024-01-14T10:30:00Z",
    originalUrl: "https://stripe.com/newsroom/news/connect-updates",
    tags: ["product-update", "marketplace", "payments"],
    bookmarked: true,
    read: false,
    engagementScore: 82,
  },
  {
    id: "10",
    company: companies[1],
    source: "linkedin",
    title: "Notion expands team collaboration with new workspace features",
    summary:
      "Notion has rolled out new workspace collaboration features including improved permission management, team spaces, and enhanced sharing controls. These updates are designed to help larger organizations better manage their Notion deployments and improve team productivity.",
    timestamp: "2024-01-14T09:15:00Z",
    originalUrl: "https://linkedin.com/posts/notion-workspace-update",
    tags: ["collaboration", "workspace", "enterprise"],
    bookmarked: false,
    read: false,
    engagementScore: 75,
  },
  // Add more mock data items as needed...
]

export const mockHighlights: Highlight[] = mockFeedData
  .filter((item) => item.engagementScore && item.engagementScore > 80)
  .map((item) => ({ ...item, engagementScore: item.engagementScore! }))
  .slice(0, 5)

// API simulation functions
export const fetchFeedData = async (page = 1, limit = 10): Promise<FeedItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return mockFeedData.slice(startIndex, endIndex)
}

export const fetchHighlights = async (): Promise<Highlight[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return mockHighlights
}

export const searchFeedData = async (query: string): Promise<FeedItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  return mockFeedData.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.summary.toLowerCase().includes(query.toLowerCase()) ||
      item.company.name.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )
}
