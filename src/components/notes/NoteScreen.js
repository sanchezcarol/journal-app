import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const {active:note} = useSelector(state => state.notes);
    const dispatch = useDispatch();
    const [values, handleInputChange, reset] = useForm(note);
    const {title,body,url} = values;
    const activeId = useRef();

    useEffect(() => {

        if(note.id !== activeId.current){
            reset(note)    
            activeId.current = note.id
        }

    }, [note,reset])

    useEffect(() => {
        dispatch(activeNote(values.id, values));
    }, [values,dispatch])
    

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input  
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="what happend today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

                {
                    (note.url) &&
                    <div className="notes__image">
                        <img src={url} alt="" />
                    </div>
                }
            </div>
        </div>
    )
}
