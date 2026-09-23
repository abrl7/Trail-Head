import {createBrowserRouter,RouterProvider} from "react-router-dom";
import RootLayout from './layouts/RootLayout.jsx';
import TrailsPage from './components/TrailsPage.jsx';
import LogTrailPage from './components/LogTrailPage.jsx';
import StatsPage from './components/StatsPage.jsx';
import NotFound from './components/NotFound.jsx';
import TrailDetailPage from './components/TrailDetailPage.jsx';
import trailContext from './context/trailContext.js';
import { useState } from "react";

  const router=createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />, // Automatically catches routing errors
    children: [
      { index: true, element: <TrailsPage /> }, // Renders at "/"
      { path: 'trails', element: <TrailsPage /> },
      { path: 'log', element: <LogTrailPage /> },
      { path: 'stats', element: <StatsPage /> }, 
      { path: 'trails/:id', element: <TrailDetailPage /> },
    ],
  }
]);

function App() {
  const [trails, settrails] = useState([])

  return (
    <>
<trailContext.Provider value={{trails,settrails}}>
    <RouterProvider router={router} />
</trailContext.Provider>
    </>
  )
}

export default App
