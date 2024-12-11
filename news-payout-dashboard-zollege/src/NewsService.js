import axios from "axios";

const API_KEY = "28057d2b3b08471dbdf5ad97ef811c01"; // Replace with your News API key
const BASE_URL = "https://newsapi.org/v2/";

export const fetchNews = async (query = "general", pageSize = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}everything`, {
      params: {
        q: query,
        pageSize,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
