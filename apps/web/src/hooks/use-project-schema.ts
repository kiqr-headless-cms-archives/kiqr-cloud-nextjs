import type { Schema } from '@types'
import useSWR from 'swr'
import { useFetcher } from '.'

export const useProjectSchema = (projectId?: string, id?: string) => {
  const { fetcher } = useFetcher()
  const isReady = projectId && id

  const {
    data: schema,
    error,
    mutate,
  } = useSWR<Schema>(
    isReady ? `v1/projects/${projectId}/schemas/${id}` : null,
    fetcher
  )

  return { schema, error, mutate }
}
