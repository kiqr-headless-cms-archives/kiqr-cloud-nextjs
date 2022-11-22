import { Auth0Provider } from '@auth0/auth0-react'
import { KiqrProvider, LinkedLogo, Toolbar } from '@components'
import { AppShell } from '@kiqr/cloud-ui'
import { Sidebar } from 'components/templates/Sidebar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import '../styles/globals.css'

const AUTH0_DOMAIN = process.env.NEXT_PUBLIC_AUTH0_DOMAIN || 'auth.kiqr.cloud'
const AUTH0_CLIENT_ID =
  process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || 'K5h6zxThq1Nmhw7pzh9wwE4UMqo8I6Fb'
const AUTH0_REDIRECT_URI =
  process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI || 'https://kiqr.cloud'

export default function App({ Component, pageProps }: AppProps) {
  const { query } = useRouter()

  const sidebarOpen = Boolean(query?.projectId) && Boolean(query?.environmentId)

  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      issuer={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={AUTH0_REDIRECT_URI}
      audience="https://management-api.kiqr.cloud/"
    >
      <Head>
        <title>Login — KIQR</title>
      </Head>
      <KiqrProvider>
        <AppShell
          logo={<LinkedLogo />}
          toolbar={<Toolbar />}
          sidebar={<Sidebar />}
          sidebarOpen={sidebarOpen}
        >
          <Component {...pageProps} />
        </AppShell>
      </KiqrProvider>
    </Auth0Provider>
  )
}
