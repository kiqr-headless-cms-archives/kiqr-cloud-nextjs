import type { NextPage } from 'next'

import {
  Button,
  Column,
  Group,
  Heading,
  LocalTime,
  Pagination,
  Row,
  Table,
} from '@kiqr/cloud-ui'

import { CreateYourFirstAnnouncement } from '@components'
import { useCurrent, useResources } from '@hooks'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import * as inflection from 'inflection'

const ContentTypePage: NextPage = () => {
  const [page, setPage] = useState(1)
  const [emptyResults, setEmptyResults] = useState(false)
  const { currentProject, currentContentType, currentEnvironment } =
    useCurrent()

  const { resources, pagination } = useResources(page)

  useEffect(() => {
    if (resources && resources.length === 0) {
      setEmptyResults(true)
    } else {
      setEmptyResults(false)
    }
  }, [resources, emptyResults])

  return (
    <>
      <Heading
        title={currentContentType?.name}
        subtitle={`Listing all resources in collection ${
          currentContentType
            ? currentContentType.name.toLocaleLowerCase()
            : null
        }`}
        variant="page"
      >
        <Link
          href={`/${currentProject?.slug}/${currentEnvironment?.slug}/collections/${currentContentType?.id}/new`}
        >
          <Button>
            Create a new{' '}
            {currentContentType
              ? inflection
                  .singularize(currentContentType.name)
                  .toLocaleLowerCase()
              : 'resource'}
          </Button>
        </Link>
      </Heading>

      {resources && resources.length > 0 ? (
        <Table>
          <thead>
            <Row>
              <Column variant="th" className="w-0"></Column>
              <Column variant="th">
                {currentContentType
                  ? inflection.singularize(currentContentType.name)
                  : null}
              </Column>
              <Column variant="th">Updated at</Column>
              <Column variant="th">Created at</Column>
              <Column variant="th" className="w-0">
                Actions
              </Column>
            </Row>
          </thead>
          <tbody>
            {resources.map((resource) => (
              <Row key={resource.id}>
                <Column className="w-0"></Column>
                <Column>
                  <Link
                    href={`/${currentProject?.slug}/${currentEnvironment?.slug}/collections/${currentContentType?.id}/resources/${resource.slug}`}
                  >
                    {resource.name}
                  </Link>
                </Column>
                <Column>
                  <LocalTime epochTime={resource.updated_at} />
                </Column>
                <Column>
                  <LocalTime epochTime={resource.created_at} />
                </Column>
                <Column>
                  <Group gap={5}>
                    <Button size="xs">Edit</Button>
                    <Button size="xs" variant="danger">
                      Delete
                    </Button>
                  </Group>
                </Column>
              </Row>
            ))}
          </tbody>
        </Table>
      ) : null}

      {currentContentType && emptyResults ? (
        <CreateYourFirstAnnouncement
          href={`/${currentProject?.slug}/${currentEnvironment?.slug}/collections/${currentContentType?.id}/new`}
          contentTypeName={currentContentType?.name}
        />
      ) : null}

      {pagination?.pages && pagination?.pages > 1 ? (
        <Pagination
          currentPage={page}
          totalPages={pagination?.pages}
          callback={(page: number) => setPage(page)}
        />
      ) : null}
    </>
  )
}

export default ContentTypePage
