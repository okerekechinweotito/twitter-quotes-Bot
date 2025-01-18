import fetch from "node-fetch";

const api = async (url, tag) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    switch (tag) {
      case "quotable":
        const quote1 = {
          quote: `${data.content} - ${data.author}`,
          tag: "quotable",
        };
        return quote1;
      case "quoteshub":
        const quote2 = {
          quote: `${data.text} - ${data.author}`,
          tag: "quoteshub",
        };
        return quote2;
      case "programmingquotes":
        const quote3 = {
          quote: `${data.text} - ${data.author}`,
          tag: "programmingquotes",
        };
        return quote3;
    }
  } catch (error) {
    console.log("error:", error);
  }
};

const randomData = async () => {
  const randomNumber = Math.floor(Math.random() * 3);
  const pool = [
    { tag: "quotable", url: "http://api.quotable.io/quotes/random" },
    { tag: "quoteshub", url: "https://thequoteshub.com/api/" },
    {
      tag: "programmingquotes",
      url: "https://programming-quotes-api.azurewebsites.net/api/quotes/random",
    },
  ];
  const random = pool[randomNumber];
  const quote = await api(random.url, random.tag);
  return quote;
};

const generateQuote = async () => {
  let data;
  do {
    data = await randomData();
  } while (data && data.quote.length > 280);
  return data;
};

export { generateQuote };
