import action from "./action";

const initialState = {
  stream: {
    name: "",
    streamNameColor: {
      r: "86",
      g: "86",
      b: "86",
      a: "1"
    },
    streamNameAllignment: "left",
    streamNameFntSize: "30",
    showStreamName: "yes",
    itemOrder: "n2o",
    layout: "grid",
    connectedFeedList: [],
    galleryBg: {
      r: "255",
      g: "255",
      b: "255",
      a: "1"
    },
    glryBorderEnable: "no",
    glryBorderColor: {
      r: "228",
      g: "229",
      b: "238",
      a: "1"
    },
    glryBorderWidth: "1",
    glryBorderStyle: "solid",
    enableGlryPadding: "no",
    galleryWidth: "",
    noOfPhotos: 20,
    noOfColumn: "4",
    columnGap: "10",
    glryBorderRadius: "5",
    disableGlryPadding: "no",
    glryImgRadius: "0",

    idx: 1
  },
  activeTab: "stream1",
  streamList: {
    1: {
      name: "",
      streamNameColor: {
        r: "86",
        g: "86",
        b: "86",
        a: "1"
      },
      streamNameAllignment: "left",
      streamNameFntSize: "30",
      showStreamName: "yes",
      itemOrder: "n2o",
      layout: "grid",
      connectedFeedList: [],
      galleryBg: {
        r: "255",
        g: "255",
        b: "255",
        a: "1"
      },
      glryBorderEnable: "no",
      glryBorderColor: {
        r: "228",
        g: "229",
        b: "238",
        a: "1"
      },
      glryBorderWidth: "1",
      glryBorderStyle: "solid",
      enableGlryPadding: "no",
      galleryWidth: "",
      noOfPhotos: 20,
      noOfColumn: "4",
      columnGap: "10",
      glryBorderRadius: "5",
      disableGlryPadding: "no",
      glryImgRadius: "0",
      idx: 1
    }
  },
  feedList: [],
  currentFeedKey: "",
  connectedFeedList: [],
  streamError: ""
};

export default function reducer(
  state = initialState,
  { type, payload, newRecord }
) {
  let tempStream = {
    name: "",
    streamNameColor: {
      r: "86",
      g: "86",
      b: "86",
      a: "1"
    },
    streamNameAllignment: "left",
    streamNameFntSize: "30",
    showStreamName: "yes",
    itemOrder: "n2o",
    layout: "grid",
    connectedFeedList: [],
    galleryBg: {
      r: "255",
      g: "255",
      b: "255",
      a: "1"
    },
    glryBorderEnable: "no",
    glryBorderColor: {
      r: "228",
      g: "229",
      b: "238",
      a: "1"
    },
    glryBorderWidth: "1",
    glryBorderStyle: "solid",
    enableGlryPadding: "no",
    galleryWidth: "",
    noOfPhotos: 20,
    noOfColumn: "4",
    columnGap: "10",
    glryBorderRadius: "5",
    disableGlryPadding: "no",
    glryImgRadius: "0",
    idx: 1
  };
  switch (type) {
    case action.ADD_NEW_STREAM:
      let streamList = Object.keys(state.streamList).length
        ? {
            ...state.streamList,
            [parseInt(payload.data) + 1]: {
              ...tempStream,
              idx: parseInt(payload.data) + 1
            }
          }
        : initialState.stream;
      return {
        ...state,
        streamList: streamList,
        stream: {
          ...tempStream,
          idx: parseInt(payload.data) + 1
        },
        activeTab: `stream${parseInt(payload.data) + 1}`
      };

    case action.GET_ALL_STREAMS_SUCCESS:
      let activeTab = initialState.activeTab;
      let stream = tempStream;
      let streamlist = initialState.streamList;

      if (!Array.isArray(payload.data)) {
        if (payload.data) {
          let fstream = Object.keys(payload.data)[0];
          streamlist = payload.data;
          if (payload.update === "insert") {
            let lstream = Object.keys(payload.data)[
              Object.keys(payload.data).length - 1
            ];
            activeTab = `stream${lstream}`;
            stream =
              payload.data[
                Object.keys(payload.data)[Object.keys(payload.data).length - 1]
              ];
          } else if (payload.update === "update") {
            stream = payload.data[payload.key];
            activeTab = `stream${payload.key}`;
          } else {
            activeTab = `stream${fstream}`;
            stream = payload.data[Object.keys(payload.data)[0]];
          }
        }
      }

      return {
        ...state,
        streamList: streamlist,
        stream: stream,
        activeTab: activeTab
      };

    case action.CHANGE_FEED:
      return {
        ...state,
        currentFeedKey: payload.data
      };

    case action.CONNECT_FEED:
      return {
        ...state,
        connectedFeedList: payload.data,
        currentFeedKey: ""
      };

    case action.DETACH_FEED:
      return {
        ...state,
        connectedFeedList: payload.data
      };

    case action.UPDATE_STREAM:
      return {
        ...state,
        stream: {
          ...state.stream,
          ...payload.data
        },
        streamList: {
          ...state.streamList,
          ...payload.streamList
        },
        currentFeedKey: ""
      };

    case action.ACTIVATE_TAB:
      return {
        ...state,
        activeTab: payload.data,
        stream: Object.keys(state.streamList).length
          ? state.streamList[payload.streamId]
          : initialState.stream
      };

    case action.DELETE_STREAM:
      return {
        ...state,
        activeTab: payload.activeTab,
        stream: payload.stream,
        streamList: payload.data
      };
    default:
      return state;
  }
}
