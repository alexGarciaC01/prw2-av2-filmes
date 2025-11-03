import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Criar() {
  const [values, setValues] = useState({ nome: "", genero: "", ano: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL, values)
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="card shadow p-4">
      <h3 className="text-success mb-3">🎬 Adicionar Filme</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Nome</label>
          <input
            className="form-control"
            required
            onChange={(e) => setValues({ ...values, nome: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label>Gênero</label>
          <input
            className="form-control"
            required
            onChange={(e) => setValues({ ...values, genero: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label>Ano</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => setValues({ ...values, ano: e.target.value })}
          />
        </div>
        <button className="btn btn-success me-2">Criar</button>
        <Link to="/" className="btn btn-secondary">
          Cancelar
        </Link>
      </form>
    </div>
  );
}
