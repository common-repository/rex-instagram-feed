import { all, takeEvery, put, call, take } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const RexSwal = withReactContent(Swal);
import action from "./action";
import appAction from "../app/action";
import streamAction from "../stream/action";

function* loadFeedsFromDB({ payload }) {
  const { fetchWP } = payload;
  try {
    const response = yield call(fetchWP.get, `loadAllFeeds`);
    const { feeds } = response;
    yield put(action.loadFeedsFromDBSuccess(feeds));
  } catch (e) {
    console.log(e);
    yield put({ type: action.INSTAFEED_ERROR, payload: { e } });
  }
}

function* deleteFeed({ payload }) {
  const { key, fetchWP } = payload;
  try {
    yield put(appAction.isLoading(true));
    const response = yield call(fetchWP.delete, `deletefeed/${key}`);
    const { success } = response;
    yield put(appAction.isLoading(false));
    yield put(action.loadFeedsFromDB(fetchWP));
    yield put(streamAction.getAllStreams(fetchWP));
    if (success) {
      RexSwal.fire({
        title: "Congratulation",
        type: "success",
        text: "Feed is deleted"
      });
    }
  } catch (e) {
    console.log(e);
    yield put({ type: action.INSTAFEED_ERROR, payload: { e } });
  }
}

function* changeFeedStatus({ payload }) {
  const { data, fetchWP } = payload;
  try {
    yield put(appAction.isLoading(true));
    const response = yield call(fetchWP.post, `changeFeedStatus`, data);
    yield put(appAction.isLoading(false));
    yield put(action.loadFeedsFromDB(fetchWP));
  } catch (e) {
    console.log(e);
    yield put({ type: action.INSTAFEED_ERROR, payload: { e } });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(action.LOAD_FEEDS_FROM_DB, loadFeedsFromDB),
    takeEvery(action.DELETE_FEED, deleteFeed),
    takeEvery(action.CHANGE_STATUS, changeFeedStatus)
  ]);
}
