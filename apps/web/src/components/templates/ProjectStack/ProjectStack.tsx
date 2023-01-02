import { ProjectCard } from '@components'
import type { Project } from '@types'
import Link from 'next/link'

interface ProjectStackProps {
  projects: Project[]
  isLoading: boolean
}

export const ProjectStack = ({ projects, isLoading }: ProjectStackProps) => {
  if (isLoading) return null

  return (
    <div className={'grid grid-cols-4 gap-5'}>
      {projects.map((project) => (
        <Link key={project.id} href={`/${project.id}/development`}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  )
}
