
import { useSearchParams } from 'react-router-dom'

export const useUrlParam = (key, defaultValue = '') => {
  const [, setSearchParams] = useSearchParams()
  const [searchParams] = useSearchParams()

  const value = searchParams.get(key) ?? defaultValue

  const setValue = (next, options) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev)
      // Clearing or choosing the default REMOVES the param, so you never get ?region=All
      if (!next || next === defaultValue) params.delete(key)
      else params.set(key, next)
      return params
    }, options)
  }

  return [value, setValue]
}
