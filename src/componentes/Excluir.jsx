import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../api";

export default function Apagar() {
  const [id, setId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/${id}`)
      .then(() => {
        setMensagem("🎬 Filme apagado com sucesso!");
        setShowModal(false);
        setId("");
      })
      .catch(() => {
        setMensagem("❌ Erro ao apagar filme.");
        setShowModal(false);
      });
  };

  return (
    <div className="card shadow p-4 text-center">
      <h3 className="text-danger mb-3">🗑️ Apagar Filme</h3>

      {/*ID e botões */}
      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <input
          className="form-control w-50"
          placeholder="Digite o ID do filme"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className="btn btn-danger"
          disabled={!id}
          onClick={() => setShowModal(true)} // <-- Abre o modal
        >
          Apagar
        </button>
        <Link to="/" className="btn btn-secondary">
          Voltar
        </Link>
      </div>

      {}
      {mensagem && <div className="alert alert-info mt-3">{mensagem}</div>}

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
                  <strong>ID {id}</strong>?
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
