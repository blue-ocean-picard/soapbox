import YoutubeList from './YoutubeList.jsx';
import YoutubeCard from './YoutubeCard.jsx';
import TwitterCard from './TwitterCard.jsx';
import React, { useState } from 'react';
import { MediaSelect } from './MediaSelect.jsx';
import axios from 'axios';

const App = props => {
  const [twitterData, setTwitterData] = useState('');
  const [youtubeData, setYoutubeData] = useState('');

  //currently uses hardcoded user info - will need to update to session/cookie info
  const getTwitterData = function() {
    axios.post('/twitter/hashtag-data', {
      userId: '20702956',
      maxResults: '50'
    })
      .then(resVal => {
        setTwitterData(resVal.data);
      });
  };

  const getYouTubeData = function() {
    axios.post('/youtube/video', {
      channelId: 'test'
    })
      .then(resVal => {
        setYouTubeData(resVal.data);
      });
  };

  return (
    <div id="app">
      React and Webpack are running correctly!
      <MediaSelect
        getTwitterData={getTwitterData}
        getYouTubeData={getYouTubeData}
        twitterData={JSON.stringify(twitterData)}
        youtubeData={JSON.stringify(youtubeData)}/>
    </div>
  );
};

export default App;