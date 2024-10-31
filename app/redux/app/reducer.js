import action from "./action";

const initialState = {
  isLoading: false,
  settings: {
    newTab: "yes",
    deleteData: false
  }
};

export default function reducer(
  state = initialState,
  { type, payload, newRecord }
) {
  switch (type) {
    case action.IS_LOADING:
      return {
        ...state,
        isLoading: payload.isloading
      };

    case action.UPDATE_SETTINGS:
      return {
        ...state,
        deleteData: payload.data.deleteData
      };

    case action.GET_SETTINGS_SUCCESS:
      return {
        ...state,
        settings: payload.settings ? payload.settings : state.settings
      };

    case action.CHANGE_TYPE:
      return {
        ...state,
        settings: payload.data
      };

    default:
      return state;
  }
}
