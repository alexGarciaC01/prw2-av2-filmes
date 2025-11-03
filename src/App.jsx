import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cabecalho from "./componentes/CCabecalho";
import Inicio from "./componentes/Inicio";
import Criar from "./componentes/Criar";
import Ler from "./componentes/Ler";
import Alterar from "./componentes/Alterar";
import Apagar from "./componentes/Excluir";

export default function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/criar" element={<Criar />} />
          <Route path="/ler/:id" element={<Ler />} />
          <Route path="/alterar/:id" element={<Alterar />} />
          <Route path="/apagar" element={<Apagar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
