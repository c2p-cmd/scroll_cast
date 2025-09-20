import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  Link,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";
import axiosInstance from "../api/axiosInstance";

// Sidebar Component
const Sidebar = ({
  sources,
  isLoadingSources,
  selectedSource,
  onSourceClick,
  isMobile,
  handleFavouriteToggle,
}) => (
  <Box sx={{ width: isMobile ? 250 : 280, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      My Sources
    </Typography>
    {isLoadingSources ? (
      <CircularProgress />
    ) : (
      <List>
        {sources.map((source) => (
          <ListItem
            key={source.id}
            disablePadding
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ListItemButton
              selected={selectedSource?.id === source.id}
              onClick={() => onSourceClick(source)}
              sx={{ flex: 1 }}
            >
              <ListItemText primary={source.name} />
            </ListItemButton>

            <IconButton
              onClick={() => {
                // console.log("Toggling favourite for source ID:", source.id, handleFavouriteToggle);
                handleFavouriteToggle({ id: source.id, isFavourite: source.favourite });
              }}
            >
              <StarIcon sx={{ color: source.favourite ? "yellow" : "white" }} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

// Mobile App Bar Component
const MobileAppBar = ({ selectedSource, onMenuToggle, theme }) => (
  <AppBar position="static" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onMenuToggle}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        {selectedSource ? selectedSource.name : "ScrollCast"}
      </Typography>
    </Toolbar>
  </AppBar>
);

// Article List Component
const ArticleList = ({
  selectedSource,
  sourceContent,
  onArticleClick,
  isMobile,
}) => (
  <>
    {!isMobile && (
      <Typography
        variant={isMobile ? "h5" : "h4"}
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
          lineHeight: 1.2,
        }}
      >
        {selectedSource.name}
      </Typography>
    )}
    <List sx={{ p: 0 }}>
      {sourceContent.map((item) => (
        <div key={item.title}>
          <ListItemButton
            alignItems="flex-start"
            onClick={() => onArticleClick(item)}
            sx={{
              px: { xs: 1, sm: 2 },
              py: { xs: 1.5, sm: 2 },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                      md: "1.1rem",
                    },
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Typography>
              }
              secondary={
                item.contentSnippet ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      mt: 0.5,
                      display: "-webkit-box",
                      WebkitLineClamp: { xs: 2, sm: 3 },
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.contentSnippet}
                  </Typography>
                ) : item.content ? (
                  <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.8rem", sm: "0.875rem" },
                      mt: 0.5,
                      "& *": {
                        fontSize: "inherit !important",
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ) : null
              }
            />
          </ListItemButton>
          <Divider />
        </div>
      ))}
    </List>
  </>
);

// Article Dialog Component
const ArticleDialog = ({ article, open, onClose, isMobile }) => (
  <Dialog
    open={open}
    onClose={onClose}
    scroll="paper"
    maxWidth={isMobile ? "xs" : "md"}
    fullWidth
    fullScreen={isMobile}
    sx={{
      "& .MuiDialog-paper": {
        margin: isMobile ? 0 : 2,
        maxHeight: isMobile ? "100%" : "calc(100% - 64px)",
      },
    }}
  >
    <DialogTitle
      sx={{
        fontSize: { xs: "1.1rem", sm: "1.25rem" },
        lineHeight: 1.3,
        pb: 2,
      }}
    >
      {article?.title}
    </DialogTitle>
    <DialogContent
      dividers
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 2 },
      }}
    >
      {article?.contentSnippet ? (
        <Typography
          variant="body1"
          paragraph
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
          }}
        >
          {article.contentSnippet}
        </Typography>
      ) : article?.content ? (
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontSize: { xs: "0.9rem", sm: "1rem" },
            lineHeight: 1.6,
            "& *": {
              fontSize: "inherit !important",
              lineHeight: "inherit !important",
            },
          }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      ) : (
        <></>
      )}
      {article?.link && (
        <Box sx={{ mt: 2 }}>
          <Link
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Read full article
          </Link>
          {!isMobile && (
            <Box sx={{ mt: 2, width: "100%", height: "400px" }}>
              <iframe
                src={article.link}
                title={article.title}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </Box>
          )}
        </Box>
      )}
      {article?.guid && (
        <Box sx={{ mt: 2 }}>
          <Link
            href={article.guid}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Read full article
          </Link>
          {!isMobile && (
            <Box sx={{ mt: 2, width: "100%", height: "400px" }}>
              <iframe
                src={article.guid}
                title={article.title}
                style={{
                  width: "100%",
                  height: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </Box>
          )}
        </Box>
      )}
    </DialogContent>
    <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
      <Button
        onClick={onClose}
        variant={isMobile ? "contained" : "text"}
        fullWidth={isMobile}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

// Empty State Component
const EmptyState = ({ isMobile }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50%",
      textAlign: "center",
    }}
  >
    <Typography variant={isMobile ? "body1" : "h6"} color="text.secondary">
      {isMobile
        ? "Tap the menu to select a source"
        : "Select a source to view its contents."}
    </Typography>
  </Box>
);

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  const [sources, setSources] = useState([]);
  const [isLoadingSources, setIsLoadingSources] = useState(true);

  // New state for selected source and its content
  const [selectedSource, setSelectedSource] = useState(null);
  const [sourceContent, setSourceContent] = useState([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axiosInstance.get("/feed/current", {
          cache: {
            maxAge: 60 * 60 * 1000,
          },
        });
        setSources(response.data);
      } catch (error) {
        console.error("Failed to fetch sources:", error);
      } finally {
        setIsLoadingSources(false);
      }
    };
    fetchSources();
  }, []);

  const handleFavouriteToggle = async ({ id, isFavourite }) => {
    setIsLoadingSources(true);
    try {
      console.log("Toggling favourite for source ID:", id, isFavourite);
      if (isFavourite) {
        await axiosInstance.delete(`/feed/favourite`, { 
          data: { feed_id: id } 
        });
      } else {
        await axiosInstance.post(`/feed/favourite`, { feed_id: id });
      }
      // Update local state to reflect the change
      setSources((prevSources) =>
        prevSources.map((source) =>
          source.id === id
            ? { ...source, favourite: !source.favourite }
            : source
        )
      );
    } catch (error) {
      console.error("Failed to toggle favourite:", error);
    } finally {
      setIsLoadingSources(false);
    }
  };

  // Function to handle clicking a source
  const handleSourceClick = async (source) => {
    setSelectedSource(source); // Set the selected source
    setSourceContent([]); // Clear previous content
    setIsLoadingContent(true); // Show loading spinner for content

    // Close mobile drawer when source is selected
    if (isMobile) {
      setMobileDrawerOpen(false);
    }

    try {
      const response = await axiosInstance.get(`/feed/view?id=${source.id}`, {
        cache: {
          maxAge: 60 * 60 * 1000,
        },
      });
      setSourceContent(response.data); // Store the new content
    } catch (error) {
      console.error("Failed to fetch source content:", error);
    } finally {
      setIsLoadingContent(false); // Hide loading spinner
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Mobile App Bar */}
      {isMobile && (
        <MobileAppBar
          selectedSource={selectedSource}
          onMenuToggle={handleDrawerToggle}
          theme={theme}
        />
      )}

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Box
            sx={{
              width: isTablet ? 240 : 280,
              flexShrink: 0,
              borderRight: 1,
              borderColor: "divider",
              overflow: "auto",
            }}
          >
            <Sidebar
              sources={sources}
              isLoadingSources={isLoadingSources}
              selectedSource={selectedSource}
              onSourceClick={handleSourceClick}
              isMobile={isMobile}
              handleFavouriteToggle={handleFavouriteToggle}
            />
          </Box>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better performance on mobile
            }}
            sx={{
              zIndex: theme.zIndex.drawer + 2,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 250,
                zIndex: theme.zIndex.drawer + 2,
              },
            }}
          >
            <Sidebar
              sources={sources}
              isLoadingSources={isLoadingSources}
              selectedSource={selectedSource}
              onSourceClick={handleSourceClick}
              isMobile={isMobile}
              handleFavouriteToggle={handleFavouriteToggle}
            />
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            overflowY: "auto",
            minHeight: 0,
          }}
        >
          {isLoadingContent ? (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
              <CircularProgress />
            </Box>
          ) : selectedSource ? (
            <ArticleList
              selectedSource={selectedSource}
              sourceContent={sourceContent}
              onArticleClick={handleArticleClick}
              isMobile={isMobile}
            />
          ) : (
            <EmptyState isMobile={isMobile} />
          )}
        </Box>
      </Box>

      {/* Article Dialog */}
      <ArticleDialog
        article={selectedArticle}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        isMobile={isMobile}
      />
    </Box>
  );
};

export default HomePage;
