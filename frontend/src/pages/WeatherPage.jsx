import React from "react";
import {
  Typography,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../api/axiosInstance";

const WeatherPage = () => {
  const [cityName, setCityName] = React.useState(null);
  const [cityList, setCityList] = React.useState([]);
  const [weatherData, setWeatherData] = React.useState(null);

  const fetchCityList = async () => {
    try {
      const response = await axiosInstance.get("/weather/cities/");
      const cities = response.data;
      setCityList(cities);
    } catch (error) {
      console.error("Error fetching city list:", error);
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axiosInstance.get("/weather/", {
        params: { cityName: city },
      });
      const weatherData = response.data;
      console.log("Weather Data:", weatherData);
      // Handle the weather data as needed
      const { feedTitle, items, feedLink } = weatherData;
      setWeatherData({ feedTitle, items, feedLink });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  React.useEffect(() => {
    fetchCityList();
  }, []);

  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredCities = cityList.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h4">Weather Forecast</Typography>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <TextField
          label="Search Cities"
          variant="outlined"
          style={{ flex: 1 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by city or country name"
          margin="normal"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl style={{ flex: 1 }} margin="normal">
          <InputLabel id="city-select-label">Select City</InputLabel>
          <Select
            labelId="city-select-label"
            value={cityName}
            onChange={(e) => {
              setCityName(e.target.value);
              fetchWeatherData(e.target.value);
            }}
          >
            {filteredCities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}, {city.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {cityName && (
        <div>
          <Typography variant="h6">Weather Details for {cityName}</Typography>
          {weatherData && (
            <div>
              <Typography variant="subtitle1" gutterBottom>
                {weatherData.feedTitle}
              </Typography>
              <List style={{ display: "flex", flexWrap: "wrap" }}>
                {weatherData.items.map((item, index) => (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    style={{ width: "calc(50% - 16px)", flexShrink: 0 }}
                  >
                    <ListItemText
                      primary={
                        <Link href={item.link} target="_blank" rel="noopener">
                          {item.title}
                        </Link>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                          >
                            {new Date(item.pubDate).toLocaleString()}
                          </Typography>
                          {" — "}
                          <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                          />
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
