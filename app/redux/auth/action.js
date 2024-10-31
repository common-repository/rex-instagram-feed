const PREFIX = 'AUTH_';

const action = {

    LOAD_INSTA_ACCESS_TOKEN_FROM_DB : PREFIX + "LOAD_INSTA_ACCESS_TOKEN_FROM_DB",
    LOAD_INSTA_ACCESS_TOKEN_FROM_DB_SUCCESS : PREFIX + "LOAD_INSTA_ACCESS_TOKEN_FROM_DB_SUCCESS",


    TOKEN_UPDATE: PREFIX+ 'TOKEN_UPDATE',
    SAVE_ACCESS_TOKEN: 'SAVE_ACCESS_TOKEN',
    SAVE_ACCESS_TOKEN_SUCCESS: 'SAVE_ACCESS_TOKEN_SUCCESS',

    DELETE_TOKEN : PREFIX + 'DELETE_TOKEN',
    DELETE_TOKEN_SUCCESS : PREFIX + 'DELETE_TOKEN_SUCCESS',

    INSTAFEED_ERROR: PREFIX + 'INSTAFEED_ERROR',

    loadAccessTokenFromDB: (data = 'instagram', fetchWP = null) => ({
        type: action.LOAD_INSTA_ACCESS_TOKEN_FROM_DB,
        payload: { data, fetchWP }
    }),

    saveAccessToken: ( provider='instagram', token = null, fetchWP = null ) => ({
        type: action.SAVE_ACCESS_TOKEN,
        payload: { provider, token, fetchWP }
    }),

    tokenUpdate: (data) => ({
        type: action.TOKEN_UPDATE,
        payload: { data }
    }),

    deleteToken:(data, fetchWP = null) => ({
        type: action.DELETE_TOKEN,
        payload:{ data, fetchWP }
    })
};

export default action;