import { useState } from 'react'

import { createField } from '@/services/api'

const FieldForm = ({ onFieldCreated }: { onFieldCreated: () => void }) => {
    const [name, setName] = useState('');
    const [datatype, setDatatype] = useState('string');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createField({ name, datatype });
            setName('');
            setDatatype('string');
            onFieldCreated();
        } catch (error) {
            console.error('Error creating field:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Criar Novo Campo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Dados</label>
                    <select
                        value={datatype}
                        onChange={(e) => setDatatype(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="string">Texto</option>
                        <option value="number">Número</option>
                        <option value="boolean">Booleano</option>
                        <option value="date">Data</option>
                    </select>
                </div>
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Salvar Campo
            </button>
        </form>
    );
};

export default FieldForm;