import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">
                <input  
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__input"
                    autoComplete="off"
                />
                <textarea
                    placeholder="what happend today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}
