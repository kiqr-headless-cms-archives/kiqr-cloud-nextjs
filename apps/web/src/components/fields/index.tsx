import type { Component, ContentTypeField } from '@kiqr/management-api-sdk'
import React from 'react'

export const FormError: React.FC<{ message: string }> = ({ message }) => {
  return <span className="text-rose-500 text-xs mt-4">{message}</span>
}

export interface FieldProps {
  field: ContentTypeField
  name: string
  control: any
  register: any
  errors: any
  component?: Component
}

// Fields
// Renderers
export * from './ComponentRenderer'
export * from './EditorField'
export * from './FieldRenderer'
export * from './StringField'
export * from './TextareaField'
