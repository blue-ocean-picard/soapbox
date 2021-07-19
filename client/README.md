# Client Architecture
#### Master Component (App) States
* applicationAuth - boolean allowing access to app
* twitterAuth - boolean allowing access to Twitter dashboard and data
* twitterUsername - a string Twitter username for the active user for accessing Twitter feed and account data
* youtubeAuth - boolean allowing access to Youtube data
* twitterMetrics - (potentially deprecated) account metrics from Twitter API as filtered and formatted by getTwitterData (PLEASE INVESTIGATE activeAccountMetrics AND activePostMetrics BEFORE EVER USING THIS
* twitterAnalytics - hashtag data for use in the application's Twitter hashtag data graph while currentSocialMedia === Twitter
* twitterPosts - an array of objects containing data for each post returned from the Twitter API
* youtubeData - an array of objects containing data for each post returned from the Youtube Data API
* activeAccountMetrics - currently active account metrics from either API as filtered and formatted by the respective social media's handler (i.e. getYoutubeData parses out the Youtube channel metrics from its return and formats them for this state)
* activePostMetrics - currently active post metrics from either API as filtered and formatted by each YoutubeCard/TwitterCard's click handler (i.e. clicking on one of the cards in the aggregate post feed changes this to that post's metrics)
* currentSocialMedia - the currently actively selected social media from MediaSelect component as a string
* firstTwitterPrint - boolean to allow Twitter data to show after Twitter login

#### MetricsTab States
* activeSection - a string 'account' vs 'post' (toggles) representing the type of metrics which should be currently displayed by MetricsTab

#### YoutubeList States
* youtubeList - array of data to be mapped into the YoutubeCard component

#### YoutubeCard States
* isExpanded - should video description displayed be expanded
* didClickedLikeDislike - was the like/dislike button clicked already

#### TwitterList States
* twitterList - array of data to be mapped into the TwitterCard component
