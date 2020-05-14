/**
 * Helper function for creating HTTP POST requests
 *
 * @export
 * @param {string} url
 * @param {({ params: object | undefined; data: object | undefined; headers: object | undefined })} options
 * @returns {(Promise<any>)}
 */
export async function post(
  url: string,
  options: { params: object | undefined; data: object | undefined; headers: object | undefined } | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const _url = new URL(url)
  const fetchOptions: RequestInit = { method: 'POST' }

  if (options) {
    if (options.params) Object.entries(options.params).forEach(([k, v]) => _url.searchParams.append(k, v))
    if (options.data) fetchOptions.body = JSON.stringify(options.data)
    if (options.headers) fetchOptions.headers = options.headers as Headers
  }

  return (await fetch(url, fetchOptions)).json()
}

/**
 * Helper function for creating HTTP GET requests
 *
 * @export
 * @param {string} url
 * @param {({ params: object | undefined; headers: object | undefined })} options
 * @returns {(Promise<any>)}
 */
export async function get(
  url: string,
  options: { params: object | undefined; headers: object | undefined } | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const _url = new URL(url)
  const fetchOptions: RequestInit = { method: 'GET' }

  if (options) {
    if (options.params) Object.entries(options.params).forEach(([k, v]) => _url.searchParams.append(k, v))
    if (options.headers) fetchOptions.headers = options.headers as Headers
  }

  return (await fetch(url, fetchOptions)).json()
}
