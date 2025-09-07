export interface HealthResponse {
  status: string
  timestamp: string
  version: string
}

export interface HelloResponse {
  message: string
  timestamp: string
}

export interface R2FileInfo {
  key: string
  size?: number
  lastModified?: string
}