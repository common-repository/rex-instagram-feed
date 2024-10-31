import action from "./action";

const initialState = {
    instaAccessToken: '',
    instaError: '',
    target: 'user',
    targetName: 'spiderversemovie'
};

export default function reducer(state = initialState, { type, payload, newRecord }){
    switch (type) {
        case action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB_SUCCESS:
            return {
                ...state,
                instaAccessToken: payload.token ? payload.token : '',
            };
        case action.INSTAFEED_ERROR:
            return {
                ...state,
                instaError: 'Something wrong',
            };

        case action.TOKEN_UPDATE:
            return {
                ...state,
                instaAccessToken: payload.data
            };

        case action.SAVE_ACCESS_TOKEN_SUCCESS:
            return {
                ...state,
                instaAccessToken: payload.data
            };

        case action.DELETE_TOKEN_SUCCESS:
            return{
                ...state,
                instaAccessToken: ''
            };
        default:
            return state;
    }

};