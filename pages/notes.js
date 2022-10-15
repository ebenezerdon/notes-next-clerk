import { useAuth, UserButton, useUser } from '@clerk/nextjs'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { collection, getDocs, addDoc } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'
import { database } from '../firebase'
import Router from 'next/router'
import styles from '../styles/notes.module.scss'

const getRandomColor = () => {
  const colors = ['#ff6c95', '#5da3ff', '#44e96d', '#ffef0a', '#ff64e5', '#ffad14']
  return colors[Math.floor(Math.random() * colors.length)]
}

const NotesPage = () => {
  const { getToken, isSignedIn, isLoaded, userId } = useAuth()
  const { user } = useUser()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notes, setNotes] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const addNote = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const notesCollection = collection(database, 'Users', userId, 'Notes')

    const noteObject = {
      text: document.getElementById('noteInput').value,
      createdAt: new Date(),
    }
    const newNote = await addDoc(notesCollection, noteObject).catch((error) => {
      console.log(error)
    })

    setNotes([{ id: newNote.id, ...noteObject }, ...notes])

    e.target.reset()
    setIsSubmitting(false)
  }

  useEffect(() => {
    if (isLoaded && !isSignedIn) Router.push('/')

    setIsFetching(true)
    if (isSignedIn) {
      ;(async () => {
        const idToken = await getToken({ template: 'integration_firebase' })
        const auth = getAuth()
        await signInWithCustomToken(auth, idToken)

        const notes = await getDocs(collection(database, 'Users', userId, 'Notes'))
        const arrayOfNotes = notes.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        })

        arrayOfNotes.sort((a, b) => b.createdAt - a.createdAt)

        setNotes(arrayOfNotes)
        setIsFetching(false)
      })()
    }
  }, [isLoaded, isSignedIn, userId])

  return (
    <>
      <h1 className={styles.title}>Your Notes</h1>
      <div className={styles.userButton}>
        <UserButton />
      </div>
      <form onSubmit={addNote} className={styles.form}>
        <textarea id="noteInput" placeholder={`Type here, ${user?.firstName || ''}...`} required />
        {isSubmitting ? <p>Submitting...</p> : <button type="submit">Add note</button>}
      </form>
      <div className={styles.userNotes}>
        {isFetching && <p>Loading...</p>}

        {notes.map((note) => {
          const date = note.createdAt.toDate?.() || new Date()
          const dateString = date.toLocaleDateString('en-US', { dateStyle: 'short' })

          return (
            <div className={styles.item} key={note.id} style={{ background: getRandomColor() }}>
              {dateString} 📝 <br /> <br />
              {note.text}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default NotesPage
