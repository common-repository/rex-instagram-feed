const PREFIX = "SOCIAL_MEDIA_FEED_";

const action = {
  INIT: PREFIX + "INIT",
  INIT_ERROR: PREFIX + "INIT_ERROR",
  IS_LOADING: PREFIX + "IS_LOADING",
  GET_SETTINGS_FROM_DB: PREFIX + "GET_SETTINGS_FROM_DB",
  GET_SETTINGS_SUCCESS: PREFIX + "GET_SETTINGS_SUCCESS",
  SAVE_SETTINGS_TO_DB: PREFIX + "SAVE_SETTINGS_TO_DB",
  CHANGE_TYPE: PREFIX + "CHANGE_TYPE",

  init: fetchWP => ({
    type: action.INIT,
    payload: { fetchWP }
  }),

  initError: data => ({
    type: action.INIT_ERROR,
    payload: { data }
  }),

  isLoading: isloading => ({
    type: action.IS_LOADING,
    payload: { isloading }
  }),

  getSettingsFromDB: fetchWP => ({
    type: action.GET_SETTINGS_FROM_DB,
    payload: { fetchWP }
  }),

  saveSettingsToDb: (data, fetchWP) => ({
    type: action.SAVE_SETTINGS_TO_DB,
    payload: { data, fetchWP }
  }),

  onRadioChange: data => ({
    type: action.CHANGE_TYPE,
    payload: { data }
  })
};

export default action;
