import Parser from "rss-parser";
const parser = new Parser();

// Predefined sources (grouped by category)
const sources = {
  reddit: [
    "https://www.reddit.com/.rss",
    "https://www.reddit.com/r/unixporn/.rss",
  ],
  youtube: ["https://rss.app/feeds/3GfZvKzhcsg3j0QQ.xml"],
  bbc: ["https://rss.app/feeds/tDMOmhEvzwa6dbBM.xml"],
  googleNews: [
    "https://news.google.com/rss/search?hl=en-US&gl=US&ceid=US%3Aen&oc=11&q=Sports",
  ],
};

// Weather source
const weatherSource = (location) => {
  return `https://rss.accuweather.com/rss/liveweather_rss.asp?locCode=${location}`;
};

// Fetch and normalize feed
const makeFeed = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    // Return normalized items and available keys for admin selection
    const normalizedItems = feed.items.map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      content: item.content,
      contentSnippet: item.contentSnippet,
      author: item.author,
      guid: item.guid,
      isoDate: item.isoDate,
    }));

    // Collect keys dynamically from first item
    const availableKeys = normalizedItems[0]
      ? Object.keys(normalizedItems[0])
      : [];

    return {
      feedTitle: feed.title,
      feedLink: feed.link,
      availableKeys,
      items: normalizedItems,
    };
  } catch (err) {
    console.error("Failed to fetch RSS feed:", url, err.message);
    return null;
  }
};

export default {
  sources,
  weatherSource,
  makeFeed,
};

// weather response
/*
{
  items: [
    {
      title: "Currently: Mostly Cloudy: 64F",
      link: "https://www.accuweather.com/get/weather?locationid=178087",
      pubDate: "Fri, 22 Aug 2025 15:56:39 GMT",
      content: "Currently in Berlin, DE: 64 °F and Mostly Cloudy\r\n\t\t\t\t<img src=\"https://vortex.accuweather.com/phoenix2/images/common/icons/06_31x31.gif\">\r\n\t\t\t\t",
      contentSnippet: "Currently in Berlin, DE: 64 °F and Mostly Cloudy",
      guid: "https://www.accuweather.com",
      isoDate: "2025-08-22T15:56:39.000Z",
    }, {
      title: "8/22/2025 Forecast",
      link: "https://www.accuweather.com/get/weather?locationid=178087&day=1",
      pubDate: "Fri, 22 Aug 2025 15:56:39 GMT",
      content: "High: 69 F Low: 52 F Breezy this morning <img src=\"https://vortex.accuweather.com/phoenix2/images/common/icons/04_31x31.gif\" >",
      contentSnippet: "High: 69 F Low: 52 F Breezy this morning",
      guid: "https://www.accuweather.com/get/weather?locationid=178087&day=1",
      isoDate: "2025-08-22T15:56:39.000Z",
    }, {
      title: "8/23/2025 Forecast",
      link: "https://www.accuweather.com/get/weather?locationid=178087&day=2",
      pubDate: "Fri, 22 Aug 2025 15:56:39 GMT",
      content: "High: 62 F Low: 47 F Cooler; a p.m. shower or two <img src=\"https://vortex.accuweather.com/phoenix2/images/common/icons/14_31x31.gif\" >",
      contentSnippet: "High: 62 F Low: 47 F Cooler; a p.m. shower or two",
      guid: "https://www.accuweather.com/get/weather?locationid=178087&day=2",
      isoDate: "2025-08-22T15:56:39.000Z",
    }, {
      title: "The AccuWeather.com RSS Center",
      link: "https://corporate.accuweather.com/resources/downloads",
      pubDate: "Fri, 22 Aug 2025 15:56:39 GMT",
      content: "To discover additional weather feeds, visit the AccuWeather.com RSS Center at https://corporate.accuweather.com/resources/downloads",
      contentSnippet: "To discover additional weather feeds, visit the AccuWeather.com RSS Center at https://corporate.accuweather.com/resources/downloads",
      guid: "https://www.accuweather.com/en/downloads",
      isoDate: "2025-08-22T15:56:39.000Z",
    }
  ],
  image: {
    link: "",
    url: "https://vortex.accuweather.com/adc2004/pub/images/logos/adc_logo_187.gif",
    title: "Berlin, DE - AccuWeather.com Forecast",
    width: "144",
    height: "19",
  },
  title: "Berlin, DE - AccuWeather.com Forecast",
  description: "AccuWeather.com Forecast & Current Conditions",
  pubDate: "Fri, 22 Aug 2025 15:56:39 GMT",
  link: "https://www.accuweather.com/get/weather?page=extended&locationid=178087",
  language: "en-us",
  copyright: "Copyright 2025, AccuWeather, Inc., All rights reserved. For personal use only.",
  ttl: "60",
}
*/

