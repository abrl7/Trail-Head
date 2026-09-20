import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import RootLayout from './layouts/RootLayout.jsx';
import TrailsPage from './components/TrailsPage.jsx';
import LogTrailPage from './components/LogTrailPage.jsx';
import StatsPage from './components/StatsPage.jsx';
import NotFound from './components/NotFound.jsx';
import TrailDetailPage from './components/TrailDetailPage.jsx';

const router=createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />, // Automatically catches routing errors
    children: [
      { index: true, element: <App  /> }, // Renders at "/"
      { path: 'trails', element: <TrailsPage /> },
      { path: 'log', element: <LogTrailPage /> },
      { path: 'stats', element: <StatsPage /> }, 
      { path: 'trails/:id', element: <TrailDetailPage /> },
    ],
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
