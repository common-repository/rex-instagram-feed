const PREFIX = 'GENERAL_';

const action = {

    DATA_GET_FROM_DB : PREFIX + "DATA_GET_FROM_DB",
    DATA_GET_FROM_DB_SUCCESS : PREFIX + "DATA_GET_FROM_DB_SUCCESS",

    DATA_UPDATE: PREFIX+ 'DATA_UPDATE',

    SAVE_DATA: 'SAVE_DATA',
    SAVE_DATA_SUCCESS: 'SAVE_DATA_SUCCESS',

    DATA_FETCH_ERROR: PREFIX + 'DATA_FETCH_ERROR',

    dataGetfromDB: (data, fetchWP = null) => ({
        type: action.DATA_GET_FROM_DB,
        payload: { data, fetchWP }
    }),

    dataSave: ( field, data = null, fetchWP = null ) => ({
        type: action.SAVE_DATA,
        payload: { field, data, fetchWP }
    }),

    dataUpdate: (data) => ({
        type: action.DATA_UPDATE,
        payload: { data }
    })
};

export default action;