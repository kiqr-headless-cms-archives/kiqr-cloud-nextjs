import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Button, Group } from '@kiqr/cloud-ui'
import { FaBook, FaSignOutAlt, FaTerminal } from 'react-icons/fa'
import { useCurrent } from '../../../hooks'

const Separator = () => {
  return <div className="h-10 w-[1px] bg-neutral-100"></div>
}

export const Toolbar = () => {
  const { logout } = useAuth0()
  const { currentUser, currentEnvironment, currentProject } = useCurrent()

  return (
    <>
      {currentProject ? (
        <Group gap={4}>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${currentProject.name}.svg`}
          />
          <Group direction="vertical" gap={0}>
            <strong>{currentProject.name}</strong>
            <span className="text-xs">
              {currentEnvironment ? currentEnvironment.name : 'Development'}
            </span>
          </Group>
        </Group>
      ) : null}
      <Group className="ml-auto">
        <Button icon={<FaBook />} size="xs">
          DOCS
        </Button>
        <Button icon={<FaTerminal />} size="xs">
          CLI
        </Button>

        {currentUser ? (
          <>
            <Separator />
            <Group gap={4}>
              <Avatar src={currentUser.avatar_url} />
              <Group direction="vertical" gap={0}>
                <strong>{currentUser.name}</strong>
                <span className="topbar-separator">{currentUser.email}</span>
              </Group>
            </Group>
            <Separator />
          </>
        ) : null}

        <Button
          onClick={() => logout({ returnTo: 'https://kiqr.cloud' })}
          icon={<FaSignOutAlt />}
          size="xs"
        />
      </Group>
    </>
  )
}
