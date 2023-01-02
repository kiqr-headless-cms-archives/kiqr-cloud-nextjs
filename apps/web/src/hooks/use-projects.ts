import type { Project } from '@types'
import useSWR from 'swr'
import { useFetcher } from '.'

interface ProjectsResponse {
  projects: Project[]
}

export const useProjects = () => {
  const { fetcher } = useFetcher()
  const { data, error, mutate } = useSWR<ProjectsResponse>(
    'v1/projects',
    fetcher
  )

  const projects = data?.projects || []

  return { projects, error, mutate }
}
