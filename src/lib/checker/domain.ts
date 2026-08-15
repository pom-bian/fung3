import type { DomainCheckResult } from '../types/checker'

const RDAP_BASE_URL = 'https://rdap.verisign.com/com/v1/domain'

/** Convert user input into a valid, single DNS label. */
export function normalizeDomainName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.com$/i, '')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
    .slice(0, 63)
}

/** Check a .com domain with Verisign's public RDAP service. */
export async function checkDomain(value: string): Promise<DomainCheckResult> {
  const name = normalizeDomainName(value)
  const domain = `${name}.com`

  if (!name) {
    return { domain, available: false, error: 'Enter a valid domain name.' }
  }

  try {
    const response = await fetch(`${RDAP_BASE_URL}/${encodeURIComponent(domain)}`, {
      headers: { Accept: 'application/rdap+json, application/json' },
    })

    if (response.ok) return { domain, available: false }
    if (response.status === 404) return { domain, available: true }

    return {
      domain,
      available: false,
      error: `The registry returned status ${response.status}.`,
    }
  } catch {
    return {
      domain,
      available: false,
      error: 'The registry could not be reached. Please try again.',
    }
  }
}

/** Check several names sequentially to avoid registry rate limits. */
export async function checkDomains(values: string[]): Promise<DomainCheckResult[]> {
  const results: DomainCheckResult[] = []

  for (const value of values) {
    results.push(await checkDomain(value))
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  return results
}
