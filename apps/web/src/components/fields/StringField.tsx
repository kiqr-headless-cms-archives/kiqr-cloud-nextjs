import { FieldProps, FormError } from '.'

export const StringField: React.FC<FieldProps> = (props) => {
  const { name, field, register, errors } = props

  return (
    <>
      <input
        type="text"
        {...register(name, { required: field.required })}
        className="border-neutral-200 outline-none focus:ring-0 text-sm bg-neutral-50 p-3 rounded"
        placeholder={`Enter a value for "${field?.label?.toLowerCase()}"`}
      />

      {errors?.content?.[field.id] && (
        <FormError message="This field is required" />
      )}
    </>
  )
}
