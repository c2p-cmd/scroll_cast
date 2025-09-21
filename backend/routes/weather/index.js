import express from "express";
import rss from "../../utils/rss.js";
import db from "../../utils/db.js";

const weatherFeed = rss.weatherSource;
const makeFeed = rss.makeFeed;
const weatherRouter = express.Router();

weatherRouter.get("/", async (req, res) => {
  try {
    const cityName = req.query.cityName;
    if (!cityName) {
      return res
        .status(400)
        .json({ error: "'cityName' query parameter is required" });
    }
    const cityData = await db.city.findFirst({
      where: {
        name: {
          contains: cityName,
        },
      },
    });
    if (!cityData) {
      return res.status(404).json({ error: "City not found" });
    }
    const weatherRSSURL = weatherFeed(cityData.location);
    const weatherData = await makeFeed(weatherRSSURL);
    weatherData.items = weatherData.items.filter(
      (item) => item.guid !== "https://www.accuweather.com/en/downloads"
    );
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

weatherRouter.get("/cities/", async (req, res) => {
  try {
    const cities = await db.city.findMany({
      orderBy: {
        name: "asc",
      },
    });
    res.json(cities);
  } catch (error) {
    console.error("Error fetching city list:", error);
    res.status(500).json({ error: "Failed to fetch city list" });
  }
});

export default weatherRouter;
