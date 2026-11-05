
import NavItem from './NavItem.jsx'

const LINKS = [
  { to: '/trails', label: 'Trails' },
  { to: '/log', label: 'Log a trail' },
  { to: '/stats', label: 'Stats' },
]

const Nav = () => (
  <nav aria-label="Main">
    <ul className="flex gap-2">
      {LINKS.map((link) => (
        <li key={link.to}><NavItem {...link} /></li>
      ))}
    </ul>
  </nav>
)
export default Nav