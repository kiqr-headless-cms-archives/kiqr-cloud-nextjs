import type { NextPage } from 'next'

import { ResourceEditor } from '@components'
import { useCurrent } from '@hooks'
import { Button, Card, Group, Heading } from '@kiqr/cloud-ui'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaGlobe, FaSave } from 'react-icons/fa'

import { useAuth0 } from '@auth0/auth0-react'
import {
  Configuration,
  CreateResourceRequest,
  ResourcesApi,
} from '@kiqr/management-api-sdk'

const NewResourcePage: NextPage = () => {
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const {
    currentContentType,
    currentProject,
    currentSchema,
    currentEnvironment,
  } = useCurrent()

  const { getAccessTokenSilently } = useAuth0()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateResourceRequest>()

  useEffect(() => {
    if (!currentContentType || !currentSchema || !isLoading) return

    setValue('name', '')
    setValue('slug', '')

    currentContentType.fields.map((field) => {
      // @ts-expect-error content has any type
      setValue(`content[${field.id}]`, '')
    })

    setIsLoading(false)
  }, [currentContentType, currentSchema, isLoading, setValue])

  // Handle submission of form.
  const onSubmit = async (data: CreateResourceRequest): Promise<void> => {
    if (!currentContentType) return console.error('Missing content type')
    if (!currentProject) return console.error('Missing project_id')
    if (!currentEnvironment) return console.error('Missing environment_id')

    const token = await getAccessTokenSilently()

    const configuration = new Configuration({
      accessToken: token,
    })

    const api = new ResourcesApi(configuration)
    const payload: CreateResourceRequest = {
      ...data,
      content_type: currentContentType.id,
    }

    toast.promise(
      api.createResource(currentEnvironment.id, payload).then((response) => {
        if (response?.data?.slug) {
          push(
            `/${currentProject?.slug}/${currentEnvironment?.slug}/collections/${currentContentType?.id}/resources/${response.data.slug}`
          )
        }
      }),
      {
        loading: 'Saving...',
        success: 'Changes saved!',
        error: 'Error when saving.',
      }
    )
  }

  return (
    <>
      <Heading
        title={currentContentType ? currentContentType.name : ''}
        subtitle={`Listing all resources in collection ${
          currentContentType
            ? currentContentType.name.toLocaleLowerCase()
            : null
        }`}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-x-5"
      >
        <section className="col-span-3">
          <ResourceEditor
            register={register}
            control={control}
            errors={errors}
            watch={watch}
          />
        </section>
        <aside className="flex flex-col gap-y-5">
          <Card
            title="Save changes"
            subtitle="Publish or schedule your resource for later"
          >
            <Group className="flex justify-between">
              <Button icon={<FaSave />}>Save draft</Button>
              <Button icon={<FaGlobe />} variant="primary" type="submit">
                Publish
              </Button>
            </Group>
          </Card>

          <Card
            title="Delete resource"
            subtitle="Unpublish and archive resource"
          >
            <p className="text-xs">
              Deleting a resource will unpublish and archive it. It will be{' '}
              <strong>permanently deleted</strong> after 30 days.
            </p>
            <br />
            <Button variant="danger" size="sm">
              Delete resource
            </Button>
          </Card>
        </aside>
      </form>
    </>
  )
}

export default NewResourcePage