// reddit response
/**
 * {
 * items: [
 *  {
      title: "Junge Frauen und das immer gleiche schema - woran liegts?",
      link: "https://www.reddit.com/r/FragtMaenner/comments/1mx3aet/junge_frauen_und_das_immer_gleiche_schema_woran/",
      pubDate: "2025-08-22T10:55:44.000Z",
      author: "/u/werdschorichtigsei",
      content: "<!-- SC_OFF --><div class=\"md\"><p>Hab die selbe frage schon in fragnefrau gestellt, aber ich dachte mir es wäre spannend die Theorien der anderen seite dazu zu hören, also:</p> <p>Nachdem meine ex, also meine &quot;jugendliebe&quot; mich gerade auf linkedin (!) wieder mit zwinker und küsschensmiley angeschrieben hat und ich sie auch da blockiert hab musste ich mich fragen... Wieso? ich seh das selbe schema auch bei meinen kollegen, immer das gleiche: Mit 20 rum kommen die mädels drauf das sie sich ausleben müssen, mit allen was dazugehört. Soll ihnen auch gegönnt sein, keine frage. Meine kollegen und ich auch sind jetzt eher zurückhaltender was sowas angeht, da wurde die zeit zwischen 20 und 30 für karriere, haus und alles so einrichten/ leben so hinlegen das kinder kommen können genutzt. Natürlich kamen in der zeit auch langjährige partner, die meisten inklusive mir sind schon lange verheiratet. Und fasst jeder hat eine ex aus jugendtagen die unbedingt &quot;nochmal von vorne anfangen&quot; möchte. NACH 10 JAHREN!! Ich für meinen teil erkenn meine ex nach den ganzen Tattoos und dem konsumverhalten nichtmal mehr wieder, geschweige denn das ich 10 jahre beziehung mit meiner frau wegschmeissen würde einfa so, versteht sie hald nicht, da hilft nur blockieren.</p> <p>So, jetzt sagen mir Andrew Tate (wenn man den so schreibt) jünger dass das hald das verhalten von frauen ist, bla bla, man kennts. Ich unterstelle einfach mal das da mehr dahinter stecken muss als das, und frage daher: woher kommt das? sitze ich in einer bubble und merks nicht? Hatten die damen gute gründe für ihr verhalten und ichs sehs nicht? Doch etwas ganz anderes? </p> </div><!-- SC_ON --> &#32; submitted by &#32; <a href=\"https://www.reddit.com/user/werdschorichtigsei\"> /u/werdschorichtigsei </a> &#32; to &#32; <a href=\"https://www.reddit.com/r/FragtMaenner/\"> r/FragtMaenner </a> <br/> <span><a href=\"https://www.reddit.com/r/FragtMaenner/comments/1mx3aet/junge_frauen_und_das_immer_gleiche_schema_woran/\">[link]</a></span> &#32; <span><a href=\"https://www.reddit.com/r/FragtMaenner/comments/1mx3aet/junge_frauen_und_das_immer_gleiche_schema_woran/\">[comments]</a></span>",
      contentSnippet: "Hab die selbe frage schon in fragnefrau gestellt, aber ich dachte mir es wäre spannend die Theorien der anderen seite dazu zu hören, also:\n Nachdem meine ex, also meine \"jugendliebe\" mich gerade auf linkedin (!) wieder mit zwinker und küsschensmiley angeschrieben hat und ich sie auch da blockiert hab musste ich mich fragen... Wieso? ich seh das selbe schema auch bei meinen kollegen, immer das gleiche: Mit 20 rum kommen die mädels drauf das sie sich ausleben müssen, mit allen was dazugehört. Soll ihnen auch gegönnt sein, keine frage. Meine kollegen und ich auch sind jetzt eher zurückhaltender was sowas angeht, da wurde die zeit zwischen 20 und 30 für karriere, haus und alles so einrichten/ leben so hinlegen das kinder kommen können genutzt. Natürlich kamen in der zeit auch langjährige partner, die meisten inklusive mir sind schon lange verheiratet. Und fasst jeder hat eine ex aus jugendtagen die unbedingt \"nochmal von vorne anfangen\" möchte. NACH 10 JAHREN!! Ich für meinen teil erkenn meine ex nach den ganzen Tattoos und dem konsumverhalten nichtmal mehr wieder, geschweige denn das ich 10 jahre beziehung mit meiner frau wegschmeissen würde einfa so, versteht sie hald nicht, da hilft nur blockieren.\n So, jetzt sagen mir Andrew Tate (wenn man den so schreibt) jünger dass das hald das verhalten von frauen ist, bla bla, man kennts. Ich unterstelle einfach mal das da mehr dahinter stecken muss als das, und frage daher: woher kommt das? sitze ich in einer bubble und merks nicht? Hatten die damen gute gründe für ihr verhalten und ichs sehs nicht? Doch etwas ganz anderes? \n    submitted by    /u/werdschorichtigsei    to    r/FragtMaenner  \n [link]   [comments]",
      id: "t3_1mx3aet",
      isoDate: "2025-08-22T10:55:44.000Z",
    }
  ],
  link: "https://www.reddit.com/",
  feedUrl: "https://www.reddit.com/.rss",
  title: "reddit: the front page of the internet",
  lastBuildDate: "2025-08-22T16:01:13+00:00",
}
 */

