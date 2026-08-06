import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import AuthMain from './Features/auth/pages/AuthMain'
import Dashboard from './Features/Dashboard/pages/Dashboard'
import ExpensePage from './Features/Dashboard/pages/ExpensePage'
import ExpenseList from './Features/Dashboard/pages/ExpenseList'
import DashboardLayout from './Features/Dashboard/pages/DashboardLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthMain />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route path="home" index element={<Dashboard />} />
          <Route path="expense" element={<ExpensePage />} />
          <Route path="expenselist" element={<ExpenseList />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
