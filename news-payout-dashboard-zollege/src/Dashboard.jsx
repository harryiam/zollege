import React, { useState, useEffect } from "react";
import { fetchNews } from "./NewsService"; // Import fetchNews from NewsService.js
import { Container, Typography, Box, Card, CardContent, Button } from "@mui/material";

const Dashboard = ({ user, onLogout }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const fetchedArticles = await fetchNews("technology", 5); // Fetch 5 articles related to technology
      setArticles(fetchedArticles);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const payoutRate = 5; // $5 per article
  const totalPayout = articles.length * payoutRate;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Welcome, {user.email}
      </Typography>
      
      <Button variant="outlined" color="secondary" fullWidth onClick={onLogout}>
        Logout
      </Button>

      <Typography variant="h5" align="center" sx={{ mt: 3 }}>
        Total Articles: {articles.length}
      </Typography>
      <Typography variant="h6" align="center" sx={{ mt: 2 }}>
        Total Payout: ${totalPayout}
      </Typography>

      {loading ? (
        <Typography variant="h6" align="center">
          Loading articles...
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 3,
            mt: 3
          }}
        >
          {articles.map((article, index) => (
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
