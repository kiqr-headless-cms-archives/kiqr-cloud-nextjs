import type { ContentType, Schema } from '@types'
import { useEffect, useState } from 'react'

export const useContentType = (schema?: Schema, id?: string) => {
  const [contentType, setContentType] = useState<ContentType>()

  useEffect(() => {
    if (schema?.data?.content_types && id) {
      const contentType = schema.data.content_types.find(
        (ct: ContentType) => ct.id === id
      )
      setContentType(contentType)
    } else {
      setContentType(undefined)
    }
  }, [schema, id])

  return { contentType }
}
