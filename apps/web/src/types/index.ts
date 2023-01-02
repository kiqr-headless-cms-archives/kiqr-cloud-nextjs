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
