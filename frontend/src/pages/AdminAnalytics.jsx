import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
  Alert,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  ArrowBack as ArrowBackIcon,
  Analytics as AnalyticsIcon,
} from "@mui/icons-material";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../utils/getUserDetails";
import axiosInstance from "../api/axiosInstance";

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const userDetails = getUserDetails();
  const [feedSources, setFeedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState({
    feedsOverTime: [],
    propertiesDistribution: [],
    userEngagement: [],
    activityTimeline: [],
  });

  const fetchFeedSources = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/feed/current");
      setFeedSources(response.data);
      processChartData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching feed sources:", err);
      setError("Failed to load feed sources");
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (sources) => {
    // 1. Feed Sources Over Time - Line chart
    const feedsOverTime = sources
      .map((source) => ({
        date: new Date(source.createdAt),
        name: source.name,
      }))
      .sort((a, b) => a.date - b.date);

    // Group by month and count cumulative feeds
    const monthlyData = {};
    let cumulativeCount = 0;

    feedsOverTime.forEach((feed) => {
      const monthKey = feed.date.toISOString().slice(0, 7); // YYYY-MM format
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { count: 0, feeds: [] };
      }
      monthlyData[monthKey].count++;
      monthlyData[monthKey].feeds.push(feed.name);
    });

    const sortedMonths = Object.keys(monthlyData).sort();
    const feedsOverTimeChart = sortedMonths.map((month) => {
      cumulativeCount += monthlyData[month].count;
      return {
        month,
        totalFeeds: cumulativeCount,
        newFeeds: monthlyData[month].count,
        feedNames: monthlyData[month].feeds,
      };
    });

    // 2. Properties Distribution - Pie chart
    const propertyCount = {};
    sources.forEach((source) => {
      source.properties?.forEach((prop) => {
        propertyCount[prop] = (propertyCount[prop] || 0) + 1;
      });
    });

    const propertiesDistribution = Object.entries(propertyCount).map(
      ([name, value]) => ({
        label: name,
        value,
        percentage: ((value / sources.length) * 100).toFixed(1),
      })
    );

    // 3. User Engagement - Bar chart
    const userEngagement = sources
      .map((source) => ({
        name:
          source.name.length > 15
            ? source.name.substring(0, 15) + "..."
            : source.name,
        fullName: source.name,
        favorites: source.favouritedBy?.length || 0,
        isFavourite: source.favourite,
        createdAt: source.createdAt,
      }))
      .sort((a, b) => b.favorites - a.favorites)
      .slice(0, 10); // Top 10 most favorited

    // 4. Activity Timeline - Timeline chart showing daily activity
    const activityByDay = {};
    sources.forEach((source) => {
      const dayKey = new Date(source.createdAt).toISOString().slice(0, 10); // YYYY-MM-DD
      if (!activityByDay[dayKey]) {
        activityByDay[dayKey] = { additions: 0, feeds: [] };
      }
      activityByDay[dayKey].additions++;
      activityByDay[dayKey].feeds.push(source.name);
    });

    const last30Days = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayKey = date.toISOString().slice(0, 10);
      last30Days.push({
        date: dayKey,
        additions: activityByDay[dayKey]?.additions || 0,
        feeds: activityByDay[dayKey]?.feeds || [],
      });
    }

    setChartData({
      feedsOverTime: feedsOverTimeChart,
      propertiesDistribution,
      userEngagement,
      activityTimeline: last30Days,
    });
  };

  useEffect(() => {
    fetchFeedSources();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = () => {
    fetchFeedSources();
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Stack direction="column" spacing={3} sx={{ p: 3 }}>
      {/* Header */}
      <Box>
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          <IconButton onClick={() => navigate("/admin")} color="primary">
            <ArrowBackIcon />
          </IconButton>
          <AnalyticsIcon color="primary" sx={{ fontSize: 32 }} />
          <Box>
            <Typography variant="h2" gutterBottom>
              Analytics Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Welcome {userDetails.role}, {userDetails.name} |{" "}
              {userDetails.email}
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            variant="outlined"
            disabled={loading}
          >
            Refresh Data
          </Button>
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date().toLocaleString()}
          </Typography>
        </Stack>
      </Box>

      <Divider />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" color="primary.main" gutterBottom>
              {feedSources.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Feed Sources
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" color="success.main" gutterBottom>
              {feedSources.filter((s) => s.favourite).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Favorited Sources
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" color="warning.main" gutterBottom>
              {feedSources.reduce(
                (acc, s) => acc + (s.favouritedBy?.length || 0),
                0
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total User Favorites
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" color="info.main" gutterBottom>
              {new Set(feedSources.flatMap((s) => s.properties || [])).size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Unique Properties
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Feed Sources Over Time - Line Chart */}
        <Grid item xs={12} lg={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📈 Feed Sources Over Time
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Cumulative growth of feed sources by month
              </Typography>
              <Plot
                data={[
                  {
                    x: chartData.feedsOverTime.map((d) => d.month),
                    y: chartData.feedsOverTime.map((d) => d.totalFeeds),
                    type: "scatter",
                    mode: "lines+markers",
                    name: "Total Feeds",
                    line: { color: "#1976d2", width: 3 },
                    marker: { size: 8, color: "#1976d2" },
                    hovertemplate:
                      "<b>%{x}</b><br>" +
                      "Total Feeds: %{y}<br>" +
                      "<extra></extra>",
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 40, r: 40, t: 40, b: 40 },
                  xaxis: { title: "Month" },
                  yaxis: { title: "Number of Feed Sources" },
                  showlegend: false,
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false, responsive: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Properties Distribution - Pie Chart */}
        <Grid item xs={12} lg={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                🥧 Properties Distribution
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Most commonly used feed properties
              </Typography>
              <Plot
                data={[
                  {
                    values: chartData.propertiesDistribution.map(
                      (d) => d.value
                    ),
                    labels: chartData.propertiesDistribution.map(
                      (d) => d.label
                    ),
                    type: "pie",
                    textinfo: "label+percent",
                    textposition: "outside",
                    hovertemplate:
                      "<b>%{label}</b><br>" +
                      "Count: %{value}<br>" +
                      "Percentage: %{percent}<br>" +
                      "<extra></extra>",
                    marker: {
                      colors: [
                        "#1976d2",
                        "#dc004e",
                        "#ff9800",
                        "#4caf50",
                        "#9c27b0",
                        "#00bcd4",
                        "#ff5722",
                        "#795548",
                      ],
                    },
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 40, r: 40, t: 40, b: 40 },
                  showlegend: true,
                  legend: { orientation: "v", x: 1.05, y: 0.5 },
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false, responsive: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* User Engagement - Bar Chart */}
        <Grid item xs={12} lg={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📊 User Engagement
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Top 10 most favorited feed sources
              </Typography>
              <Plot
                data={[
                  {
                    x: chartData.userEngagement.map((d) => d.favorites),
                    y: chartData.userEngagement.map((d) => d.name),
                    type: "bar",
                    orientation: "h",
                    marker: {
                      color: chartData.userEngagement.map((d) =>
                        d.isFavourite ? "#4caf50" : "#1976d2"
                      ),
                    },
                    hovertemplate:
                      "<b>%{customdata}</b><br>" +
                      "Favorites: %{x}<br>" +
                      "<extra></extra>",
                    customdata: chartData.userEngagement.map((d) => d.fullName),
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 100, r: 40, t: 40, b: 40 },
                  xaxis: { title: "Number of Favorites" },
                  yaxis: { title: "" },
                  showlegend: false,
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false, responsive: true }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Activity Timeline - Timeline Chart */}
        <Grid item xs={12} lg={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                📅 Activity Timeline (Last 30 Days)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Daily feed source additions
              </Typography>
              <Plot
                data={[
                  {
                    x: chartData.activityTimeline.map((d) => d.date),
                    y: chartData.activityTimeline.map((d) => d.additions),
                    type: "bar",
                    name: "Feed Additions",
                    marker: {
                      color: chartData.activityTimeline.map((d) =>
                        d.additions > 0 ? "#4caf50" : "#f5f5f5"
                      ),
                    },
                    hovertemplate:
                      "<b>%{x}</b><br>" +
                      "Additions: %{y}<br>" +
                      "%{customdata}<br>" +
                      "<extra></extra>",
                    customdata: chartData.activityTimeline.map((d) =>
                      d.feeds.length > 0
                        ? `Feeds: ${d.feeds.join(", ")}`
                        : "No activity"
                    ),
                  },
                ]}
                layout={{
                  autosize: true,
                  margin: { l: 40, r: 40, t: 40, b: 80 },
                  xaxis: {
                    title: "Date",
                    tickangle: -45,
                  },
                  yaxis: { title: "Number of Additions" },
                  showlegend: false,
                  plot_bgcolor: "rgba(0,0,0,0)",
                  paper_bgcolor: "rgba(0,0,0,0)",
                }}
                style={{ width: "100%", height: "300px" }}
                config={{ displayModeBar: false, responsive: true }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Insights */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📈 Key Insights
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Growth Trend
                </Typography>
                <Typography variant="body2">
                  {chartData.feedsOverTime.length > 0 && (
                    <>
                      Most recent month added{" "}
                      <strong>
                        {chartData.feedsOverTime[
                          chartData.feedsOverTime.length - 1
                        ]?.newFeeds || 0}
                      </strong>{" "}
                      new feed sources.
                    </>
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="h6" color="primary" gutterBottom>
                  Popular Properties
                </Typography>
                <Typography variant="body2">
                  {chartData.propertiesDistribution.length > 0 && (
                    <>
                      Most used property:{" "}
                      <strong>
                        {chartData.propertiesDistribution[0]?.label}
                      </strong>{" "}
                      ({chartData.propertiesDistribution[0]?.percentage}% of
                      feeds)
                    </>
                  )}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminAnalytics;
