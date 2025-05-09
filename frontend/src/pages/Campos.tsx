import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { Campo } from '@/interfaces/interfaces'

const Campos: React.FC = () => {
    const [campos, setCampos] = useState<Campo[]>([]);
    const [loading, setLoading] = useState(false);
    const [newCampo, setNewCampo] = useState({
        name: '',
        datatype: 'string' as const
    });

    useEffect(() => {
        getCampos();
    }, []);

    const getCampos = async () => {
        try {
            const response = await axios.get('http://localhost:3333/campos');
            setCampos(response.data);
        } catch (error) {
            toast.error('Erro ao carregar campos');
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:3333/campos', newCampo);
            toast.success('Campo criado com sucesso!');
            setNewCampo({ name: '', datatype: 'string' });
            await getCampos();
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Erro ao criar campo');
        } finally {
            setLoading(false);
        };
    };

    return (
        <div className="container">
            <ToastContainer />
            <h1>Gerenciar Campos</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Criar Novo Campo</h2>
                <div className="form-group">
                    <label className="form-label">Nome do Campo:</label>
                    <input
                        type="text"
                        value={newCampo.name}
                        onChange={(e) => setNewCampo({ ...newCampo, name: e.target.value })}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Tipo de Dado:</label>
                    <select
                        value={newCampo.datatype}
                        onChange={(e) => setNewCampo({ ...newCampo, datatype: e.target.value as any })}
                        className="form-select"
                    >
                        <option value="">Selecione um campo</option>
                        <option value="string">Texto</option>
                        <option value="number">Número</option>
                        <option value="boolean">Booleano</option>
                        <option value="date">Data</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="form-button"
                    disabled={loading}
                >
                    {loading ? 'Salvando...' : 'Salvar Campo'}
                </button>
            </form>
            <div>
                <h2 className="form-title">Campos Existentes</h2>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Tipo de Dado</th>
                                <th>Data de Criação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campos.map((campo) => (
                                <tr key={campo.id}>
                                    <td>{campo.name}</td>
                                    <td>{campo.dataType}</td>
                                    <td>{campo.createdAt ? new Date(campo.createdAt).toLocaleString() : 'Data não disponível'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Campos;