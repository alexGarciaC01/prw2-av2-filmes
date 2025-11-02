import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { BASE_URL } from '../api'

export default function Update() {
  // Usamos search params para suportar duas formas:
  // 1) acessar /update e digitar um ID (fluxo exigido)
  // 2) acessar /update?id=XX vindo do Read (botão Editar)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const [idInput, setIdInput] = useState(searchParams.get('id') || '')
  const [filme, setFilme] = useState(null)
  const [status, setStatus] = useState('idle') // idle | found | notfound | loading

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      handleProcurar(id)
    }
    // eslint-disable-next-line
  }, [])

  const handleProcurar = (idToFind = null) => {
    const id = idToFind || idInput
    if (!id) return alert('Digite um ID')
    setStatus('loading')
    axios.get(`${BASE_URL}/${id}`)
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

  const handleAlterar = (e) => {
    e.preventDefault()
    axios.put(`${BASE_URL}/${filme.id}`, filme)
      .then(() => navigate('/'))
      .catch(err => {
        console.error(err)
        alert('Erro ao atualizar')
      })
  }

  return (
    <div className="card p-4">
      <h3>Alterar Filme</h3>

      {/* etapa: digitar ID */}
      <div className="mb-3 d-flex gap-2">
        <input className="form-control" placeholder="Digite o ID do filme" value={idInput} onChange={e => setIdInput(e.target.value)} />
        <button className="btn btn-primary" onClick={() => handleProcurar()}>Procurar</button>
        <Link to="/" className="btn btn-secondary">Cancelar</Link>
      </div>

      {status === 'loading' && <div>Procurando...</div>}
      {status === 'notfound' && <div className="alert alert-warning">Filme não encontrado. <Link to="/">Voltar</Link></div>}

      {status === 'found' && filme && (
        <form onSubmit={handleAlterar}>
          <div className="mb-2">
            <label>ID</label>
            <input className="form-control" value={filme.id} disabled />
          </div>
          <div className="mb-2">
            <label>Nome</label>
            <input className="form-control" value={filme.nome} onChange={e => setFilme({ ...filme, nome: e.target.value })} />
          </div>
          <div className="mb-2">
            <label>Gênero</label>
            <input className="form-control" value={filme.genero} onChange={e => setFilme({ ...filme, genero: e.target.value })} />
          </div>
          <div className="mb-2">
            <label>Ano</label>
            <input className="form-control" value={filme.ano} onChange={e => setFilme({ ...filme, ano: e.target.value })} />
          </div>

          <button className="btn btn-success me-2">Alterar</button>
          <Link to="/" className="btn btn-secondary">Cancelar</Link>
        </form>
      )}
    </div>
  )
}
