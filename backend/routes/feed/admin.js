import express from "express";
import rss from "../../utils/rss.js";
import db from "../../utils/db.js";

const makeFeed = rss.makeFeed;
const adminFeedRouter = express.Router();

adminFeedRouter.patch("/feed/current", async (req, res) => {
  const { name, link, properties, currentLink } = req.body;

  if (!currentLink) {
    return res.status(400).json({ error: "Current link is required" });
  }

  const currentData = await db.feedSource.findUnique({
    where: { link: currentLink },
  });

  if (!currentData) {
    return res.status(404).json({ error: "Feed source not found" });
  }

  const updatedData = {};
  if (properties) {
    updatedData.properties = properties;
  }
  if (name) {
    updatedData.name = name;
  }
  if (link) {
    updatedData.link = link;
  }

  const updatedFeedSource = await db.feedSource.update({
    where: { link: currentLink },
    data: updatedData,
  });
  return res.json(updatedFeedSource);
});

adminFeedRouter.post("/feed/current", async (req, res) => {
  try {
    const { name, link, properties } = req.body;
    // name has to be there
    if (!name) {
      return res.status(400).json({ error: "Feed source name is required" });
    }
    // link has to be url type
    if (!link || typeof link !== "string" || !link.startsWith("http")) {
      return res.status(400).json({ error: "Link must be a valid URL" });
    }
    // properties to be a list of string which can be null also
    if (!Array.isArray(properties)) {
      return res.status(400).json({ error: "Properties must be an array" });
    }
    // check if feed source is there by link
    const existingSource = await db.feedSource.findUnique({
      where: { link },
    });
    if (existingSource) {
      return res.status(400).json({ error: "Feed source already exists" });
    }

    if (!req.user.userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const newFeedSource = await db.feedSource.create({
      data: {
        name,
        link: link.trim().toLowerCase(),
        properties: Array.isArray(properties) ? properties : [],
        createdBy: req.user.userId,
      },
    });
    return res.status(201).json(newFeedSource);
  } catch (error) {
    console.error("Error creating feed source:", error);
    return res.status(500).json({ error: "Failed to create feed source" });
  }
});

adminFeedRouter.delete("/feed/current", async (req, res) => {
  let { feed_id } = req.query;
  feed_id = parseInt(feed_id, 10);

  if (!feed_id) {
    return res.status(400).json({ error: "Feed ID is required" });
  }

  const currentData = await db.feedSource.findUnique({
    where: { id: feed_id },
  });

  if (!currentData) {
    return res.status(404).json({ error: "Feed source not found" });
  }

  await db.feedSource.delete({
    where: { id: feed_id },
  });
  return res.status(204).send({ message: "Feed source deleted successfully" });
});

adminFeedRouter.get("/feed/preview", async (req, res) => {
  try {
    const { link } = req.query;
    // link is needed
    if (!link) {
      return res.status(400).json({ error: "Link is required" });
    }
    const feedPreview = await makeFeed(link);
    if (feedPreview === null) {
      return res.status(404).json({ error: "Error fetching feed preview" });
    }
    return res.json(feedPreview);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
});

export default adminFeedRouter;
