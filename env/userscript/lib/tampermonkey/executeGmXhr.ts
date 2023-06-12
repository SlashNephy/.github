/**
 * @deprecated use fetch instead
 */
export const executeGmXhr = async <T = unknown>(
  request: Omit<Tampermonkey.Request<T>, 'onload' | 'onerror'>
): Promise<Tampermonkey.Response<T>> =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest<T>({
      ...request,
      onload: (response) => {
        resolve(response)
      },
      onerror: (error) => {
        reject(error)
      },
    })
  })
