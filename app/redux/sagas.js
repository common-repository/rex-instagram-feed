
import { all } from 'redux-saga/effects';
import AppSaga from './app/saga';
import StreamSaga from './stream/saga';
import authSaga from './auth/saga';
import instaFeedSaga from './instagramFeed/saga';
import feedSaga from './feed/saga';

export default function* rootSaga(getState) {
    yield all([
        AppSaga(),
        StreamSaga(),
        authSaga(),
        instaFeedSaga(),
        feedSaga(),
    ]);
}
