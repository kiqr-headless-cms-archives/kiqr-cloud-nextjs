import type { NextPage } from 'next'

import { Heading } from '@kiqr/cloud-ui'

const ActivityLogPage: NextPage = () => {
  return (
    <>
      <Heading
        title="Activity log"
        subtitle="Track latest changes to this environment"
      />
    </>
  )
}

export default ActivityLogPage
