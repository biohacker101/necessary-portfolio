#!/usr/bin/env python3

import json
import logging
import pandas as pd
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import time
import os
import re
from datetime import datetime, timedelta
import requests
from io import BytesIO
from urllib.parse import urljoin, urlparse

try:
    from bs4 import BeautifulSoup
    BS4_AVAILABLE = True
except ImportError:
    BS4_AVAILABLE = False

try:
    import snscrape.modules.twitter as sntwitter
    SNSCRAPE_AVAILABLE = True
except ImportError:
    SNSCRAPE_AVAILABLE = False

@dataclass
class Tweet:
    id: str
    text: str
    author: str
    author_followers: int
    timestamp: datetime
    likes: int
    retweets: int
    replies: int
    url: str
    hashtags: List[str]
    mentions: List[str]
    is_verified: bool

@dataclass
class TweetAnalysis:
    relevance_score: float
    category: str
    sentiment: str
    keywords_matched: List[str]
    importance_level: str
    summary: str

@dataclass
class CompanyTwitterReport:
    company_name: str
    total_tweets: int
    tweets: List[Tweet]
    analyses: List[TweetAnalysis]
    summary_stats: Dict[str, Any]
    sentiment_breakdown: Dict[str, int]
    category_breakdown: Dict[str, int]
    top_keywords: List[str]

