import type { NextPage } from 'next'
import Head from 'next/head'

import { Heading } from '@kiqr/cloud-ui'
import { useCurrent } from '../../../hooks'

const EnvironmentDashboardPage: NextPage = () => {
  const { currentProject } = useCurrent()

  return (
    <>
      <Head>
        <title>{currentProject?.name} — KIQR</title>
      </Head>
      <Heading
        title={currentProject?.name}
        subtitle="This page will give you a great project overview"
      />
    </>
  )
}

export default EnvironmentDashboardPage
