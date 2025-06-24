import { useRef, useEffect } from "react";
import type { FormEvent } from "react";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

interface UpdateCustomerModalProps {
  customer: CustomerProps;
  onClose: () => void;
  onUpdateSuccess: (updatedCustomer: CustomerProps) => void;
}

export default function UpdateCustomerModal({
  customer,
  onClose,
  onUpdateSuccess,
}: UpdateCustomerModalProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.value = customer.name;
    }
    if (emailRef.current) {
      emailRef.current.value = customer.email;
    }
  }, [customer]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current || !emailRef.current) return;

    try {
      const response = await api.put(`/customer/${customer.id}`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });

      console.log("Dados retornados pela API após atualização:", response.data);

      onUpdateSuccess(response.data.customer);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Atualizar Cliente
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label
            htmlFor="update-name"
            className="font-semibold text-lg text-white"
          >
            Nome
          </label>
          <input
            id="update-name"
            type="text"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            ref={nameRef}
            required
          />

          <label
            htmlFor="update-email"
            className="font-semibold text-lg text-white"
          >
            Email
          </label>
          <input
            id="update-email"
            type="email"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            ref={emailRef}
            required
          />

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 p-3 bg-green-600 text-white font-bold rounded-md text-lg hover:bg-green-700 transition-colors duration-200 shadow-lg"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 p-3 bg-red-600 text-white font-bold rounded-md text-lg hover:bg-red-700 transition-colors duration-200 shadow-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
