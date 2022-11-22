import { useAuth0 } from '@auth0/auth0-react'
import React, { ReactNode } from 'react'
import { KiqrContext } from './KiqrContext'
import { LoadingScreen } from './templates/LoadingScreen'
import { LoginScreen } from './templates/LoginScreen'

export interface KiqrProviderProps {
  children?: ReactNode
}

export const KiqrProvider: React.FC<KiqrProviderProps> = ({
  children,
}): JSX.Element => {
  const { isLoading, isAuthenticated, error, user, loginWithPopup } = useAuth0()

  if (isLoading) {
    return <LoadingScreen />
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }

  const context = {
    user,
  }

  if (!isAuthenticated) {
    return <LoginScreen loginCallback={loginWithPopup} />
  }

  return <KiqrContext.Provider value={context}>{children}</KiqrContext.Provider>
}
