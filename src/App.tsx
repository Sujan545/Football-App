import { Route, Routes } from 'react-router-dom'
import './App.css'
import CompetitionPage from './pages/CompititionPage'
import DashboardLayout from './layout/DashboardLayout'

export default function App() {

  return (
    <>
      <DashboardLayout>
        <Routes>
      
          <Route path="/competition/:id" element={<CompetitionPage />} />
       
         

        </Routes>
      </DashboardLayout>
    </>
  )
}

