// src/pages/LoginPage.jsx
import { useId, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ui } from '../utils/ui.js'

const LoginPage = () => {
  const { status, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const emailId = useId()
  const passwordId = useId()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from || '/trails'

  // Already logged in? Nothing to do here.
  if (status === 'authenticated') return <Navigate to={from} replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className={`${ui.title} mb-6`}>Admin login</h1>

      <form onSubmit={handleSubmit} className={`${ui.surface} flex flex-col gap-4 p-4 sm:p-6`}>
        <div className="flex flex-col gap-2">
          <label htmlFor={emailId} className={ui.label}>Email</label>
          <input id={emailId} type="email" autoComplete="username" required
            value={email} onChange={(e) => setEmail(e.target.value)} className={`${ui.input} px-4`} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor={passwordId} className={ui.label}>Password</label>
          <input id={passwordId} type="password" autoComplete="current-password" required
            value={password} onChange={(e) => setPassword(e.target.value)} className={`${ui.input} px-4`} />
        </div>

        {error && <p role="alert" className="text-sm font-medium text-rose-300">{error}</p>}

        <button type="submit" aria-disabled={submitting} className={ui.btnPrimary}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage