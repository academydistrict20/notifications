/**
 * Supported HTTP methods
 *
 * @enum {number}
 */
export const enum FetchMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

/**
 * Options for this request
 *
 * @export
 * @interface FetchRequestOptions
 */
export interface FetchRequestOptions {
  params?: { [key: string]: string }
  headers?: { [key: string]: string }
  data?: object
  format?: string
  method?: FetchMethod
}

/**
 * Helper function for naking HTTP requests
 * using fetch internally.
 *
 * @export
 * @param {string} url
 * @param {(FetchRequestOptions | undefined)} options
 * @returns {Promise<any>}
 */
export async function request(
  url: string,
  options: FetchRequestOptions | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  // Create a newe URL instance
  const _url = new URL(url)
  // Provide default fetch options
  const fetchOptions: RequestInit = { method: FetchMethod.GET }

  // If options were provided, apply them
  if (options) {
    // Force uppercase method if present
    if (options.method) fetchOptions.method = options.method.toUpperCase()
    // Turn params objectt into url params
    if (options.params) Object.entries(options.params).forEach(([k, v]) => _url.searchParams.append(k, v))
    // If method is not GET add data to body
    if (options.method && options.method.toUpperCase() !== FetchMethod.GET && options.data)
      fetchOptions.body = JSON.stringify(options.data)
    // Add headers if present
    if (options.headers) fetchOptions.headers = options.headers
  }

  // Execute the request using resolved url and fetch options
  const result = await fetch(_url.toString(), fetchOptions)

  // Depending on the format, return appropriate format
  if (!options?.format || options.format === 'json') {
    return result.json()
  } else {
    return result.text()
  }
}
