import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterList from './TwitterList.jsx';
import TwitterCard from './TwitterCard.jsx';
import Post from './Post.jsx';
import React, { useState } from 'react';
import { MediaSelect } from './MediaSelect.jsx';
import MetricsTab from './metrics/MetricsTab';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
//import {BrowserRouter as Router, Switch, Route} from 'react-dom-router';

const App = props => {
  const [twitterData, setTwitterData] = useState('');
  const [youtubeData, setYoutubeData] = useState('');
  const [activePostMetrics, setActivePostMetrics] = useState(null);
  const [currentSocialMedia, setCurrentSocialMedia] = useState(null);

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterData(resVal.data);
        setCurrentSocialMedia('twitter');
      })
      .catch(err => {
        console.log('Failed to retrieve twitter data');
      });
  };

  const getYoutubeData = function() {
    axios.post('/youtube/video', {
      channelId: 'UCYZclLEqVsyPKP9HW87tPag'
    })
      .then(resVal => {
        setYoutubeData(resVal.data);
        setCurrentSocialMedia('youtube');
      })
      .catch(err => {
        console.log('Failed to retrieve youtube data');
      });

  };

  return (
    <div id="app">
      <Grid container spacing={2}>
        <Grid item lg={12}>
          Soapbox banner
        </Grid>
        <Grid container item lg={2} spacing={2}>
          <MediaSelect
            getTwitterData={getTwitterData}
            getYoutubeData={getYoutubeData}
            twitterData={JSON.stringify(twitterData)}
            youtubeData={JSON.stringify(youtubeData)}
          />
        </Grid>
        <Grid container item lg={7} spacing={2}>
          {currentSocialMedia === 'youtube' ? (<YoutubeList youtubeData={youtubeData} setActivePostMetrics={setActivePostMetrics}/>)
            : currentSocialMedia === 'twitter' ? (<TwitterList twitterData={twitterData} setActivePostMetrics={setActivePostMetrics}/>)
              : null
          }
        </Grid>
        <Grid container item
          spacing={2}
          lg={3}
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item container sm={12}>
            <Post />
          </Grid>
          <Grid item container sm={12}>
            <MetricsTab activePostMetrics={{ subscribers: 154 }} accountMetrics={{ likes: 14, dislikes: 20, views: 300}}/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;