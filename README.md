# Client Register Frontend

![Demonstração da API](https://github.com/EdSantiag0/client-register-frontend/blob/desenvolvimento/assets/image.png)

## Descrição

O **Client Register Frontend** é uma aplicação web desenvolvida em React para gerenciamento de clientes, permitindo o cadastro, listagem, edição e remoção de registros de forma simples e eficiente.  
O projeto foi construído com foco em usabilidade, validação robusta de dados e experiência do usuário, utilizando as melhores práticas do ecossistema React moderno.

Esta aplicação consome uma API REST desenvolvida pelo próprio autor, garantindo total controle sobre o fluxo de dados e a integração entre frontend e backend.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) (validação de formulários)
- [Tailwind CSS](https://tailwindcss.com/)

## Funcionalidades

- Cadastro de novos clientes
- Listagem de clientes cadastrados
- Edição de dados do cliente
- Remoção de clientes com confirmação
- Validação de formulários com Zod

## Como rodar o projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/client-register-frontend.git
   cd client-register-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Estrutura de Pastas

- `src/App.tsx` — Componente principal e controle de views
- `src/CustomerList.tsx` — Listagem de clientes
- `src/RegisterCustomer.tsx` — Cadastro de clientes
- `src/UpdateCustomerModal.tsx` — Edição de clientes

## Observações

- Certifique-se de que o backend da API de clientes esteja rodando.
- As validações de formulário são feitas com Zod.

---

## Autor

Desenvolvido por [Ed Santiago.](https://github.com/EdSantiag0)
