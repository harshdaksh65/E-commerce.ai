import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './component/Login'
import Register from './component/Register'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App