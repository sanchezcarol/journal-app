import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, saveNote, startUploading } from '../../actions/notes';
import moment from 'moment'

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active:note} = useSelector(state => state.notes)
    
    const handleSaveNote = (e) => {
        e.preventDefault();
        dispatch(saveNote(note))  
    }

    const handlePictureUpload = (e) => {
        document.querySelector("#file").click()
    }

    const handleChange = (e) => {
    
        const file = e.target.files[0]
        if(file){
            dispatch(startUploading(file))
        }
   
    }

    const handleDeleteNote = () => {
        dispatch(deleteNote(note.id))
    }

    return (
        <div className="notes__appbar">
            <span>{moment().format('LL')}</span>

            <input id="file" name="picture" type="file" style={{display: 'none'}} onChange={handleChange} />

            <div>
                <button 
                    onClick= {handlePictureUpload}
                    className="btn">
                    Upload picture
                </button>
                <button 
                    onClick={handleSaveNote}
                    className="btn"
                >
                    Save
                </button>
                
                   
                    <button 
                        onClick={handleDeleteNote}
                        className="btn btn-danger"
                    >
                    Delete
                    </button>
                

            </div>
        </div>
    )
}
