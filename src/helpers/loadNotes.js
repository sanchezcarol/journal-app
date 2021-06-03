import { db } from "../firebase/firebase-config"


export const loadNotes = async(uid) => {

    const noteSnap = await db.collection(`${uid}/journal/notes`).get()
    const notes = []

    noteSnap.forEach( data => { 
       
        notes.push({
            id: data.id,
            ...data.data()
        }) 
    })
    
    return notes;

}