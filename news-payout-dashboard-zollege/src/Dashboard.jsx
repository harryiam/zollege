import React, { useState, useEffect } from "react";
import { fetchNews } from "./NewsService"; // Your NewsService.js to fetch news
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

const Dashboard = ({ user, onLogout }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [authorFilter, setAuthorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState(""); // e.g., 'last 7 days'
  const [typeFilter, setTypeFilter] = useState("news"); // e.g., 'news', 'blogs'
  const [searchKeyword, setSearchKeyword] = useState("");
  const [payoutRate, setPayoutRate] = useState(5); // Default payout per article

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await fetchNews("technology", 10); // Fetch articles (10 articles)
      setArticles(fetchedArticles);
      setFilteredArticles(fetchedArticles);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [authorFilter, dateFilter, typeFilter, searchKeyword]);

  // Apply Filters based on state variables
  const applyFilters = () => {
    let filtered = articles;

    if (authorFilter) {
      filtered = filtered.filter((article) =>
        article.author?.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (searchKeyword) {
      filtered = filtered.filter((article) =>
        article.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (dateFilter) {
      const today = new Date();
      let dateLimit;
      if (dateFilter === "last 7 days") {
        dateLimit = new Date(today.setDate(today.getDate() - 7));
      } else if (dateFilter === "last 30 days") {
        dateLimit = new Date(today.setDate(today.getDate() - 30));
      }
      filtered = filtered.filter(
        (article) => new Date(article.publishedAt) >= dateLimit
      );
    }

    if (typeFilter) {
      filtered = filtered.filter((article) =>
        article.content?.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  // Calculate total payout
  const totalPayout = filteredArticles.length * payoutRate;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {user.email}
      </Typography>

      <Button variant="outlined" color="secondary" fullWidth onClick={onLogout}>
        Logout
      </Button>

      <Typography variant="h5" align="center" sx={{ mt: 3 }}>
        Total Articles: {filteredArticles.length}
      </Typography>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Total Payout: ${totalPayout}
      </Typography>

      {/* Global Search Bar */}
      <TextField
        label="Search Articles"
        variant="outlined"
        fullWidth
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">🔍</InputAdornment>
          ),
        }}
      />

      {/* Filter by Author */}
      <TextField
        label="Filter by Author"
        variant="outlined"
        fullWidth
        value={authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Filter by Date */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Date</InputLabel>
        <Select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          label="Filter by Date"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="last 7 days">Last 7 Days</MenuItem>
          <MenuItem value="last 30 days">Last 30 Days</MenuItem>
        </Select>
      </FormControl>

      {/* Filter by Type (News, Blogs) */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          label="Filter by Type"
        >
          <MenuItem value="news">News</MenuItem>
          <MenuItem value="blogs">Blogs</MenuItem>
        </Select>
      </FormControl>

      {/* Payout Rate */}
      <TextField
        label="Payout per Article ($)"
        variant="outlined"
        type="number"
        fullWidth
        value={payoutRate}
        onChange={(e) => setPayoutRate(Number(e.target.value))}
        sx={{ mb: 3 }}
      />

      {loading ? (
        <Typography variant="h6" align="center">
          Loading articles...
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 3,
            mt: 3,
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
                <Typography variant="body2" color="textSecondary">
                  {article.description || "No description available"}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;
