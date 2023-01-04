import useSWR from 'swr'
import { useCurrent, useFetcher } from '.'

import type { Pagination, Resource } from '../types'

interface ResourcesResponse {
  resources: Resource[]
  meta: {
    pagination: Pagination
  }
}

export const useResources = (page = 1) => {
  const { fetcher } = useFetcher()
  const { currentContentType, currentEnvironment } = useCurrent()
  const isReady = currentContentType && currentEnvironment

  const { data, error, mutate } = useSWR<ResourcesResponse>(
    isReady
      ? `v1/resources?environment_id=${currentEnvironment?.id}&content_type=${currentContentType?.id}&page=${page}`
      : null,
    fetcher
  )

  const pagination = data?.meta?.pagination
  const resources = data?.resources

  return { resources, pagination, error, mutate }
}
