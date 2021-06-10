import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config"
import { loadNotes } from "../helpers/loadNotes";
import { uploadFile } from "../helpers/uploadFile";
import { types } from "../types/types";

export const startNewNote  = () => {
    return async(dispatch, getState) => {

        const uid = getState().auth.uid
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id,newNote))
        dispatch(addNote(doc.id, newNote))
        
    }
} 

export const activeNote = (id, note) => {

    return{
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    }

}

export const addNote = (id,note) => {
console.log('add');
    return{
        type: types.notesAddNew,
        payload: {
            id, ...note
        }
    }

}

export const startLoadingNotes = (uid) => {

    return async(dispatch) => {

        const notes = await loadNotes(uid) ;
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => {

    
    return {
        type: types.notesLoad,
        payload: notes
    }

}

export const saveNote = (note) => {

    return async(dispatch,getState) => {
        const uid = getState().auth.uid;

        if(!note.url) delete note.url

        const noteToFirestore = {...note};
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        
        dispatch(refreshLoadNote(note))
        //Swal.fire('Saved changes', note.title, 'success')
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
          
        Toast.fire({
            icon: 'success',
            title: 'Saved changes'
        })

    }

} 

export const refreshLoadNote = (note) => {

    return {
        type: types.notesUpdate,
        payload: note
    }

}

export const startUploading = (file) => {

    return async(dispatch, getState) => {

        const {active:note} = getState().notes;

        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
          
            didOpen: () => {
              Swal.showLoading()
            }
        })
          
        Toast.fire({
            title: 'Uploading'
        })
        
        const cloudResp = await uploadFile(file);
        
        note.url = cloudResp

        dispatch(saveNote(note))

        Swal.close()

    }

}

export const deleteNote = (id) => {

    return async(dispatch, getState) => {
        
        const uid = getState().auth.uid;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(noteDelete(id))
    }
}

export const noteDelete = (id) => ({

    type: types.noteDelete,
    payload: id

})

export const notesLogout = () => {

    return{
        type: types.notesLogoutCleaning
    }

}