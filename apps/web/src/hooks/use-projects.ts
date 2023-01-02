import type { Project } from '@types'
import useSWR from 'swr'
import { useFetcher } from '.'

export const useProjects = () => {
  const { fetcher } = useFetcher()
  const {
    data: projects,
    error,
    mutate,
  } = useSWR<Project[]>('v1/projects', fetcher)

  return { projects, error, mutate }
}
