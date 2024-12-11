import axios from "axios";

const API_KEY = "28057d2b3b08471dbdf5ad97ef811c01"; // Replace with your News API key
const BASE_URL = "https://newsapi.org/v2/";

export const fetchNews = async ({ query = "general", from, to, pageSize = 100, sortBy = "publishedAt" }) => {
  try {
    const response = await axios.get(`${BASE_URL}everything`, {
      params: {
        q: query,       // Keyword search
        from,           // Filter by start date
        to,             // Filter by end date
        sortBy,         // Sorting (e.g., publishedAt, relevancy)
        pageSize,       // Number of articles to fetch
        apiKey: API_KEY // News API key
      },
    });
    return response.data.articles; // Return articles
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
