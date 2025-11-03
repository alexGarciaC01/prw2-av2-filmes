import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Inicio() {
  const [filmes, setFilmes] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    carregarFilmes();
  }, []);

  const carregarFilmes = () => {
    axios
      .get(BASE_URL)
      .then((res) => setFilmes(res.data))
      .catch((err) => console.error(err));
  };

  const abrirModal = (id) => {
    setIdSelecionado(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/${idSelecionado}`)
      .then(() => {
        setFilmes((prev) => prev.filter((filme) => filme.id !== idSelecionado));
        setShowModal(false);
        setIdSelecionado(null);
      })
      .catch((err) => {
        console.error(err);
        setShowModal(false);
      });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">🎞️ Filmes Cadastrados</h2>
        <Link to="/criar" className="btn btn-success shadow">
          + Novo Filme
        </Link>
      </div>

      <div className="card shadow">
        <table className="table table-hover mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filmes.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Nenhum filme cadastrado.
                </td>
              </tr>
            ) : (
              filmes.map((filme) => (
                <tr key={filme.id}>
                  <td>{filme.id}</td>
                  <td>{filme.nome}</td>
                  <td>{filme.genero}</td>
                  <td>{filme.ano}</td>
                  <td>
                    <Link
                      to={`/ler/${filme.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Ler
                    </Link>
                    <Link
                      to={`/alterar/${filme.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Alterar
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => abrirModal(filme.id)}
                    >
                      Apagar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {}
      {showModal && (
        <div className="modal fade show">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg border-0">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirmar exclusão</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Tem certeza que deseja apagar o filme com <br />
                  <strong>ID {idSelecionado}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
