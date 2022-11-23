import { ProjectStack } from '@components'
import { useCurrent, useProjects } from '@hooks'
import { Heading } from '@kiqr/cloud-ui'
import Head from 'next/head'

export default function HomePage() {
  const { currentUser } = useCurrent()
  const { projects } = useProjects()

  return (
    <>
      <Head>
        <title>Dashboard — KIQR</title>
      </Head>
      <Heading
        title={
          currentUser?.name ? `Welcome back, ${currentUser?.name}!` : undefined
        }
        subtitle="Select one of your projects below to continue:"
      />

      {projects && projects.length > 0 ? (
        <ProjectStack projects={projects} isLoading={!projects} />
      ) : null}
    </>
  )
}
