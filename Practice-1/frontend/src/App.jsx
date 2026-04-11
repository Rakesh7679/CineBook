
import AppRoute from './AppRoute'
import { AuthProvider } from './features/auth/auth.context.jsx'

const App = () => {
  

  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  
  )
}

export default App
