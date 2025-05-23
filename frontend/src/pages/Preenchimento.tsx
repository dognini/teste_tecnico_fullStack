import 'react-toastify/dist/ReactToastify.css'

import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import axios from 'axios'
import { Campo, Preenchimento } from '@/interfaces/interfaces'

const Preenchimentos = () => {
    const [campos, setCampos] = useState<Campo[]>([]);
    const [preenchimentos, setPreenchimentos] = useState<Preenchimento[]>([]);
    const [newPreenchimento, setNewPreenchimento] = useState<{ fieldId: number | null, value: string | number | boolean }>({
        fieldId: null,
        value: ''
    });
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const [camposResponse, preenchimentosResponse] = await Promise.all([
                    axios.get('http://localhost:3333/campos'),
                    axios.get('http://localhost:3333/preenchimentos')
                ]);

                setCampos(camposResponse.data);
                setPreenchimentos(preenchimentosResponse.data);
            } catch (error) {
                toast.error('Erro ao carregar dados');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleValueChange = (value: string, datatype: string) => {
        let parsedValue: string | number | boolean = value;

        try {
            switch (datatype) {
                case 'number':
                    parsedValue = parseFloat(value);
                    if (isNaN(parsedValue)) throw new Error('Valor inválido para número');
                    break;
                case 'boolean':
                    parsedValue = value.toLowerCase() === 'true';
                    break;
                case 'date':
                    if (isNaN(Date.parse(value))) throw new Error('Data inválida');
                    parsedValue = new Date(value).toISOString();
                    break;
                default:
                    parsedValue = value;
            }
            
            setNewPreenchimento(prev => ({ ...prev, value: parsedValue }));
        } catch (error) {
            toast.error('Valor não corresponde ao tipo do campo');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newPreenchimento.fieldId) {
            toast.error('Selecione um campo');
            return;
        }

        if (newPreenchimento.value === '') {
            toast.error('Preencha um valor');
            return;
        }

        setFormLoading(true);
        try {
            await axios.post('http://localhost:3333/preenchimentos', newPreenchimento);
            toast.success('Preenchimento salvo com sucesso!');
            setNewPreenchimento({ fieldId: null, value: '' });

            const response = await axios.get('http://localhost:3333/preenchimentos');
            setPreenchimentos(response.data);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Erro ao salvar preenchimento');
        } finally {
            setFormLoading(false);
        }
    };

    const getSelectedCampo = () => {
        return campos.find(c => c.id === newPreenchimento.fieldId);
    };

    const renderValueInput = () => {
        const campo = getSelectedCampo();

        if (!campo) return null;

        switch (campo.datatype) {
            case 'boolean':
                return (
                    <select
                        value={newPreenchimento.value as string}
                        onChange={(e) => setNewPreenchimento({
                            ...newPreenchimento,
                            value: e.target.value === 'true'
                        })}
                        className="form-select"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="true">Verdadeiro</option>
                        <option value="false">Falso</option>
                    </select>
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={newPreenchimento.value as string}
                        onChange={(e) => handleValueChange(e.target.value, 'date')}
                        className="form-input"
                        required
                    />
                );
            case 'number':
                return (
                    <input
                        type="number"
                        step="any"
                        value={newPreenchimento.value as string}
                        onChange={(e) => handleValueChange(e.target.value, 'number')}
                        className="form-input"
                        required
                    />
                );
            default:
                return (
                    <input
                        type="text"
                        value={newPreenchimento.value as string}
                        onChange={(e) => setNewPreenchimento({
                            ...newPreenchimento,
                            value: e.target.value
                        })}
                        className="form-input"
                        required
                    />
                );
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <h1>Gerenciar Preenchimentos</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <h2 className="form-title">Adicionar Preenchimento</h2>
                <div className="form-group">
                    <label className="form-label">Campo:</label>
                    <select
                        value={newPreenchimento.fieldId ?? ''}
                        onChange={(e) => setNewPreenchimento({ ...newPreenchimento, fieldId: parseInt(e.target.value) })}
                        className="form-select"
                        required
                    >
                        <option value="">Selecione um campo</option>
                        {campos.map((campo) => (
                            <option key={campo.id} value={campo.id}>
                                {campo.name}
                            </option>
                        ))}
                    </select>
                </div>
                {newPreenchimento.fieldId && (
                    <div className="form-group">
                        <label className="form-label">Valor:</label>
                        {renderValueInput()}
                    </div>
                )}
                <button
                    type="submit"
                    className="form-button"
                    disabled={formLoading || !newPreenchimento.fieldId}
                >
                    {formLoading ? 'Salvando...' : 'Salvar Preenchimento'}
                </button>
            </form>
            <div>
                <h2 className="form-title">Preenchimentos Existentes</h2>
                {loading ? (
                    <p>Carregando preenchimentos...</p>
                ) : (
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Campo</th>
                                    <th>Tipo</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                </tr>
                            </thead>
                            <tbody>
                                {preenchimentos.map((p) => (
                                    <tr key={p.id}>
                                        <td>{p?.name || p.fieldId}</td>
                                        <td>{p?.value || '?'}</td>
                                        <td>{String(p.value)}</td>
                                        <td>{p.createdAt ? new Date(p.createdAt).toLocaleString() : 'Data inválida'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Preenchimentos