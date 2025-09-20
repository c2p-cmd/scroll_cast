import React, { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as PreviewIcon,
  ExpandMore as ExpandMoreIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { getUserDetails } from "../utils/getUserDetails";
import axiosInstance from "../api/axiosInstance";

const AdminDashboard = () => {
  const userDetails = getUserDetails();
  const [feedSources, setFeedSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewDialog, setPreviewDialog] = useState({
    open: false,
    loading: false,
    data: null,
    error: null,
    feedUrl: "",
  });

  const fetchFeedSources = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/feed/current");
      setFeedSources(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching feed sources:", err);
      setError("Failed to load feed sources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedSources();
  }, []);

  const handleRefresh = () => {
    fetchFeedSources();
  };

  const handlePreview = async (feedUrl) => {
    setPreviewDialog({
      open: true,
      loading: true,
      data: null,
      error: null,
      feedUrl,
    });

    try {
      const response = await axiosInstance.get(
        `/admin/feed/preview?link=${encodeURIComponent(feedUrl)}`
      );
      setPreviewDialog((prev) => ({
        ...prev,
        loading: false,
        data: response.data,
        error: null,
      }));
    } catch (err) {
      console.error("Error fetching feed preview:", err);
      setPreviewDialog((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load feed preview",
      }));
    }
  };

  const handleClosePreview = () => {
    setPreviewDialog({
      open: false,
      loading: false,
      data: null,
      error: null,
      feedUrl: "",
    });
  };

  const handleDelete = async (feedId) => {
    if (window.confirm("Are you sure you want to delete this feed source?")) {
      try {
        await axiosInstance.delete(`/admin/feed/current?feed_id=${feedId}`);
        // Refresh the list after deletion
        fetchFeedSources();
      } catch (err) {
        console.error("Error deleting feed source:", err);
        setError("Failed to delete feed source");
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Stack direction={"column"} spacing={3} sx={{ p: 3 }}>
        {/* Admin Header */}
        <Box>
          <Typography variant="h2" gutterBottom>
            Hello {userDetails.role}, {userDetails.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {userDetails.email}
          </Typography>
        </Box>

        <Divider />

        {/* Feed Sources Section */}
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h4">Feed Sources Management</Typography>
            <Button
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              variant="outlined"
              disabled={loading}
            >
              Refresh
            </Button>
          </Stack>

          {loading && (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <Stack spacing={2}>
              {feedSources.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  No feed sources found.
                </Typography>
              ) : (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Total feed sources: {feedSources.length}
                  </Typography>
                  {feedSources.map((source) => (
                    <Card key={source.id} variant="outlined">
                      <CardContent>
                        <Stack spacing={2}>
                          {/* Source Header with Actions */}
                          <Box>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="flex-start"
                            >
                              <Box flex={1}>
                                <Typography variant="h6" component="h3">
                                  {source.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ mt: 1 }}
                                >
                                  ID: {source.id} | Created by User:{" "}
                                  {source.createdBy}
                                </Typography>
                              </Box>
                              <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                              >
                                <Chip
                                  label={
                                    source.favourite
                                      ? "Favourited"
                                      : "Not Favourited"
                                  }
                                  color={
                                    source.favourite ? "success" : "default"
                                  }
                                  size="small"
                                />
                                <Tooltip title="Preview Feed">
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => handlePreview(source.link)}
                                  >
                                    <PreviewIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Feed">
                                  <IconButton
                                    size="small"
                                    color="error"
                                    onClick={() => handleDelete(source.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </Stack>
                          </Box>

                          {/* Source Link */}
                          <Box>
                            <Typography variant="subtitle2" color="primary">
                              Feed URL:
                            </Typography>
                            <Typography
                              variant="body2"
                              component="a"
                              href={source.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              sx={{
                                color: "primary.main",
                                textDecoration: "none",
                                wordBreak: "break-all",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              {source.link}
                            </Typography>
                          </Box>

                          {/* Properties */}
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Properties:
                            </Typography>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                              {source.properties &&
                              source.properties.length > 0 ? (
                                source.properties.map((property, index) => (
                                  <Chip
                                    key={index}
                                    label={property}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No properties defined
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          {/* Timestamps */}
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Created: {formatDate(source.createdAt)} | Updated:{" "}
                              {formatDate(source.updatedAt)}
                            </Typography>
                          </Box>

                          {/* Favourited By Users */}
                          {source.favouritedBy &&
                            source.favouritedBy.length > 0 && (
                              <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                  Favourited by ({source.favouritedBy.length}{" "}
                                  users):
                                </Typography>
                                <List dense>
                                  {source.favouritedBy.map((user) => (
                                    <ListItem key={user.id} sx={{ py: 0.5 }}>
                                      <ListItemText
                                        primary={`${user.name} (${user.role})`}
                                        secondary={`${user.email} | ID: ${user.id}`}
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            )}
                        </Stack>
                      </CardContent>
                    </Card>
                  ))}
                </>
              )}
            </Stack>
          )}
        </Box>

        {/* Feed Preview Dialog */}
        <Dialog
          open={previewDialog.open}
          onClose={handleClosePreview}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Feed Preview</Typography>
              <IconButton onClick={handleClosePreview}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {previewDialog.loading && (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            )}

            {previewDialog.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {previewDialog.error}
              </Alert>
            )}

            {previewDialog.data && (
              <Stack spacing={3}>
                {/* Feed Info */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Feed Information
                    </Typography>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Title:
                        </Typography>
                        <Typography variant="body2">
                          {previewDialog.data.feedTitle || "No title"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Link:
                        </Typography>
                        <Typography
                          variant="body2"
                          component="a"
                          href={previewDialog.data.feedLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "primary.main",
                            textDecoration: "none",
                            wordBreak: "break-all",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          {previewDialog.data.feedLink || "No link"}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          Source URL:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {previewDialog.feedUrl}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Available Keys */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Available Properties
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      These are the properties you can select when creating a
                      feed source:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {previewDialog.data.availableKeys?.map((key, index) => (
                        <Chip
                          key={index}
                          label={key}
                          size="small"
                          variant="outlined"
                          color="primary"
                        />
                      )) || (
                        <Typography variant="body2" color="text.secondary">
                          No properties available
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                {/* Sample Items */}
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Sample Feed Items ({previewDialog.data.items?.length || 0}{" "}
                      items)
                    </Typography>
                    {previewDialog.data.items &&
                    previewDialog.data.items.length > 0 ? (
                      <Stack spacing={2}>
                        {previewDialog.data.items
                          .slice(0, 3)
                          .map((item, index) => (
                            <Accordion key={index}>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle2">
                                  {item.title || `Item ${index + 1}`}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Stack spacing={1}>
                                  {Object.entries(item).map(([key, value]) => (
                                    <Box key={key}>
                                      <Typography
                                        variant="caption"
                                        color="primary"
                                        sx={{ fontWeight: "bold" }}
                                      >
                                        {key}:
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        sx={{ ml: 1, wordBreak: "break-word" }}
                                      >
                                        {value || "(empty)"}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Stack>
                              </AccordionDetails>
                            </Accordion>
                          ))}
                        {previewDialog.data.items.length > 3 && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            ... and {previewDialog.data.items.length - 3} more
                            items
                          </Typography>
                        )}
                      </Stack>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No items found in feed
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePreview}>Close</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};

export default AdminDashboard;
