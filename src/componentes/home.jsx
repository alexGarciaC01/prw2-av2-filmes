import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../api'

export default function Home() {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    axios.get(BASE_URL)
      .then(res => setFilmes(res.data))
      .catch(err => {
        console.error(err)
        alert('Erro ao carregar filmes. Verifique a URL da API em src/api.js')
      })
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Filmes cadastrados</h2>
        <Link to="/create" className="btn btn-success">Novo Filme</Link>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {filmes.length === 0 ? (
            <tr><td colSpan="2">Nenhum filme encontrado.</td></tr>
          ) : (
            filmes.map(f => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>
                  <Link to={`/read/${f.id}`} className="text-decoration-none">
                    {f.nome}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
