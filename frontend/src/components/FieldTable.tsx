import { Field } from "@/interfaces/interfaces"

const FieldTable = ({ fields }: { fields: Field[] }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Campos Cadastrados</h2>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Nome</th>
                        <th className="py-2 px-4 text-left">Tipo de Dados</th>
                        <th className="py-2 px-4 text-left">Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {fields.map((field) => (
                        <tr key={field.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4">{field.name}</td>
                            <td className="py-2 px-4">{field.dataType}</td>
                            <td className="py-2 px-4">{new Date(field.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FieldTable;