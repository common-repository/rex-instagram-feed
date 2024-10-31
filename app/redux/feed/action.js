const PREFIX = "SOCIAL_MEDIA_FEED_";

const action = {
  LOAD_FEEDS_FROM_DB: PREFIX + "LOAD_FEEDS_FROM_DB",
  LOAD_FEEDS_FROM_DB_SUCCESS: PREFIX + "LOAD_FEEDS_FROM_DB_SUCCESS",
  LOAD_FEEDS_FROM_DB_ERROR: PREFIX + "LOAD_FEEDS_FROM_DB_ERROR",

  DELETE_FEED: PREFIX + "DELETE_FEED",
  DELETE_FEED_ERROR: PREFIX + "DELETE_FEED_ERROR",

  CHANGE_STATUS: PREFIX + "CHANGE_STATUS",

  NEW_FEED_ADDED: PREFIX + "NEW_FEED_ADDED",

  UPDATE_TEMP_FEEDS: PREFIX + "UPDATE_TEMP_FEEDS",

  loadFeedsFromDB: (fetchWP = null) => ({
    type: action.LOAD_FEEDS_FROM_DB,
    payload: { fetchWP }
  }),

  loadFeedsFromDBSuccess: data => ({
    type: action.LOAD_FEEDS_FROM_DB_SUCCESS,
    payload: { data }
  }),

  deleteFeed: (key, fetchWP = null) => ({
    type: action.DELETE_FEED,
    payload: { key, fetchWP }
  }),

  changeStatus: (data, fetchWP = null) => ({
    type: action.CHANGE_STATUS,
    payload: { data, fetchWP }
  }),

  newFeedAdded: () => ({
    type: action.NEW_FEED_ADDED
  }),

  updateTempFeeds: (tempFeeds, feeds) => ({
    type: action.UPDATE_TEMP_FEEDS,
    payload: { tempFeeds, feeds }
  })
};

export default action;
