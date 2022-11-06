import { GET_HISTORY,
    HISTORY_ERRORS ,
    ADD_SONG_HISTORY_FAIL,
    HISTORY_CHECK,
    ADD_SONG_HISTORY_SUCESS,
    REMOVE_SONG_HISTORY} from "../actions/types";

const initialState = {
    // histories of all user
    histories: [],
    historyCheck: false,
}

export default function (state = initialState,action){
    const {type, payload} = action;
    switch(type){
        case ADD_SONG_HISTORY_SUCESS:
            return {
                ...state,
            };
        case GET_HISTORY:
            return{
                ...state,
                histories: payload,
            };
        case REMOVE_SONG_HISTORY:
            return{
                ...state,
                histories: state.histories.filter(
                    (song) =>song._id != payload
                ),
            };
        case HISTORY_CHECK:
            return {
              ...state,
                historyCheck: payload,
            };
        default: 
            return state;
    }
};

// export const addSongHis = (state = initialState,action){
//     const {type,payload} = action;
//     switch(type){
//         case ADD_SONG_HISTORY_SUCESS:
//             return {
//                 ...state, 
//                 history: [...state.history,payload]
//             };
//         case ADD_SONG_HISTORY_FAIL:
//             return {
//                 ...state,
//                 error: payload,
//                 loading: false
//             };
//         deafult :
//             return state
//     }
// };