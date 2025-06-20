import { FiTrash } from "react-icons/fi";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

interface CustomerListProps {
  customers: CustomerProps[];
  setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>;
  onRegisterNewClick: () => void;
}

export default function CustomerList({
  customers,
  setCustomers,
  onRegisterNewClick,
}: CustomerListProps) {
  async function handleDelete(id: string) {
    try {
      await api.delete(`/customer/${id}`);

      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  }

  return (
    <section className="flex flex-col gap-4 mt-8">
      <button
        onClick={onRegisterNewClick}
        className="cursor-pointer w-full p-3 bg-indigo-600 text-white font-bold rounded-md text-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg mb-4"
      >
        Registrar Novo Cliente
      </button>

      {customers.length === 0 && (
        <p className="text-white text-center text-lg italic">
          Nenhum cliente cadastrado ainda.
        </p>
      )}

      {customers.map((customer) => (
        <article
          key={customer.id}
          className="w-full bg-gray-700 rounded-lg p-5 relative hover:scale-[1.02] duration-200 shadow-lg border border-gray-600"
        >
          <p className="text-white text-lg mb-1">
            <span className="font-bold text-blue-300">Nome:</span>{" "}
            {customer.name}
          </p>
          <p className="text-white text-lg mb-1">
            <span className="font-bold text-blue-300">Email:</span>{" "}
            {customer.email}
          </p>
          <p className="text-white text-lg">
            <span className="font-bold text-blue-300">Status:</span>{" "}
            {customer.status ? (
              <span className="text-green-500 font-semibold">Ativo</span>
            ) : (
              <span className="text-red-500 font-semibold">Inativo</span>
            )}
          </p>

          <div className="absolute top-3 right-3">
            <button
              className="bg-red-600 w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-200 hover:bg-red-700 shadow-md"
              onClick={() => handleDelete(customer.id)}
              aria-label={`Deletar cliente ${customer.name}`}
            >
              <FiTrash size={20} color="#FFF" />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
