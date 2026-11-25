// src/components/RequireAdmin.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import { ui } from '../utils/ui.js'

const RequireAdmin = () => {
  const { status, isAdmin } = useAuth()
  const location = useLocation()

  if (status === 'loading') {
    return <p role="status" className={ui.body}>Checking your session…</p>
  }

  if (status === 'anonymous') {
    // Remember where they were going, exactly like the "Back to trails" trick
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
  }

  if (!isAdmin) {
    return (
      <div className={`${ui.surface} flex flex-col items-start gap-4 p-6`}>
        <h1 className={ui.title}>Not allowed</h1>
        <p className={ui.body}>Your account doesn’t have permission to view this page.</p>
      </div>
    )
  }

  return <Outlet />
}

export default RequireAdmin