import { Route, Routes } from 'react-router-dom'
import './App.css'
import CompetitionPage from './pages/CompititionPage'
import DashboardLayout from './layout/DashboardLayout'
import MatchDetailsPage from './pages/MatchDetailsPage'
import TeamDetailsPage from './pages/TeamDetailsPage'
import PlayerDetailsPage from './pages/PlayerDetailsPage'
import HomePage from './pages/HomePage'
import ScorePage from './pages/ScorePage'

export default function App() {

  return (
    <>

      <Routes >
        <Route element={<DashboardLayout />}>
        <Route index element={<HomePage/>}/>
          <Route path="/competition/:id" element={<CompetitionPage />} />
          <Route path="/matches/:matchId" element={<MatchDetailsPage />} />
          <Route path="/teams/:teamId" element={<TeamDetailsPage />} />
          <Route path="/persons/:personId" element={<PlayerDetailsPage />} />
          <Route path="/competition/:Id/scorers" element={<ScorePage />} />
        </Route>
      </Routes>

    </>
  )
}