class CompanyTwitterAnalyzer:
    
    def __init__(self):
        self.vc_keywords = {
            'revenue': ['revenue', 'sales', 'income', 'earnings', 'profit', 'growth', 'ARR', 'MRR', 'customers', 'subscription'],
            'funding': ['funding', 'investment', 'round', 'raised', 'capital', 'investor', 'valuation', 'IPO', 'acquisition', 'merger'],
            'product': ['product', 'launch', 'feature', 'update', 'release', 'beta', 'platform', 'technology', 'innovation'],
            'partnership': ['partnership', 'collaboration', 'alliance', 'deal', 'contract', 'agreement', 'integration'],
            'hiring': ['hiring', 'recruiting', 'team', 'joined', 'executive', 'CEO', 'CTO', 'CFO', 'VP', 'director'],
            'market': ['market', 'industry', 'competition', 'sector', 'expansion', 'international', 'global'],
            'awards': ['award', 'recognition', 'winner', 'best', 'top', 'leading', 'excellence', 'achievement'],
            'negative': ['lawsuit', 'investigation', 'scandal', 'controversy', 'layoffs', 'closure', 'bankruptcy', 'fraud']
        }
        
        self.high_value_accounts = [
            'techcrunch', 'venturebeat', 'theinformation', 'axios', 'bloomberg', 'reuters',
            'wsj', 'nytimes', 'ft', 'forbes', 'businessinsider', 'cnbc',
            'a16z', 'sequoia', 'gv', 'accel', 'founderfund', 'bessemervp'
        ]

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

    def scrape_company_tweets(self, company_name: str, days_back: int = 7, max_tweets: int = 100) -> List[Tweet]:
        tweets = []
        if not SNSCRAPE_AVAILABLE:
            logger.error("snscrape not available - install with: pip install snscrape")
            return tweets
            
        queries = [
            f'"{company_name}"',
            f'{company_name} funding',
            f'{company_name} revenue'
        ]
        
        end_date = datetime.now()
        start_date = end_date - timedelta(days=days_back)
        
        for query in queries[:2]:
            search_query = f'{query} since:{start_date.strftime("%Y-%m-%d")} until:{end_date.strftime("%Y-%m-%d")}'
            
            try:
                tweet_count = 0
                for tweet in sntwitter.TwitterSearchScraper(search_query).get_items():
                    if tweet_count >= max_tweets // len(queries):
                        break
                    
                    tweet_obj = Tweet(
                        id=str(tweet.id),
                        text=tweet.rawContent,
                        author=tweet.user.username,
                        author_followers=tweet.user.followersCount or 0,
                        timestamp=tweet.date,
                        likes=tweet.likeCount or 0,
                        retweets=tweet.retweetCount or 0,
                        replies=tweet.replyCount or 0,
                        url=tweet.url,
                        hashtags=tweet.hashtags or [],
                        mentions=[mention.username for mention in (tweet.mentionedUsers or [])],
                        is_verified=tweet.user.verified or False
                    )
                    
                    tweets.append(tweet_obj)
                    tweet_count += 1
                    
            except Exception as e:
                logger.error(f"Error scraping with query '{query}': {e}")
                continue
        
        logger.info(f"Scraped {len(tweets)} tweets for {company_name}")
        return tweets

    def analyze_tweet(self, tweet: Tweet, company_name: str) -> TweetAnalysis:
        text_lower = tweet.text.lower()
        
        relevance_score = 0.0
        keywords_matched = []
        
        if company_name.lower() in text_lower:
            relevance_score += 2.0
        
        category_scores = {}
        for category, keywords in self.vc_keywords.items():
            category_score = 0
            for keyword in keywords:
                if keyword.lower() in text_lower:
                    category_score += 1
                    keywords_matched.append(keyword)
                    relevance_score += 1.0 if category != 'negative' else -0.5
            category_scores[category] = category_score
        
        primary_category = max(category_scores.items(), key=lambda x: x[1])[0] if any(category_scores.values()) else 'general'
        
        if tweet.author.lower() in self.high_value_accounts:
            relevance_score += 3.0
        
        if tweet.is_verified:
            relevance_score += 1.0
        
        engagement_score = (tweet.likes + tweet.retweets * 2 + tweet.replies) / max(tweet.author_followers, 1) * 1000
        relevance_score += min(engagement_score, 2.0)
        
        if relevance_score >= 5.0:
            importance_level = 'high'
        elif relevance_score >= 2.0:
            importance_level = 'medium'
        else:
            importance_level = 'low'
        
        positive_words = ['good', 'great', 'excellent', 'amazing', 'successful', 'growth', 'wins', 'positive', 'bullish']
        negative_words = ['bad', 'terrible', 'awful', 'failed', 'struggling', 'concerning', 'negative', 'bearish']
        
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count > negative_count:
            sentiment = 'positive'
        elif negative_count > positive_count:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        author_desc = "verified account" if tweet.is_verified else "account"
        if tweet.author.lower() in self.high_value_accounts:
            author_desc = "high-profile " + author_desc
        
        engagement = tweet.likes + tweet.retweets + tweet.replies
        summary = f"{primary_category.title()} mention by {author_desc} @{tweet.author} ({engagement} total engagement) - {sentiment} sentiment"
        
        return TweetAnalysis(
            relevance_score=round(relevance_score, 2),
            category=primary_category,
            sentiment=sentiment,
            keywords_matched=list(set(keywords_matched)),
            importance_level=importance_level,
            summary=summary
        )

    def generate_company_report(self, company_name: str, days_back: int = 7, max_tweets: int = 100) -> CompanyTwitterReport:
        logger.info(f"Generating Twitter report for {company_name}")
        
        tweets = self.scrape_company_tweets(company_name, days_back, max_tweets)
        
        analyses = []
        for tweet in tweets:
            analysis = self.analyze_tweet(tweet, company_name)
            analyses.append(analysis)
        
        combined = list(zip(tweets, analyses))
        combined.sort(key=lambda x: x[1].relevance_score, reverse=True)
        tweets, analyses = zip(*combined) if combined else ([], [])
        
        if analyses:
            sentiment_breakdown = {
                'positive': sum(1 for a in analyses if a.sentiment == 'positive'),
                'negative': sum(1 for a in analyses if a.sentiment == 'negative'),
                'neutral': sum(1 for a in analyses if a.sentiment == 'neutral')
            }
            
            category_breakdown = {}
            for analysis in analyses:
                category_breakdown[analysis.category] = category_breakdown.get(analysis.category, 0) + 1
            
            all_keywords = []
            for analysis in analyses:
                all_keywords.extend(analysis.keywords_matched)
            
            top_keywords = [item[0] for item in pd.Series(all_keywords).value_counts().head(10).items()] if all_keywords else []
            
            avg_relevance = sum(a.relevance_score for a in analyses) / len(analyses)
            high_importance_count = sum(1 for a in analyses if a.importance_level == 'high')
            
            summary_stats = {
                'average_relevance_score': round(avg_relevance, 2),
                'high_importance_tweets': high_importance_count,
                'total_engagement': sum(t.likes + t.retweets + t.replies for t in tweets),
                'verified_authors': sum(1 for t in tweets if t.is_verified),
                'avg_author_followers': round(sum(t.author_followers for t in tweets) / len(tweets)) if tweets else 0
            }
        else:
            sentiment_breakdown = {'positive': 0, 'negative': 0, 'neutral': 0}
            category_breakdown = {}
            top_keywords = []
            summary_stats = {
                'average_relevance_score': 0,
                'high_importance_tweets': 0,
                'total_engagement': 0,
                'verified_authors': 0,
                'avg_author_followers': 0
            }
        
        return CompanyTwitterReport(
            company_name=company_name,
            total_tweets=len(tweets),
            tweets=list(tweets),
            analyses=list(analyses),
            summary_stats=summary_stats,
            sentiment_breakdown=sentiment_breakdown,
            category_breakdown=category_breakdown,
            top_keywords=top_keywords
        )

