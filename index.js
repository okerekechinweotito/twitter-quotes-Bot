import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import { generateQuote } from "./utils/generateQuote.js";
dotenv.config();

const handleTweet = async () => {
  const twitterClient = new TwitterApi({
    appKey: process.env.CONSUMER_KEY ?? "",
    appSecret: process.env.CONSUMER_SECRET ?? "",
    accessToken: process.env.ACCESS_TOKEN ?? "",
    accessSecret: process.env.ACCESS_TOKEN_SECRET ?? "",
  });
  const tweetClient = twitterClient.readWrite;

  const data = await generateQuote();
  const tweetText = `${data && data.quote}`;
  const resp = await tweetClient.v2.tweet(tweetText);
  console.log("resp:", resp);
  if (resp.errors) {
    console.log("errors:", resp.errors);
  } else {
    console.log(`Successfully tweeted: ${data?.quote} from ${data?.tag}`);
  }
  process.exit();
};

handleTweet();
