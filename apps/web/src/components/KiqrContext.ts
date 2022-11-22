import type { User } from '@auth0/auth0-spa-js'
import React from 'react'

interface KiqrContextInterface {
  user?: User
}

export const defaultKiqrContextValue: KiqrContextInterface = {}

export const KiqrContext = React.createContext(defaultKiqrContextValue)
