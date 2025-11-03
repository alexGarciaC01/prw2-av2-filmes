// src/componentes/Ler.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Ler() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/${id}`)
      .then((res) => {
        console.log("🔍 Dados recebidos da API:", res.data); // <-- debug temporário
        setFilme(res.data);
      })
      .catch((err) => console.error("Erro ao buscar filme:", err));
  }, [id]);

  if (!filme) return <p>Carregando...</p>;

  return (
    <div className="card shadow p-4">
      <h3 className="text-primary mb-3">📖 Detalhes do Filme</h3>
      <p><strong>ID:</strong> {filme.id}</p>
      <p><strong>Nome:</strong> {filme.nome}</p>
      <p><strong>Gênero:</strong> {filme.genero}</p>
      <p><strong>Ano:</strong> {filme.ano}</p>

      <div className="mt-3">
        <Link to={`/alterar/${filme.id}`} className="btn btn-primary me-2">
          Editar
        </Link>
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </div>
    </div>
  );
}
