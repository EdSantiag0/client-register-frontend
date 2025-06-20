import { useRef } from "react";
import type { FormEvent } from "react";
import { api } from "./services/api";

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

interface RegisterCustomerProps {
  setCustomers: React.Dispatch<React.SetStateAction<CustomerProps[]>>;
  onRegistrationSuccess: () => void;
  onBackToList: () => void;
}

export default function RegisterCustomer({
  setCustomers,
  onRegistrationSuccess,
  onBackToList,
}: RegisterCustomerProps) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!nameRef.current || !emailRef.current) {
      console.error("Nome ou email não preenchidos.");
      return;
    }

    try {
      const response = await api.post("/customer", {
        name: nameRef.current.value,
        email: emailRef.current.value,
      });

      setCustomers((allCustomers) => [...allCustomers, response.data]);

      nameRef.current.value = "";
      emailRef.current.value = "";

      onRegistrationSuccess();
    } catch (error) {
      console.error("Erro ao registrar cliente:", error);
    }
  }

  return (
    <form
      className="flex flex-col gap-4 my-6 p-6 bg-gray-700 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {/* NOME */}
      <label htmlFor="name" className="font-semibold text-lg text-white">
        Nome
      </label>
      <input
        id="name"
        type="text"
        placeholder="Digite o nome do cliente..."
        className="w-full p-3 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        ref={nameRef}
        required
      />

      {/* EMAIL */}
      <label htmlFor="email" className="font-semibold text-lg text-white">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="Digite o email do cliente..."
        className="w-full p-3 rounded-md bg-gray-600 text-white placeholder-gray-400 border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        ref={emailRef}
        required
      />

      <button
        type="submit"
        className="cursor-pointer w-full p-3 bg-green-600 text-white font-bold rounded-md text-lg hover:bg-green-700 transition-colors duration-200 shadow-lg mt-4"
        onClick={handleSubmit}
      >
        Cadastrar
      </button>

      <button
        type="button"
        className="cursor-pointer w-full p-3 bg-indigo-600 text-white font-bold rounded-md text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg mt-2"
        onClick={onBackToList}
      >
        Voltar para a Lista
      </button>
    </form>
  );
}
