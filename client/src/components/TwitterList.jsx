import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TwitterCard from './TwitterCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const twitterListStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#75ACEE',
  },
  parentDiv: {
    // width: 1152 px,
  },
}));

const TwitterList = function(props) {
  const [twitterList, setTwitterList] = useState(null);
  const classes = twitterListStyles();

  useEffect(()=>{
    setTwitterList(props.twitterPosts);
  }, [props.twitterPosts]);

  return (
    <div styles={classes.parentDiv}>
      <Grid container className={classes.root} spacing={2}>
        {twitterList && twitterList.map((tweet) => (
          <Grid item xs={12} sm={6} md={4} key={tweet.id}>
            <TwitterCard tweet={tweet}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

TwitterList.propTypes = {
  twitterPosts: PropTypes.object
};

export default TwitterList;