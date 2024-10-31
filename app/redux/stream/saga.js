import { all, takeEvery, put, call, take } from "redux-saga/effects";
import action from "./action";
import appAction from "../app/action";
import Swal from "sweetalert2";
import omit from "lodash/omit";
import withReactContent from "sweetalert2-react-content";
const RexSwal = withReactContent(Swal);

function* getAllStreams({ payload }) {
  const { fetchWP, key, update } = payload;
  try {
    const response = yield call(fetchWP.get, `getAllStreams`);
    const { streams } = response;
    let data = streams;
    yield put({
      type: action.GET_ALL_STREAMS_SUCCESS,
      payload: { data, key, update }
    });
  } catch (e) {
    console.log(e);
    yield put({ type: action.GET_ALL_STREAMS_ERROR, payload: { e } });
  }
}

function* saveStreamToDB({ payload }) {
  const { stream, fetchWP, actionName } = payload;
  let msg = "Stream is Created";
  let response = "";
  try {
    switch (actionName) {
      case "delete":
        response = yield call(fetchWP.delete, `deleteStream/${stream.idx}`);
        msg = "Stream is Deleted";
        break;
      case "update":
        response = yield call(fetchWP.post, `updateStream/${stream.key}`, {
          ...omit(stream, ["idx", "key", "stream_id"])
        });
        msg = "Stream is Updated";
        break;
      default:
        response = yield call(fetchWP.post, `createStream`, stream);
        break;
    }
    const { success } = response;
    if (success) {
      if (actionName === "update")
        yield put(action.getAllStreams(fetchWP, stream.key, "update"));
      else if (actionName === "insert")
        yield put(action.getAllStreams(fetchWP, "", "insert"));
      else yield put(action.getAllStreams(fetchWP));
      yield put(appAction.isLoading(false));
      if (success) {
        RexSwal.fire({
          title: "Congratulation",
          type: "success",
          text: msg
        });
      }
    }
  } catch (e) {
    yield put(appAction.isLoading(false));
    console.log(e);
    yield put({ type: action.ADD_NEW_STREAM_ERROR, payload: { e } });
  }
}

export default function* rootSaga() {
  yield all([takeEvery(action.GET_ALL_STREAMS, getAllStreams)]);
  yield all([takeEvery(action.ADD_STREAM_TO_DB, saveStreamToDB)]);
}
