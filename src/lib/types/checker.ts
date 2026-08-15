export type CheckStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error'

export interface DomainCheckResult {
  domain: string
  available: boolean
  error?: string
}
