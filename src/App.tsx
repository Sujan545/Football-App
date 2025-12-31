import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import Area from './pages/AreaPage'
import Matches from './pages/Matches'
import CompetitionPage from './pages/CompititionPage'

export default function App() {

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
         <Route path="/competition/:id" element={<CompetitionPage />} />
          {/* <Route path="/standings/:id" element={<Standings />} /> */}
          <Route path="/matches/:id" element={<Matches />} />
          <Route path='/area' element={<Area/>} />

        </Routes>
      </div >
    </>
  )
}

