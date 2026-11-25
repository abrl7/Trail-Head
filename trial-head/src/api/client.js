// src/api/client.js

let unauthorizedHandler = null
export const setUnauthorizedHandler = (fn) => { unauthorizedHandler = fn }

export class ApiError extends Error {
  constructor(status, body) {
    super(
      body?.error ||
      (status >= 500
        ? 'The server is unavailable. Try again shortly.'
        : `Request failed (${status})`)
    )
    this.status = status
    this.body = body            // may hold { errors: { field: message } } from a 400
  }
}

const request = async (method, path, { body, signal } = {}) => {
  let res
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError(0, { error: 'Cannot reach the server.' })
  }

  if (res.status === 204) return null                 // DELETE has no body
  const data = await res.json().catch(() => null)     // a failing proxy may send non-JSON
  // /auth/* is excluded: a 401 from login means "wrong password", not "session expired"
  if (res.status === 401 && !path.startsWith('/auth/')) unauthorizedHandler?.()
  if (!res.ok) throw new ApiError(res.status, data)   // <- the line beginners forget
  return data
}

export const api = {
  get: (path, options) => request('GET', path, options),
  post: (path, body) => request('POST', path, { body }),
  patch: (path, body) => request('PATCH', path, { body }),
  delete: (path) => request('DELETE', path),
}