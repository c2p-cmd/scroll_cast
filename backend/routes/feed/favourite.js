import express from "express";
import db from "../../utils/db.js";

const favouriteRouter = express.Router();

favouriteRouter.get("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { favouriteFeeds: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const favouriteFeeds = user.favouriteFeeds || [];
    if (user.role !== "Admin") {
      for (const feed of favouriteFeeds) {
        delete feed.link; // remove link for non-admin users
        delete feed.createdBy;
      }
    }
    res.json(favouriteFeeds);
  } catch (error) {
    console.error("Error fetching favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

favouriteRouter.post("/", async (req, res) => {
  try {
    const user = req.user;
    const feedId = req.body.feed_id;

    if (!feedId) {
      return res.status(400).json({ error: "Feed ID is required" });
    }

    // check if the feedId is valid
    const feed = await db.feedSource.findUnique({ where: { id: feedId } });
    if (!feed) {
      return res.status(404).json({ error: "Feed not found" });
    }

    const favouriteFeeds = user.favouriteFeeds || [];
    if (favouriteFeeds.indexOf(feedId) !== -1) {
      return res.status(409).json({ error: "Feed is already in favourites" });
    }

    const updatedUser = await db.user.update({
      where: { id: user.userId },
      data: {
        favouriteFeeds: {
          connect: { id: feedId },
        },
      },
    });

    delete updatedUser.password; // remove password from response

    res
      .status(201)
      .json({ message: "Feed added to favourites", user: updatedUser });
  } catch (error) {
    console.error("Error adding to favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

favouriteRouter.delete("/", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { favouriteFeeds: true },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const feedId = req.body.feed_id;

    if (!feedId) {
      return res.status(400).json({ error: "Feed ID is required" });
    }

    const favouriteFeeds = user.favouriteFeeds || [];
    if (favouriteFeeds.findIndex((feed) => feed.id === feedId) === -1) {
      return res.status(404).json({ error: "Feed not found in favourites" });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        favouriteFeeds: {
          disconnect: { id: feedId },
        },
      },
    });

    delete updatedUser.password; // remove password from response

    res.json({ message: "Feed removed from favourites", user: updatedUser });
  } catch (error) {
    console.error("Error removing from favourites:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default favouriteRouter;
