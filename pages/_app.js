import { ClerkProvider } from '@clerk/nextjs'
import { useRouter } from 'next/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { push } = useRouter()

  return (
    <ClerkProvider frontendApi="clerk.open.bear-94.lcl.dev" navigate={(to) => push(to)}>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}

export default MyApp
