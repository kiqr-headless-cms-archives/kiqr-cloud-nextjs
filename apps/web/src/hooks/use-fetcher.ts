import { useAuth0 } from '@auth0/auth0-react'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE || 'https://api.kiqr.cloud'

export const useFetcher = () => {
  const { getAccessTokenSilently } = useAuth0()

  const fetcher = async (path: string) => {
    const token = await getAccessTokenSilently()

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    return fetch(`${API_BASE_URL}/${path}`, config).then((r) => r.json())
  }

  return { fetcher }
}
