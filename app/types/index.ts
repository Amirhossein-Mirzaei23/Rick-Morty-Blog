export type UserRole = 'admin' | 'editor' | 'user'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  avatarUrl?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface NavLink {
  label: string
  to: string
  icon?: string
  children?: NavLink[]
}
