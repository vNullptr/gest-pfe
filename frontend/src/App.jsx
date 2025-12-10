import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'

function App() {

  return (
    <>
      <Router>

      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/main" element={<Main/>}></Route>
      </Routes>

    </Router>
    </>
  )
}

export default App
