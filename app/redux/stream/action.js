const PREFIX = "STREAM_";

const action = {
  GET_ALL_STREAMS: PREFIX + "GET_ALL_STREAMS",
  GET_ALL_STREAMS_SUCCESS: PREFIX + "GET_ALL_STREAMS_SUCCESS",
  GET_ALL_STREAMS_ERROR: PREFIX + "GET_ALL_STREAMS_ERROR",
  ADD_STREAM_TO_DB: PREFIX + "ADD_STREAM_TO_DB",
  UPDATE_STREAM: PREFIX + "UPDATE_STREAM",

  ADD_NEW_STREAM: PREFIX + "ADD_NEW_STREAM",
  DELETE_STREAM: PREFIX + "DELETE_STREAM",
  ACTIVATE_TAB: PREFIX + "ACTIVATE_TAB",

  CHANGE_FEED: PREFIX + "CHANGE_FEED",
  CONNECT_FEED: PREFIX + "CONNECT_FEED",
  DETACH_FEED: PREFIX + "DETACH_FEED",

  getAllStreams: (fetchWP, key = "", update = "") => ({
    type: action.GET_ALL_STREAMS,
    payload: { fetchWP, key, update }
  }),

  addNewStream: data => ({
    type: action.ADD_NEW_STREAM,
    payload: { data }
  }),

  deleteStream: (data, stream, activeTab) => ({
    type: action.DELETE_STREAM,
    payload: { data, stream, activeTab }
  }),

  feedChange: data => ({
    type: action.CHANGE_FEED,
    payload: { data }
  }),

  connectFeed: data => ({
    type: action.CONNECT_FEED,
    payload: { data }
  }),

  detachFeed: data => ({
    type: action.DETACH_FEED,
    payload: { data }
  }),

  updateStream: (data, streamList) => ({
    type: action.UPDATE_STREAM,
    payload: { data, streamList }
  }),

  streamToDB: (stream, fetchWP, actionName = "insert") => ({
    type: action.ADD_STREAM_TO_DB,
    payload: { stream, fetchWP, actionName }
  }),

  activateTab: (data, streamId) => ({
    type: action.ACTIVATE_TAB,
    payload: { data, streamId }
  })
};

export default action;
