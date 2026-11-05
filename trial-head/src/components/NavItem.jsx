
import { NavLink } from 'react-router-dom'

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block rounded-xl px-4 py-2 text-base font-medium ${
        isActive
          ? 'bg-slate-800 text-white underline decoration-indigo-400 decoration-2 underline-offset-8'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`
    }
  >
    {label}
  </NavLink>
)
export default NavItem