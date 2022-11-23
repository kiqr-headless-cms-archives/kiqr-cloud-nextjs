import React from 'react'

import { Button } from '../Button'
import { Group } from '../Group'

import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa'

export interface PaginationProps {
  currentPage?: number
  totalPages?: number
  maxLength?: number
  gap?: number
  callback: (pageNumber: number) => void
}

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  maxLength = 10,
  gap = 3,
  callback,
}: PaginationProps) => {
  const pageNumbers = []
  const aroundCount = Math.floor((maxLength - 1) / 2)

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  const pageLinks = pageNumbers.map((page) => {
    if (page > 0 && page <= totalPages) {
      return (
        <Button
          onClick={() => callback(page)}
          key={page}
          size="xs"
          variant={page === currentPage ? 'primary' : 'secondary'}
        >
          {page.toString()}
        </Button>
      )
    } else {
      return null
    }
  })

  const beforeLinks = () => {
    let startPage = currentPage - aroundCount
    const stopPage = currentPage

    if (startPage < 1) {
      startPage = 1
    }

    return pageLinks.slice(startPage - 1, stopPage - 1)
  }

  const afterLinks = () => {
    const startPage = currentPage + 1
    let stopPage = startPage + aroundCount

    if (stopPage > totalPages) {
      stopPage = totalPages + 1
    }

    return pageLinks.slice(startPage - 1, stopPage - 1)
  }

  const prevPage = currentPage > 1 ? currentPage - 1 : undefined
  const nextPage = currentPage === totalPages ? undefined : currentPage + 1

  return (
    <div className="flex justify-center items-center">
      <Group gap={gap}>
        {prevPage ? (
          <Button
            onClick={() => callback(prevPage)}
            icon={<FaChevronCircleLeft />}
            size="xs"
          />
        ) : null}
        {beforeLinks()}
        <Button variant="primary" size="xs">
          {currentPage}
        </Button>
        {afterLinks()}
        {nextPage ? (
          <Button
            onClick={() => callback(nextPage)}
            icon={<FaChevronCircleRight />}
            size="xs"
          />
        ) : null}
      </Group>
    </div>
  )
}
