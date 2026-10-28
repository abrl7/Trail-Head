import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import TrailsPage from './pages/TrailsPage.jsx'
import TrailDetailPage from './pages/TrailDetailPage.jsx'
import LogTrailPage from './pages/LogTrailPage.jsx'
import StatsPage from './pages/StatsPage.jsx'
import NotFound from './pages/NotFound.jsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <TrailsPage /> },
      { path: 'trails', element: <TrailsPage /> },
      { path: 'trails/:id', element: <TrailDetailPage /> },
      { path: 'log', element: <LogTrailPage /> },
      { path: 'stats', element: <StatsPage /> },
    ],
  },
])