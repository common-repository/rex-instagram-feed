import action from "./action";

const initialState = {
  type: "user",
  value: "",
  noOffeeds: 20,
  interval: "hourly",
  edit: false,
  editKey: "",
  newFeed: false
};

export default function reducer(
  state = initialState,
  { type, payload, newRecord }
) {
  switch (type) {
    case action.TYPE_CHANGE:
      return {
        ...state,
        type: payload.data
      };

    case action.INTERVAL_CHANGE:
      return {
        ...state,
        interval: payload.data
      };

    case action.VALUE_CHANGE:
      return {
        ...state,
        value: payload.data
      };

    case action.RECORD_CHANGE:
      return {
        ...state,
        noOffeeds: payload.data
      };

    case action.CREATE_FEED:
      return {
        ...state
      };

    case action.CREATE_FEED_SUCCESS:
      return {
        ...state,
        type: "user",
        value: "",
        interval: "hourly",
        edit: false,
        editKey: ""
      };

    case action.UPDATE_FEED_VALUE:
      return {
        ...state,
        type: payload.data.feed_target,
        value: payload.data.target_name,
        interval: payload.data.interval,
        noOffeeds: payload.data.noOffeeds,
        edit: true,
        editKey: payload.data.feed_id
      };

    case action.UPDATE_FEED:
      return {
        ...state,
        value: payload.data
      };

    case action.UPDATE_SUCCESFULL:
      return {
        ...state,
        type: "user",
        value: "",
        interval: "hourly",
        edit: false,
        editKey: ""
      };

    case action.CANCEL:
      return {
        ...state,
        type: "user",
        value: "",
        interval: "hourly",
        noOffeeds: 20,
        edit: false,
        editKey: ""
      };

    default:
      return state;
  }
}
