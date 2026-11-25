import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import TrailsPage from './pages/TrailsPage.jsx'
import TrailDetailPage from './pages/TrailDetailPage.jsx'
import LogTrailPage from './pages/LogTrailPage.jsx'
import StatsPage from './pages/StatsPage.jsx'
import NotFound from './pages/NotFound.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RequireAdmin from './components/RequireAdmin.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <TrailsPage /> },
      { path: 'trails', element: <TrailsPage /> },
      { path: 'trails/:id', element: <TrailDetailPage /> },
      { path: 'stats', element: <StatsPage /> },
      { path: 'login', element: <LoginPage /> },
      {
        element: <RequireAdmin />,
        children: [{ path: 'log', element: <LogTrailPage /> }],
      },
    ],
  },
])