import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Alterar() {
  const [id, setId] = useState("");
  const [filme, setFilme] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  const handleProcurar = () => {
    if (!id) {
      alert("Digite o ID do filme!");
      return;
    }

    setStatus("loading");
    axios
      .get(`${BASE_URL}/${id}`)
      .then((res) => {
        setFilme(res.data);
        setStatus("found");
      })
      .catch(() => {
        setFilme(null);
        setStatus("notfound");
      });
  };

  const handleAlterar = (e) => {
    e.preventDefault();
    axios
      .put(`${BASE_URL}/${id}`, filme)
      .then(() => navigate("/"))
      .catch(() => alert("Erro ao atualizar o filme."));
  };

  return (
    <div className="card shadow p-4">
      <h3 className="text-primary mb-3">✏️ Alterar Filme</h3>

{/*ID e botões*/}
      <div className="d-flex align-items-center gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Digite o ID do filme"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleProcurar}>
          Procurar
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancelar
        </Link>
      </div>

      {/* Renderização condicional conforme o status */}
      {status === "loading" && <div>🔎 Procurando filme...</div>}

      {status === "notfound" && (
        <div className="alert alert-warning">
          ❌ Nenhum filme encontrado com o ID informado.
        </div>
      )}

      {status === "found" && filme && (
        <form onSubmit={handleAlterar}>
          <div className="mb-2">
            <label>ID</label>
            <input className="form-control" value={filme.id} disabled />
          </div>
          <div className="mb-2">
            <label>Nome</label>
            <input
              className="form-control"
              value={filme.nome}
              onChange={(e) => setFilme({ ...filme, nome: e.target.value })}
              required
            />
          </div>
          <div className="mb-2">
            <label>Gênero</label>
            <input
              className="form-control"
              value={filme.genero}
              onChange={(e) => setFilme({ ...filme, genero: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label>Ano</label>
            <input
              type="number"
              className="form-control"
              value={filme.ano}
              onChange={(e) => setFilme({ ...filme, ano: e.target.value })}
              required
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success">Alterar</button>
            <Link to="/" className="btn btn-secondary">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
