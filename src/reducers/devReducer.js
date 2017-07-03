import { SEARCH_PERSON_BY_NAME } from "../actions/types";

const initState = {
    name: String,
    team: [],
    specialty: [],
    seat: {
        index: number,
        top: number,
        left: number,
        width: number,
        height: number
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case SEARCH_PERSON_BY_NAME:
            const data = action.data;
            return { ...data };
        
        default:
            return state;
    }
} 