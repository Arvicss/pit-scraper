# Formula 1 Web Scraping Tool

This project is a web scraping tool designed to fetch Formula 1 race results from the official Formula 1 website (formula1.com). The tool scrapes the race results, including details for each Grand Prix and session, for a given year. The core function, `.getChampionshipResultByYear(year)`, allows users to retrieve the full list of results for any specified season.

## Features
- Scrapes race results from Formula 1's official website.
- Retrieves full race results including every Grand Prix and session (e.g., qualifying, race).
- Allows input of a specific year to fetch results for that season.

Here’s an improved version of your installation message with clearer instructions and consistent formatting:

---

## Installation

To install and use this tool, you can either install it directly from npm or clone the repository and set it up manually.

### Option 1: Install via npm

Run the following command to install the tool via npm:

```bash
npm install pit-scraper
```

### Option 2: Install from Source

```bash
git clone https://github.com/arvicss/pit-scraper.git

cd pit-scraper

pnpm install
```
---
## Dependencies

The following npm libraries are used in this project:

- **axios**: For making HTTP requests to fetch HTML data.
- **cheerio**: For parsing and scraping the HTML to extract relevant race information.
- **lodash**: For utility functions to simplify data manipulation.