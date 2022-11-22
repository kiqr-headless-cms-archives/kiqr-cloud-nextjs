import useSWR from 'swr'
import { useFetcher } from '.'

import type { Project } from '@kiqr/management-api-sdk'

export const useProject = (id?: string) => {
  const { fetcher } = useFetcher()
  const isReady = id

  const {
    data: project,
    error,
    mutate,
  } = useSWR<Project>(isReady ? `v1/projects/${id}` : null, fetcher)

  return { project, error, mutate }
}
