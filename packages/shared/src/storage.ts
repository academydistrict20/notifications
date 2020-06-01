import { CookieStorage } from 'cookie-storage'
import { CookieOptions } from 'cookie-storage/lib/cookie-options'

// Set default cookies options
const defaultCookieOptions: CookieOptions = {
  // One month from now
  expires: new Date(+new Date() + 2678400000),
  secure: true,
  sameSite: 'Strict',
}

// Use just the domain, to allow for cross-subdomain cookies
if (typeof window !== 'undefined') {
  const hostname = location.hostname
  defaultCookieOptions.domain = hostname
    .split('.')
    .slice(hostname.length > 2 ? 1 : 0, hostname.length)
    .join('.')
}

export const cookieStorage: Storage = new CookieStorage(defaultCookieOptions)
export const defaultStorage: Storage = localStorage
