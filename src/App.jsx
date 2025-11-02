import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Cabecalho from './componentes/cabecalho'
import Home from './componentes/home'
import Read from './componentes/read'
import Create from './componentes/create'
import Update from './componentes/update'
import Apagar from './componentes/apagar'

function App() {
  return (
    <>
      <Cabecalho />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/apagar" element={<Apagar />} />
        </Routes>
      </div>
    </>
  )
}

export default App