class VCPortfolioScraper:
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        })

    def scrape_vc_site(self, vc_url: str) -> List[str]:
        companies = []
        
        try:
            response = self.session.get(vc_url, timeout=15)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            if "necessary.vc" in vc_url:
                companies = self._scrape_necessary_vc(soup)
            elif "a16z.com" in vc_url:
                companies = self._scrape_a16z(soup)
            elif "sequoiacap.com" in vc_url:
                companies = self._scrape_sequoia(soup)
            elif "gv.com" in vc_url:
                companies = self._scrape_gv(soup)
            else:
                companies = self._scrape_generic_vc(soup, vc_url)
            
            logger.info(f"Found {len(companies)} companies from {vc_url}: {companies}")
            
        except Exception as e:
            logger.error(f"Error scraping {vc_url}: {e}")
        
        return companies
    
    def _scrape_necessary_vc(self, soup) -> List[str]:
        companies = []
        text_content = soup.get_text()
        potential_companies = re.findall(r'\b[A-Z][a-zA-Z\s&.-]{2,30}\b', text_content)
        
        exclude_words = {
            'necessary', 'ventures', 'capital', 'portfolio', 'investment', 'fund', 
            'about', 'team', 'contact', 'invest', 'company', 'companies', 'startup',
            'startups', 'technology', 'innovation', 'venture', 'business', 'growth',
            'early', 'stage', 'seed', 'series', 'round', 'equity', 'partners',
            'management', 'leadership', 'founder', 'founders', 'ceo', 'board',
            'advisory', 'experience', 'careers', 'join', 'work', 'opportunity',
            'news', 'blog', 'press', 'media', 'events', 'newsletter', 'subscribe',
            'follow', 'twitter', 'linkedin', 'facebook', 'instagram', 'social',
            'privacy', 'terms', 'cookies', 'legal', 'disclaimer', 'copyright',
            'rights', 'reserved', 'policy', 'statement', 'notice'
        }
        
        for company in potential_companies:
            company_clean = company.strip()
            if (3 <= len(company_clean) <= 30 and 
                not any(exclude in company_clean.lower() for exclude in exclude_words) and
                not company_clean.isupper() and
                not company_clean.islower() and
                company_clean not in companies):
                companies.append(company_clean)
        
        return companies[:15]

    def _scrape_a16z(self, soup) -> List[str]:
        companies = []
        company_elements = soup.find_all(['h2', 'h3', 'h4'], class_=re.compile(r'company|portfolio'))
        
        for elem in company_elements:
            name = elem.get_text().strip()
            if 2 < len(name) < 50 and name not in companies:
                companies.append(name)
        
        if not companies:
            links = soup.find_all('a', href=True)
            for link in links:
                text = link.get_text().strip()
                if (text and 2 < len(text) < 50 and 
                    not any(word in text.lower() for word in ['portfolio', 'about', 'team', 'news'])):
                    companies.append(text)
        
        return companies[:20]
    
    def _scrape_sequoia(self, soup) -> List[str]:
        companies = []
        company_divs = soup.find_all('div', class_=re.compile(r'company|portfolio|investment'))
        
        for div in company_divs:
            name_elem = div.find(['h1', 'h2', 'h3', 'h4', 'span'])
            if name_elem:
                name = name_elem.get_text().strip()
                if 2 < len(name) < 50 and name not in companies:
                    companies.append(name)
        
        return companies[:20]

    def _scrape_gv(self, soup) -> List[str]:
        companies = []
        portfolio_items = soup.find_all(['div', 'li'], class_=re.compile(r'portfolio|company'))
        
        for item in portfolio_items:
            text = item.get_text().strip()
            if 2 < len(text) < 50 and text not in companies:
                companies.append(text)
        
        return companies[:20]
    
    def _scrape_generic_vc(self, soup, url) -> List[str]:
        companies = []
        
        portfolio_sections = soup.find_all(['section', 'div'], class_=re.compile(r'portfolio|companies|investments'))
        
        for section in portfolio_sections:
            company_elements = section.find_all(['h1', 'h2', 'h3', 'h4', 'li', 'span'])
            for elem in company_elements:
                text = elem.get_text().strip()
                if (2 < len(text) < 50 and 
                    text not in companies and
                    not any(word in text.lower() for word in ['portfolio', 'about', 'team', 'contact'])):
                    companies.append(text)
        
        if not companies:
            all_text = soup.get_text()
            potential_companies = re.findall(r'\b[A-Z][a-zA-Z\s&.-]{2,40}\b', all_text)
            
            for company in potential_companies:
                if (company not in companies and 
                    len(company) > 2 and 
                    not any(word in company.lower() for word in ['ventures', 'capital', 'fund', 'partners'])):
                    companies.append(company)
        
        return companies[:15]

    def scrape_multiple_vcs(self, vc_urls: List[str]) -> List[str]:
        all_companies = []
        
        for url in vc_urls:
            companies = self.scrape_vc_site(url)
            all_companies.extend(companies)
        
        unique_companies = list(dict.fromkeys(all_companies))
        return unique_companies
