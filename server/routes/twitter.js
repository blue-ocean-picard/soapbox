require('dotenv').config({ path: '../.env' });
const router = require('express').Router();
const axios = require('axios');

router.post('/hashtag-data', async (req, res) => {
  const twitterEndPoint = `https://api.twitter.com/2/users/${req.body.userId}/tweets?tweet.fields=created_at,entities,public_metrics&max_results=${req.body.maxResults}`;
  const bearerToken = `Bearer ${process.env.BEARER_TOKEN}`;

  const options = {
    method: 'GET',
    url: twitterEndPoint,
    headers: {
      Authorization: bearerToken
    }
  };

  try {
    const results = await axios(options);

    res.status(200).end(JSON.stringify(analyzeHashtags(results.data.data)));
  } catch (err) {
    res.status(404).end('There was an error fetching Twitter data:', err);
  }
  res.end();
});

router.get('/home-timeline', async (req, res) => {

});

var analyzeHashtags = function (data) {
  var analytics = {};

  for (var i = 0; i < data.length; i++) {
    var hashtags = data[i].entities ? data[i].entities.hashtags || [] : [];
    for (var j = 0; j < hashtags.length; j++) {
      var hashtag = hashtags[j].tag;
      if (analytics[hashtag]) {
        analytics[hashtag].retweets += data[i].public_metrics.retweet_count;
        analytics[hashtag].replies += data[i].public_metrics.reply_count;
        analytics[hashtag].likes += data[i].public_metrics.like_count;
      } else {
        analytics[hashtag] = {};
        analytics[hashtag].retweets = data[i].public_metrics.retweet_count;
        analytics[hashtag].replies = data[i].public_metrics.reply_count;
        analytics[hashtag].likes = data[i].public_metrics.like_count;
      }
    }
  }

  return analytics;
};

module.exports = router;