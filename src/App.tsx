import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Competitions from './pages/CompititionPage'
import Home from './pages/HomePage'
import Area from './pages/AreaPage'

export default function App() {

  return (
    <>
      <Navbar />
      <div className='max-w-7xl mx-auto'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/competitions' element={<Competitions />} />
          <Route path='/area' element={<Area/>} />

        </Routes>
      </div >
    </>
  )
}

