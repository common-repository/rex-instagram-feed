import action from "./action";

const initialState = {
    data: '',
    error: ''
};

export default function reducer(state = initialState, { type, payload, newRecord }){
    switch (type) {
        case action.DATA_GET_FROM_DB_SUCCESS:
            return {
                ...state,
                data: payload.data ? payload.data : '',
            };
        case action.DATA_FETCH_ERROR:
            return {
                ...state,
                error: 'Something wrong',
            };

        case action.DATA_UPDATE:
            return {
                ...state,
                data: payload.data
            };

        case action.SAVE_DATA_SUCCESS:
            return {
                ...state,
                data: payload.data
            };

        default:
            return state;
    }

};