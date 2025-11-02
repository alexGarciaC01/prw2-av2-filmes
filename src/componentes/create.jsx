import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../api'

export default function Create() {
  const [values, setValues] = useState({ nome: '', genero: '', ano: '' })
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(BASE_URL, values)
      .then(() => navigate('/'))
      .catch(err => {
        console.error(err)
        alert('Erro ao criar filme.')
      })
  }

  return (
    <div className="card p-4">
      <h3>Adicionar Filme</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nome</label>
          <input required className="form-control" value={values.nome} onChange={e => setValues({ ...values, nome: e.target.value })} />
        </div>
        <div className="mb-2">
          <label>Gênero</label>
          <input required className="form-control" value={values.genero} onChange={e => setValues({ ...values, genero: e.target.value })} />
        </div>
        <div className="mb-2">
          <label>Ano</label>
          <input required className="form-control" value={values.ano} onChange={e => setValues({ ...values, ano: e.target.value })} />
        </div>

        <button className="btn btn-success me-2">Criar</button>
        <Link to="/" className="btn btn-secondary">Cancelar</Link>
      </form>
    </div>
  )
}
