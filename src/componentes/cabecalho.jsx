import React from 'react'
import { Link, useInRouterContext } from 'react-router-dom'

export default function Cabecalho() {
  // Hook que verifica se estamos dentro de um BrowserRouter
  const dentroDoRouter = useInRouterContext()

  if (!dentroDoRouter) {
    // Evita o erro durante previews, testes, ou render isolado
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">Catálogo de Filmes</a>
        </div>
      </nav>
    )
  }

  // Se estivermos dentro do BrowserRouter (modo normal do app)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Catálogo de Filmes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
          aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Início</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/create">Criar</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/update">Alterar</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/apagar">Apagar</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
