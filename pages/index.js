import Head from 'next/head'
import { SignUp, useAuth } from '@clerk/nextjs'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'
import Router from 'next/router'

export default function Home() {
  const { isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) Router.push('/notes')
  }, [isSignedIn])

  return (
    <>
      <Head>
        <title>Notes App</title>
        <meta name="description" content="Notes app with Next.js, Firebase and Clerk.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">Notes App</h1>
        <SignUp redirectUrl="/notes" />
      </main>
    </>
  )
}
