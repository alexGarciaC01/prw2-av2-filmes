import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../api'

export default function Apagar() {
  const [idInput, setIdInput] = useState('')
  const [filme, setFilme] = useState(null)
  const [status, setStatus] = useState('idle') // idle | found | notfound | loading

  const handleProcurar = () => {
    if (!idInput) return alert('Digite um ID')
    setStatus('loading')
    axios.get(`${BASE_URL}/${idInput}`)
      .then(res => {
        setFilme(res.data)
        setStatus('found')
      })
      .catch(err => {
        console.error(err)
        setFilme(null)
        setStatus('notfound')
      })
  }

  const handleApagar = () => {
    if (!filme) return
    const confirm = window.confirm(`Deseja realmente apagar o filme "${filme.nome}" (ID ${filme.id})?`)
    if (!confirm) return
    axios.delete(`${BASE_URL}/${filme.id}`)
      .then(() => {
        alert('Filme apagado com sucesso.')
        setFilme(null)
        setStatus('idle')
        setIdInput('')
      })
      .catch(err => {
        console.error(err)
        alert('Erro ao apagar.')
      })
  }

  return (
    <div className="card p-4">
      <h3>Apagar Filme</h3>

      <div className="mb-3 d-flex gap-2">
        <input className="form-control" placeholder="Digite o ID do filme" value={idInput} onChange={e => setIdInput(e.target.value)} />
        <button className="btn btn-danger" onClick={handleProcurar}>Procurar</button>
        <Link to="/" className="btn btn-secondary">Cancelar</Link>
      </div>

      {status === 'loading' && <div>Procurando...</div>}
      {status === 'notfound' && <div className="alert alert-warning">Filme não encontrado.</div>}

      {status === 'found' && filme && (
        <div>
          <p><strong>ID:</strong> {filme.id}</p>
          <p><strong>Nome:</strong> {filme.nome}</p>
          <p><strong>Gênero:</strong> {filme.genero}</p>
          <p><strong>Ano:</strong> {filme.ano}</p>

          <button className="btn btn-danger me-2" onClick={handleApagar}>Confirmar exclusão</button>
          <button className="btn btn-secondary" onClick={() => { setFilme(null); setStatus('idle') }}>Cancelar</button>
        </div>
      )}
    </div>
  )
}
