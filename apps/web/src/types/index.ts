export interface ContentType {
  id: string
  name: string
  required: boolean
  kind: 'collection' | 'single'
}

export interface Environment {
  id: string
  project_id: string
  name: string
  environment_type: string
  updated_at: string
  created_at: string
}

export interface Project {
  id: string
  account_id: string
  name: string
  environments: Array<Environment>
  updated_at: string
  created_at: string
}

export interface Schema {
  id: string
  version: number
  message: string
  project_id: string
  user_id: string
  updated_at: number
  created_at: number
  data: {
    content_types: Array<ContentType>
  }
}
