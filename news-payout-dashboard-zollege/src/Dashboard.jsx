import React, { useState, useEffect, useCallback } from "react";
import { fetchNews } from "./NewsService";
import {
  Container,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import debounce from "lodash/debounce"; // Install lodash for debouncing: npm install lodash

const Dashboard = () => {
  const [articles, setArticles] = useState([]); // All fetched articles
  const [filteredArticles, setFilteredArticles] = useState([]); // Articles after applying author filter
  const [loading, setLoading] = useState(false);

  // Filters
  const [query, setQuery] = useState("tesla");
  const [from, setFrom] = useState(""); // Start date
  const [to, setTo] = useState("");   // End date
  const [authorFilter, setAuthorFilter] = useState(""); // Local filter for author

  const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format

  // Debounced function for fetching articles
  const debouncedFetch = useCallback(
    debounce((query, from, to) => {
      fetchFilteredNews(query, from, to);
    }, 500),
    []
  );

  // Fetch articles when query, from, or to changes
  useEffect(() => {
    debouncedFetch(query, from, to);
  }, [query, from, to, debouncedFetch]);

  // Apply author filter locally
  useEffect(() => {
    if (authorFilter) {
      const filtered = articles.filter((article) =>
        article.author?.toLowerCase().includes(authorFilter.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles); // Reset to all articles when authorFilter is cleared
    }
  }, [authorFilter, articles]);

  const fetchFilteredNews = async (query, from, to) => {
    setLoading(true);
    const fetchedArticles = await fetchNews({ query, from, to });
    setArticles(fetchedArticles); // Update the articles
    setFilteredArticles(fetchedArticles); // Reset filteredArticles after a new fetch
    setLoading(false);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        News Dashboard
      </Typography>

      {/* Logout Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="outlined" color="secondary" onClick={() => alert("Logout function")}>
          Logout
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        {/* Global Search */}
        <TextField
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />

        {/* Date Range */}
        <TextField
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          InputProps={{
            inputProps: {
              max: to ? to : today, // Ensure "from" is never later than "to"
            },
          }}
        />
        <TextField
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={to}
          onChange={(e) => setTo(e.target.value)}
          InputProps={{
            inputProps: {
              min: from ? from : "", // Ensure "to" is never earlier than "from"
              max: today, // Prevent selecting future dates
            },
          }}
        />

        {/* Author Filter */}
        <TextField
          label="Filter by Author"
          variant="outlined"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
          fullWidth
        />
      </Box>

      {/* Fetch News Button */}
      <Button variant="contained" onClick={() => fetchFilteredNews(query, from, to)}>
        Fetch News
      </Button>

      {/* Articles */}
      {loading ? (
        <Typography align="center">Loading articles...</Typography>
      ) : (
        <Box
          sx={{
            mt: 3,
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {filteredArticles.map((article, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2">{article.author || "Unknown"}</Typography>
                <Typography variant="body2">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
                <Typography>{article.description || "No description available"}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;




