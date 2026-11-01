
import { Link } from 'react-router-dom'
import NavBar from './NavBar.jsx'

const Header = () => (
  <header className="border-b border-slate-800 bg-slate-900">
    <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <Link to="/" className="text-2xl font-bold text-slate-50">Trail Head</Link>
      <NavBar />
    </div>
  </header>
)
export default Header