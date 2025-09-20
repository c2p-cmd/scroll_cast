import express from "express";
import rss from "../../utils/rss.js";
import db from "../../utils/db.js";

const makeFeed = rss.makeFeed;

const publicFeedRouter = express.Router();

publicFeedRouter.get("/current", async (req, res) => {
  const feedSources = await db.feedSource.findMany({
    include: {
      favouritedBy: true,
    },
  });
  // console.log(feedSources.map((a) => a.favouritedBy), req.user.userId);
  if (req.user.role !== "Admin") {
    const sources = feedSources.map((source) => ({
      id: source.id,
      name: source.name,
      properties: source.properties,
      createdAt: source.createdAt,
      favourite: source.favouritedBy.some((user) => user.id === req.user.userId),
    }));
    sources.sort((a, b) => b.favourite - a.favourite);
    return res.json(sources);
  }
  const sources = feedSources.map((source) => ({
    ...source,
    favourite: source.favouritedBy.some((user) => user.id === req.user.userId),
  }));
  sources.sort((a, b) => b.favourite - a.favourite);
  return res.json(sources);
});

publicFeedRouter.get("/view", async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  const idTrimmed = parseInt(id.trim(), 10);
  const feedSource = await db.feedSource.findUnique({
    where: { id: idTrimmed },
  });
  if (!feedSource) {
    return res.status(404).json({ error: "Feed source not found" });
  }
  const feed = await makeFeed(feedSource.link);
  if (!feed) {
    return res.status(500).json({ error: "Failed to generate feed" });
  }
  const keysToSelect = feedSource.properties;
  return res.json(
    feed.items.map((item) => {
      const filteredItem = {};
      keysToSelect.forEach((key) => {
        if (item[key]) {
          filteredItem[key] = item[key];
        }
      });
      return filteredItem;
    })
  );
});

export default publicFeedRouter;
