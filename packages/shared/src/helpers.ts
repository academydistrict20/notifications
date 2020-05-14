export interface FetchRequestOptions {
  params?: object
  headers?: object
  data?: object
  format?: string
}

async function fetchRequest(
  url: string,
  method: string,
  options: FetchRequestOptions | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const _url = new URL(url)
  const fetchOptions: RequestInit = { method: method.toUpperCase() }

  if (options) {
    if (options.params) Object.entries(options.params).forEach(([k, v]) => _url.searchParams.append(k, v))
    if (method.toUpperCase() === 'POST' && options.data) fetchOptions.body = JSON.stringify(options.data)
    if (options.headers) fetchOptions.headers = options.headers as Headers
  }

  const result = await fetch(_url.toString(), fetchOptions)

  if (!options?.format || options.format === 'json') {
    return result.json()
  } else {
    return result.text()
  }
}

/**
 * Helper function for creating HTTP POST requests
 *
 * @export
 * @param {string} url
 * @param {(FetchRequestOptions | undefined)} options
 * @returns {Promise<any>}
 */
export async function post(
  url: string,
  options: FetchRequestOptions | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return fetchRequest(url, 'POST', options)
}

/**
 * Helper function for creating HTTP GET requests
 *
 * @export
 * @param {string} url
 * @param {(FetchRequestOptions | undefined)} options
 * @returns {(Promise<any>)}
 */
export async function get(
  url: string,
  options: FetchRequestOptions | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return fetchRequest(url, 'GET', options)
}
