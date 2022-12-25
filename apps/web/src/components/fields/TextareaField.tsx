import { FieldProps, FormError } from '.'

export const TextareaField: React.FC<FieldProps> = (props) => {
  const { name, field, register, errors } = props

  return (
    <>
      <textarea
        {...register(name, { required: field.required })}
        rows={3}
        className="border-neutral-200 outline-none focus:ring-0 text-sm bg-neutral-50 p-3 rounded"
        placeholder={`Enter a text for "${field?.label?.toLowerCase()}"`}
      ></textarea>

      {errors?.content?.[field.id] && (
        <FormError message="This field is required" />
      )}
    </>
  )
}
