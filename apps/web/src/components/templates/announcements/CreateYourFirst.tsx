import { Announcement, Button } from '@kiqr/cloud-ui'

import Image from 'next/image'
import Link from 'next/link'

export interface CreateYourFirstAnnouncementProps {
  contentTypeName: string
  href: string
}

export const CreateYourFirstAnnouncement = ({
  contentTypeName,
  href,
}: CreateYourFirstAnnouncementProps) => {
  return (
    <Announcement
      title={
        <>
          Get started now by creating your first{' '}
          <span className="text-primary-700">
            {contentTypeName.toLocaleLowerCase()}
          </span>
          .
        </>
      }
      paragraph={
        <>
          We couldn&apos;t find any{' '}
          <strong>{contentTypeName.toLocaleLowerCase()}</strong> in the
          database. Get started now by creating a new{' '}
          {contentTypeName.toLocaleLowerCase()} or import a collection of{' '}
          {contentTypeName.toLocaleLowerCase()}.
        </>
      }
      button={
        <Link href={href}>
          <Button variant="primary" size="lg">
            {`Create ${contentTypeName.toLocaleLowerCase()}`}
          </Button>
        </Link>
      }
      image={
        <Image
          src="https://avatars.dicebear.com/api/avataaars/lol.svg"
          width={400}
          height={400}
          alt=""
        />
      }
    />
  )
}
