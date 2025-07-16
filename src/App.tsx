import { useEffect, useState } from "react";
import { api } from "./services/api";
import RegisterCustomer from "./RegisterCustomer";
import CustomerList from "./CustomerList";
import UpdateCustomerModal from "./UpdateCustomerModal";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

type ViewType = "list" | "register";

export default function App() {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [currentView, setCurrentView] = useState<ViewType>("list");
  const [editingCustomer, setEditingCustomer] = useState<CustomerProps | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);

  async function loadCustomers() {
    try {
      setIsLoading(true);
      const response = await api.get("/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  {
    /* função de Alternar Visualisação */
  }
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    if (view === "list") {
      loadCustomers();
    }
  };

  {
    /* função de ATUALIZAR*/
  }
  const handleCustomerUpdated = (updatedCustomer: CustomerProps) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  {
    /* função de DELETAR */
  }
  const handleCustomerDelete = async (id: string, name: string) => {
    const confirmDelete = window.confirm(
      `Você tem certeza que deseja deletar cliente ${name}?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/customer/${id}`);
      const allCustomers = customers.filter((customer) => customer.id !== id);
      setCustomers(allCustomers);
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center items-start px-4 font-inter">
      <main className="my-10 w-full md:max-w-2xl bg-gray-800 p-6 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Registro de Clientes
        </h1>
        {currentView === "list" ? (
          <CustomerList
            customers={customers}
            onRegisterNewClick={() => handleViewChange("register")}
            onEditClick={setEditingCustomer}
            onDeleteClick={handleCustomerDelete}
            isLoading={isLoading}
          />
        ) : (
          <RegisterCustomer
            setCustomers={setCustomers}
            onRegistrationSuccess={() => handleViewChange("list")}
            onBackToList={() => handleViewChange("list")}
          />
        )}

        {editingCustomer && (
          <UpdateCustomerModal
            customer={editingCustomer}
            onClose={() => setEditingCustomer(null)}
            onUpdateSuccess={handleCustomerUpdated}
          />
        )}
      </main>
    </div>
  );
}