// youtube response
/**
 *  {
 * items: [
 *  {
      creator: "Johnny Minecraft",
      title: "I Made a MEGA Base in Minecraft!",
      link: "https://www.youtube.com/watch?v=6dRn2QqY6s0",
      pubDate: "Thu, 21 Aug 2025 23:23:55 GMT",
      enclosure: [Object ...],
      "dc:creator": "Johnny Minecraft",
      content: "<div><div><div style=\"left: 0; width: 100%; height: 0; position: relative; padding-bottom: 56.25%;\"><iframe src=\"https://www.youtube.com/embed/6dRn2QqY6s0\" style=\"border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;\" allowfullscreen scrolling=\"no\" allow=\"encrypted-media\"></iframe></div></div></div>",
      contentSnippet: "",
      guid: "e89cbb7d82ff050e2a32d1fadd85b0d7",
      isoDate: "2025-08-21T23:23:55.000Z",
    }
  ],
  feedUrl: "https://rss.app/feeds/3GfZvKzhcsg3j0QQ.xml",
  image: {
    link: "https://www.youtube.com/gaming/trending",
    url: "https://www.youtube.com/s/desktop/45ea6c88/img/logos/favicon_144x144.png",
    title: "Gaming - YouTube",
  },
  paginationLinks: {
    self: "https://rss.app/feeds/3GfZvKzhcsg3j0QQ.xml",
  },
  title: "Gaming - YouTube",
  description: "Gaming - YouTube",
  generator: "https://rss.app",
  link: "https://www.youtube.com/gaming/trending",
  language: "en",
  lastBuildDate: "Fri, 22 Aug 2025 16:19:32 GMT",
}

 */
