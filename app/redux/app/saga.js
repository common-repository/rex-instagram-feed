import { all, takeEvery, put, call, take } from "redux-saga/effects";
import action from "./action";
import feedAction from "../feed/action";
import streamAction from "../stream/action";

function* init({ payload }) {
  const { fetchWP } = payload;
  try {
    yield put(action.isLoading(true));

    const feedResponse = yield call(fetchWP.get, `loadAllFeeds`);
    const { feeds, success } = feedResponse;
    if (success) {
      const stremResponse = yield call(fetchWP.get, `getAllStreams`);
      const { streams } = stremResponse;
      let data = streams;
      yield put({
        type: streamAction.GET_ALL_STREAMS_SUCCESS,
        payload: { data }
      });
      yield put(action.isLoading(false));
    }
    yield put(feedAction.loadFeedsFromDBSuccess(feeds));
  } catch (e) {
    console.log(e);
    yield put(action.initError(e));
  }
}

function* getSettingsFromDB({ payload }) {
  const { fetchWP } = payload;
  try {
    const response = yield call(fetchWP.get, `getAllSettings`);
    const { settings } = response;
    yield put({ type: action.GET_SETTINGS_SUCCESS, payload: { settings } });
  } catch (e) {
    yield put(action.isLoading(false));
    console.log(e);
    yield put(action.initError(e));
  }
}

function* saveSettingsToDB({ payload }) {
  const { data, fetchWP } = payload;
  try {
    yield put(action.isLoading(true));
    const response = yield call(fetchWP.post, `updateSettings`, data);
    const { success } = response;
    if (success) {
      yield put({ type: action.GET_SETTINGS_FROM_DB, payload: { fetchWP } });
    }
    yield put(action.isLoading(false));
  } catch (e) {
    yield put(action.isLoading(false));
    console.log(e);
    yield put(action.initError(e));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(action.INIT, init),
    takeEvery(action.GET_SETTINGS_FROM_DB, getSettingsFromDB),
    takeEvery(action.SAVE_SETTINGS_TO_DB, saveSettingsToDB)
  ]);
}
