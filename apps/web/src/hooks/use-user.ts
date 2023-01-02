import useSWR from 'swr'
import { useFetcher } from '.'

export interface User {
  id: string
  email: string
  updated_at: string
  created_at: string
}

export const useUser = () => {
  const { fetcher } = useFetcher()
  const { data: user, error, mutate } = useSWR<User>('v1/users/me', fetcher)

  return { user, error, mutate }
}
