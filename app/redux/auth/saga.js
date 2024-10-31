import { all, takeEvery, put, call, take } from "redux-saga/effects";
import action from "./action";

function* loadAccessTokenFromDB({payload}) {
    const { data, fetchWP } = payload;
    try {
        const response = yield call(fetchWP.get, `getAccessToken/${data}`);
        const {token} = response;
        yield put ( {type: action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB_SUCCESS, payload: { token } })
    } catch (e) {
        console.log(e);
        yield put ( {type: action.INSTAFEED_ERROR, payload: { e } })
    }
}


function* saveAccessToken({payload}) {
    const { provider, token, fetchWP } = payload;
    try {
        const response = yield call(fetchWP.post, `updateAccessToken/${provider}`, {token: token});
        yield put ( {type: action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB, payload: { data: 'instagram', fetchWP: fetchWP } })
    } catch (e) {
        console.log(e);
        yield put ( {type: action.INSTAFEED_ERROR, payload: { e } })
    }
}


function* deleteAccessToken({payload}) {
    const { data, fetchWP } = payload;
    try {
        yield call(fetchWP.delete, `deleteAccessToken/${data}`);
        yield put ( {type: action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB, payload: { data: 'instagram', fetchWP: fetchWP } })
    } catch (e) {
        console.log(e);
        yield put ( {type: action.INSTAFEED_ERROR, payload: { e } })
    }
}



export default function* rootSaga() {
    yield all([
        takeEvery(action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB, loadAccessTokenFromDB),
        takeEvery(action.SAVE_ACCESS_TOKEN, saveAccessToken),
        takeEvery(action.DELETE_TOKEN, deleteAccessToken),
    ]);
}



