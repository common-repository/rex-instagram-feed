const PREFIX = "INSTAGRAM_FEED_";

const action = {
  TYPE_CHANGE: PREFIX + "TYPE_CHANGE",
  INTERVAL_CHANGE: PREFIX + "INTERVAL_CHANGE",
  VALUE_CHANGE: PREFIX + "VALUE_CHANGE",
  RECORD_CHANGE: PREFIX + "RECORD_CHANGE",
  CREATE_FEED: PREFIX + "CREATE_FEED",
  CREATE_FEED_SUCCESS: PREFIX + "CREATE_FEED_SUCCESS",
  CREATE_FEED_ERROR: PREFIX + "CREATE_FEED_ERROR",
  UPDATE_FEED_SAGA: PREFIX + "UPDATE_FEED_SAGA",
  UPDATE_FEED_VALUE: PREFIX + "UPDATE_FEED_VALUE",
  UPDATE_SUCCESFULL: PREFIX + "UPDATE_SUCCESFULL",
  CANCEL: PREFIX + "CANCEL",

  changeType: (data = "user") => ({
    type: action.TYPE_CHANGE,
    payload: { data }
  }),

  changeRecord: (data = "20") => ({
    type: action.RECORD_CHANGE,
    payload: { data }
  }),

  changeInterval: (data = "hourly") => ({
    type: action.INTERVAL_CHANGE,
    payload: { data }
  }),

  changeValue: data => ({
    type: action.VALUE_CHANGE,
    payload: { data }
  }),

  createFeed: (data = null, fetchWP = null) => ({
    type: action.CREATE_FEED,
    payload: { data, fetchWP }
  }),

  updateFeedValue: (data = null) => ({
    type: action.UPDATE_FEED_VALUE,
    payload: { data }
  }),

  updateFeed: (data = null, fetchWP = null) => ({
    type: action.UPDATE_FEED_SAGA,
    payload: { data, fetchWP }
  }),

  cancel: () => ({
    type: action.CANCEL
  })
};

export default action;
