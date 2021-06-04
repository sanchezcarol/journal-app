import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote, notesActive } from '../../actions/notes';

export const JournalEntry = ({id,title,body,date,url}) => {

    const dayNote = moment(date);
    const dispatch = useDispatch()

    const handleClick = () => {

        dispatch(activeNote(id,{id,title,body,date,url})); 
    } 

    return (
        <div
            onClick={handleClick}  
            className="journal__entry pointer"
        >
            {
                (url) &&
                <div 
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${url})`
                }}
                className="journal__entry-pictures">
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {title}
                </p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>
            
            <div className="journal__entry-date">
                <span>{dayNote.format('dddd')}</span>
                <h4>{dayNote.format('Do')}</h4>
            </div>
        </div>

    )
}
