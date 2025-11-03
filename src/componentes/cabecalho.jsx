import React from "react";
import { Link } from "react-router-dom";

export default function Cabecalho() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🎬 Catálogo de Filmes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/criar">
                Criar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/apagar">
                Apagar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
