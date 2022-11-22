import { HtmlEditor } from '@kiqr/cloud-ui'
import { Controller } from 'react-hook-form'
import { FieldProps, FormError } from '.'

export const EditorField: React.FC<FieldProps> = (props) => {
  return (
    <>
      <Controller
        control={props.control}
        name={props.name}
        render={({ field }) =>
          field.value !== undefined ? (
            <HtmlEditor initialValue={field.value} onChange={field.onChange} />
          ) : (
            <></>
          )
        }
      />
      {props.errors?.content?.[props.field.id] && (
        <FormError message="This field is required" />
      )}
    </>
  )
}
