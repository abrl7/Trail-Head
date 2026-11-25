import { RouterProvider } from 'react-router-dom'
import { TrailsProvider } from './context/TrailsContext.jsx'
import { router } from './routes.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
      <TrailsProvider>
        <RouterProvider router={router} />
      </TrailsProvider>
    </AuthProvider>
  )
}

export default App