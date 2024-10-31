import { all, takeEvery, put, call, take } from "redux-saga/effects";
import action from "./action";

function* dataGetfromDB({payload}) {
    const { data, fetchWP } = payload;
    try {
        const response = yield call(fetchWP.get, `streamSettingsGet/`);
        const {data} = response;
        yield put ( {type: action.DATA_GET_FROM_DB_SUCCESS, payload: { data } })
    } catch (e) {
        console.log(e);
        yield put ( {type: action.DATA_FETCH_ERROR, payload: { e } })
    }
}


function* dataSave({payload}) {
    const { field, data, fetchWP } = payload;
    try {
        const response = yield call(fetchWP.post, `streamSettingsUpdate/`, {data: data});
        yield put ( {type: action.DATA_GET_FROM_DB, payload: { data: '', fetchWP: fetchWP } })
    } catch (e) {
        console.log(e);
        yield put ( {type: action.DATA_FETCH_ERROR, payload: { e } })
    }
}


export default function* rootSaga() {
    yield all([
        takeEvery(action.DATA_GET_FROM_DB, dataGetfromDB),
        takeEvery(action.SAVE_DATA, dataSave),
    ]);
}



