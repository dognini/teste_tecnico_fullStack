import { Fill } from "@/interfaces/interfaces"

const FillTable = ({ fills }: { fills: Fill[] }) => {
    return (
        <div className="overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4">Preenchimentos Existentes</h2>
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-2 px-4 text-left">Campo</th>
                        <th className="py-2 px-4 text-left">Valor</th>
                        <th className="py-2 px-4 text-left">Data de Criação</th>
                    </tr>
                </thead>
                <tbody>
                    {fills.map((fill) => (
                        <tr key={fill.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="py-2 px-4">{fill.name}</td>
                            <td className="py-2 px-4">{String(fill.value)}</td>
                            <td className="py-2 px-4">{new Date(fill.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FillTable;