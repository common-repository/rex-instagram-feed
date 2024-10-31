import action from "./action";

const initialState = {
  feeds: {},
  tempFeeds: {},
  appError: "",
  newFeed: false
};

export default function reducer(
  state = initialState,
  { type, payload, newRecord }
) {
  switch (type) {
    case action.LOAD_FEEDS_FROM_DB_SUCCESS:
      return {
        ...state,
        isLoading: false,
        feeds: payload.data,
        tempFeeds: payload.data
      };
    case action.LOAD_FEEDS_FROM_DB_ERROR:
      return {
        ...state,
        appError: "Something wrong"
      };
    case action.LOAD_FEEDS_FROM_DB_SUCCESS:
      return {
        ...state,
        feeds: payload.data
      };
    case action.LOAD_FEEDS_FROM_DB_ERROR:
      return {
        ...state,
        appError: "Something wrong"
      };
    case action.NEW_FEED_ADDED:
      return {
        ...state,
        newFeed: true
      };
    case action.UPDATE_TEMP_FEEDS:
      return {
        ...state,
        tempFeeds: payload.tempFeeds,
        feeds: payload.feeds
      };

    default:
      return state;
  }
}
