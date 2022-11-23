import {
  Box,
  Button,
  Column,
  Group,
  Heading,
  Padding,
  Row,
  Table,
} from '@kiqr/cloud-ui'

import { useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'
import {
  FaArrowDown,
  FaArrowUp,
  FaEdit,
  FaPlusCircle,
  FaTrash,
  FaWindowMinimize,
} from 'react-icons/fa'
import { useCurrent } from '../../hooks'
import { FieldRenderer } from './FieldRenderer'

import type { Component, UpdateResourceRequest } from '@kiqr/management-api-sdk'
import type {
  Control,
  FieldErrorsImpl,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as inflection from 'inflection'

interface ComponentRendererProps {
  rootFieldName: string
  componentId: string
  control: Control<UpdateResourceRequest, any>
  register: UseFormRegister<UpdateResourceRequest>
  errors: Partial<
    FieldErrorsImpl<{
      name: string
      slug: string
      content: object
    }>
  >
  watch: UseFormWatch<UpdateResourceRequest>
  repeatable: boolean
}

export const ComponentRenderer = (
  props: ComponentRendererProps
): JSX.Element => {
  const { rootFieldName, componentId, control, register, errors, repeatable } =
    props
  const { currentSchema } = useCurrent()

  const component = currentSchema?.data.components?.find(
    (c) => c.id === componentId
  )

  const BaseComponent = ({ component }: { component: Component }) => (
    <>
      {component.fields.map((field) => (
        <FieldRenderer
          key={field.id}
          name={`content[${rootFieldName}][${field.id}]`}
          control={control}
          field={field}
          register={register}
          errors={errors}
          component={component}
        />
      ))}
    </>
  )

  const RepeatableComponent = ({ component }: { component: Component }) => {
    const { currentContentType } = useCurrent()
    const [selectedIndex, setSelectedIndex] = useState<number>()

    const {
      fields: formRows,
      move,
      remove,
    } = useFieldArray<Record<string, any>>({
      control,
      name: `content[${component.id}]`,
    })

    const EditRowModal = () => {
      return (
        <div className="fixed flex items-center justify-center h-screen top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-50 z-50">
          <Box className="relative w-1/2 max-h-[75vh] overflow-scroll">
            <div className="absolute top-10 right-10">
              <Button
                onClick={() => {
                  setSelectedIndex(undefined)
                }}
                icon={<FaWindowMinimize />}
                size="sm"
                variant="primary"
              />
            </div>

            <Padding>
              <Heading
                title={component.name}
                subtitle={`Add a new ${inflection
                  .transform(component.name, ['humanize', 'singularize'])
                  .toLowerCase()}`}
                variant="box"
              />
            </Padding>

            {component.fields.map((field) => (
              <FieldRenderer
                key={field.id}
                name={`content[${component.id}][${selectedIndex}][${field.id}]`}
                control={control}
                field={field}
                register={register}
                errors={errors}
                component={component}
              />
            ))}
          </Box>
        </div>
      )
    }

    // uses move from useFieldArray to change the position of the form
    // const handleDrag = ({ source, destination }) => {
    //   console.log('lool', source, destination)
    //   if (destination) {
    //     move(source.index, destination.index)
    //   }
    // }

    // const FormModal = useMemo<JSX.Element>(() => {
    //   return <EditRowModal />
    // }, [selectedIndex])

    const ItemsListTable = () => {
      const formRowsWatched = useWatch<Record<string, any>>({
        control,
        name: `content[${component.id}]`,
      })

      if (formRowsWatched !== undefined && formRowsWatched.length > 0) {
        return (
          <>
            <Table
              title={inflection.transform(component.name, [
                'humanize',
                'pluralize',
              ])}
              subtitle={`Add, edit or remove ${inflection
                .transform(component.name, ['humanize', 'pluralize'])
                .toLocaleLowerCase()}`}
            >
              <thead>
                <Row>
                  <Column variant="th"></Column>
                  {component.fields.slice(0, 4).map((field) => (
                    <Column key={field.id} variant="th">
                      {field.label}
                    </Column>
                  ))}
                  <Column variant="th"></Column>
                </Row>
              </thead>
              <tbody>
                {(
                  formRowsWatched as Record<string, string | number | boolean>[]
                ).map((row, rowIndex) => {
                  return (
                    <Row key={rowIndex}>
                      <Column className="w-0 text-center font-bold">
                        {rowIndex + 1}
                      </Column>
                      {component.fields.slice(0, 4).map((field) => (
                        <Column key={field.id}>{row[field.id]}</Column>
                      ))}
                      <Column>
                        <Group gap={2}>
                          <Button
                            size="xs"
                            onClick={() => move(rowIndex, rowIndex - 1)}
                            icon={<FaArrowUp />}
                          />
                          <Button
                            size="xs"
                            onClick={() => move(rowIndex, rowIndex + 1)}
                            icon={<FaArrowDown />}
                          />
                          <Button
                            size="xs"
                            onClick={() => setSelectedIndex(rowIndex)}
                            icon={<FaEdit />}
                            variant="primary"
                          />
                          <Button
                            size="xs"
                            onClick={() => remove(rowIndex)}
                            variant="danger"
                            icon={<FaTrash />}
                          />
                        </Group>
                      </Column>
                    </Row>
                  )
                })}
              </tbody>
            </Table>
          </>
        )
      }

      return (
        <>
          {' '}
          <div className="text-neutral-400 text-xs">
            No{' '}
            {inflection
              .transform(component.name, ['humanize', 'pluralize'])
              .toLocaleLowerCase()}{' '}
            found for this{' '}
            {currentContentType?.name
              ? inflection
                  .transform(currentContentType.name as string, [
                    'humanize',
                    'singularize',
                  ])
                  .toLocaleLowerCase()
              : null}
          </div>
        </>
      )
    }

    return (
      <div className="flex flex-col w-full p-5 border-b border-neutral-200 bg-white relative">
        <label
          className={
            'flex justify-between items-center text-primary-700 text-xs mb-3 uppercase'
          }
        >
          <span>{component.name}</span>
          <span>
            <Button
              size="xs"
              onClick={() => setSelectedIndex(formRows.length)}
              icon={<FaPlusCircle />}
            >
              Add a new{' '}
              {inflection
                .transform(component.name, ['humanize', 'singularize'])
                .toLocaleLowerCase()}
            </Button>
          </span>
        </label>

        <ItemsListTable />
        {selectedIndex !== undefined ? <EditRowModal /> : null}
      </div>
    )
  }

  if (!component) {
    return (
      <div
        key={rootFieldName}
        className="flex flex-col w-full p-5 border-b border-neutral-200 bg-white relative"
      >
        <label
          htmlFor={rootFieldName}
          className={'text-primary-700 text-xs mb-3 uppercase'}
        >
          {componentId}
        </label>
        <div className="text-rose-500 text-xs">
          Missing component: <strong>{componentId}</strong>
        </div>
      </div>
    )
  }

  if (repeatable) {
    return <RepeatableComponent component={component} />
  }

  return <BaseComponent component={component} />
}
