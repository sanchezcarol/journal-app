import { types } from "../types/types";

const initialState = {

    notes: [],
    active: null

}


export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.notesActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
        
        case types.notesAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }
        
        case types.notesLoad:
           
            return{
                ...state,
                notes: [...action.payload]
            }
    
        case types.notesUpdate:
            return{
                ...state,
                notes: state.notes.map( note => 
                    action.payload.id === note.id
                    ? action.payload
                    : note
                )
            }

        case types.noteDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => 
                    action.payload !== note.id
                )
            }

        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }
        
        default:
            return state;
    }


}