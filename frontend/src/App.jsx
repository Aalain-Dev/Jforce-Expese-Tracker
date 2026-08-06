import './App.css'
import { Route, Routes } from 'react-router-dom'
import AuthMain from './Features/auth/pages/AuthMain'
import Dashboard from './Features/Dashboard/pages/Dashboard'
import ExpensePage from './Features/Dashboard/pages/ExpensePage'
import ExpenseList from './Features/Dashboard/pages/ExpenseList'
import DashboardLayout from './Features/Dashboard/pages/DashboardLayout'
import PublicRoute from './Components/PublicRoute'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <>
      <Routes>
        {/* Public — logged-in users are redirected to dashboard */}
        <Route
          path='/'
          element={
            <PublicRoute>
              <AuthMain />
            </PublicRoute>
          }
        />

        {/* Protected — unauthenticated users are redirected to login */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" index element={<Dashboard />} />
          <Route path="expense" element={<ExpensePage />} />
          <Route path="expenselist" element={<ExpenseList />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
