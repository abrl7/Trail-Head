import { RouterProvider } from 'react-router-dom'
import { TrailsProvider } from './context/TrailsContext.jsx'
import { router } from './routes.jsx'

function App() {
  return (
    <TrailsProvider>
      <RouterProvider router={router} />
    </TrailsProvider>
  )
}

export default App