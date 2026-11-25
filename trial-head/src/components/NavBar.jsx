
import NavItem from './NavItem.jsx'
import { useAuth } from '../hooks/useAuth.js' 
import { useNavigate } from 'react-router-dom'
import { ui } from '../utils/ui.js'

const LINKS = [
  { to: '/trails', label: 'Trails' },
  { to: '/log', label: 'Log a trail' },
  { to: '/stats', label: 'Stats' },
]

const Nav = () => {
  const { status, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const links = [
    { to: '/trails', label: 'Trails' },
    ...(isAdmin ? [{ to: '/log', label: 'Log a trail' }] : []),
    { to: '/stats', label: 'Stats' },
  ]

  const handleLogout = async () => {
    navigate('/trails', { replace: true })
    await logout()
  }

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap items-center gap-2">
        {links.map((l) => <li key={l.to}><NavItem {...l} /></li>)}
        {status === 'authenticated' && (
          <li><button type="button" onClick={handleLogout} className={ui.btnSecondary}>Log out</button></li>
        )}
        {status === 'anonymous' && <li><NavItem to="/login" label="Admin login" /></li>}
      </ul>
    </nav>
  )
}
export default Nav