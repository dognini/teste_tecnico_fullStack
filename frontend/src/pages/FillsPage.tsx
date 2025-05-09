import { useState, useEffect } from 'react'

import { getFills } from '@/services/api'

import { Fill } from '@/interfaces/interfaces'

import FillForm from '@/components/FillForm'
import FillTable from '@/components/FillTable'

const FillsPage = () => {
    const [fills, setFills] = useState<Fill[]>([]);

    const buscarFills = async () => {
        try {
            const response = await getFills();
            setFills(response.data);
        } catch (error) {
            console.error('Error fetching fills:', error);
        };
    };

    useEffect(() => {
        buscarFills();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Preenchimento de Campos</h1>
            <FillForm onFillCreated={buscarFills} />
            <FillTable fills={fills} />
        </div>
    );
};

export default FillsPage;