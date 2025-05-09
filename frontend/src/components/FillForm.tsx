import { useState, useEffect } from 'react'

import { Field } from '@/interfaces/interfaces'
import { createFill, getFields } from '@/services/api'

const FillForm = ({ onFillCreated }: { onFillCreated: () => void }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedFieldId, setSelectedFieldId] = useState('');

    useEffect(() => {
        const buscarFields = async () => {
            try {
                const response = await getFields();
                setFields(response.data);
            } catch (erro) {
                console.error(erro);
            };
        };

        buscarFields();
    }, []);

    const selectedField = fields.find(field => field.id === selectedFieldId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedFieldId) {
            setError('Selecione um campo');
            return;
        };

        let parsedValue: string | number | boolean = value;

        try {
            switch (selectedField?.dataType) {
                case 'number':
                    parsedValue = parseFloat(value);
                    if (isNaN(parsedValue)) throw new Error('Valor inválido para número');
                    break;
                case 'boolean':
                    parsedValue = value.toLowerCase() === 'true';
                    break;
                case 'date':
                    if (!Date.parse(value)) throw new Error('Data inválida');
                    break;
            };

            await createFill({ fieldId: selectedFieldId, value: parsedValue });

            setSelectedFieldId('');
            setValue('');
            setError('');
            onFillCreated();
        } catch (erro) {
            setError(erro instanceof Error ? erro.message : 'Erro ao salvar preenchimento');
        };
    };

    const renderInput = () => {
        if (!selectedField) return null;

        console.log(selectedField.dataType);

        switch (selectedField.dataType) {
            case 'boolean':
                return (
                    <select
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Selecione</option>
                        <option value="true">Sim</option>
                        <option value="false">Não</option>
                    </select>
                );
            case 'date':
                return (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                );
            default:
                return (
                    <input
                        type={selectedField.dataType === 'number' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Adicionar Preenchimento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Campo</label>
                    <select
                        value={selectedFieldId}
                        onChange={(e) => {
                            setSelectedFieldId(e.target.value);
                            setValue('');
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Selecione um campo</option>
                        {fields.map((field) => (
                            <option key={field.id} value={field.id}>
                                {field.name}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedField && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                        {renderInput()}
                    </div>
                )}
            </div>
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                disabled={!selectedFieldId}
            >
                Salvar Preenchimento
            </button>
        </form>
    );
};

export default FillForm;