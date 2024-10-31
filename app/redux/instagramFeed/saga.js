import { all, takeEvery, put, call } from "redux-saga/effects";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import action from "./action";
import feedAction from "../feed/action";
import appAction from "../app/action";

const RexSwal = withReactContent(Swal);

function* createFeed({ payload }) {
  const { data, fetchWP } = payload;

  try {
    yield call(appAction.isLoading, true);
    const response = yield call(fetchWP.post, `createFeed/instagram/`, data);
    const { success } = response;
    const message = success
      ? "Feed is created"
      : response.message.length > 100
      ? "May not exists"
      : response.message;
    yield put({ type: action.CREATE_FEED_SUCCESS });
    yield put({ type: feedAction.NEW_FEED_ADDED });
    yield put(appAction.isLoading(false));
    yield put({ type: feedAction.LOAD_FEEDS_FROM_DB, payload: { fetchWP } });

    if (success) {
      RexSwal.fire({
        title: "Congratulation",
        type: "success",
        text: "Feed is created",
        onOpen: () => {
          document
            .querySelector("#feedList")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      RexSwal.fire({
        title: "Opps!!",
        type: "error",
        text: message
      });
    }
  } catch (e) {
    yield put(appAction.isLoading(false));
    console.log(e);
    RexSwal.fire({
      title: "Opps!!",
      type: "error",
      text: "Sorry feed is not created"
    });
    yield put({ type: action.CREATE_FEED_ERROR, payload: { e } });
  }
}

function* updateFeed({ payload }) {
  const { data, fetchWP } = payload;
  try {
    yield put(appAction.isLoading(true));
    const response = yield call(fetchWP.post, `updateFeed/instagram/`, data);
    const { success } = response;
    const message = success ? "Feed is created" : response.message;
    yield put({ type: action.UPDATE_SUCCESFULL });
    yield put(appAction.isLoading(false));
    yield put({ type: feedAction.LOAD_FEEDS_FROM_DB, payload: { fetchWP } });
    if (success) {
      RexSwal.fire({
        title: "Congratulation",
        type: "success",
        text: "Feed is updated",
        onOpen: () => {
          document
            .querySelector("#feedList")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    } else {
      RexSwal.fire({
        title: "Opps!!",
        type: "error",
        text: message
      });
    }
    yield put({ type: feedAction.NEW_FEED_ADDED });
  } catch (e) {
    yield put(appAction.isLoading(false));
    console.log(e);
    RexSwal.fire({
      title: "Opps!!",
      type: "error",
      text: e
    });
    yield put({ type: action.CREATE_FEED_ERROR, payload: { e } });
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(action.CREATE_FEED, createFeed),
    takeEvery(action.UPDATE_FEED_SAGA, updateFeed)
  ]);
}
