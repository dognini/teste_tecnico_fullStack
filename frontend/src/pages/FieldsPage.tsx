import { useState, useEffect } from 'react'

import { getFields } from '@/services/api'

import { Field } from '@/interfaces/interfaces'

import FieldForm from '@/components/FieldForm'
import FieldTable from '@/components/FieldTable'

const FieldsPage = () => {
    const [fields, setFields] = useState<Field[]>([]);

    const buscarFields = async () => {
        try {
            const response = await getFields();
            setFields(response.data);
        } catch (erro) {
            console.error(erro);
        }
    };

    useEffect(() => {
        buscarFields();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Gerenciamento de Campos</h1>
            <FieldForm onFieldCreated={buscarFields} />
            <FieldTable fields={fields} />
        </div>
    );
};

export default FieldsPage