# TeamsQulture — Gestão de Empresas e Colaboradores

Aplicação **fullstack** para cadastro de empresas, colaboradores e estrutura organizacional hierárquica.

Desenvolvida com arquitetura desacoplada (Rails API + React), seguindo boas práticas de código, testes e usabilidade.

---

## Tecnologias Utilizadas

| Camada       | Tecnologias                                             |
| ------------ | ------------------------------------------------------- |
| **Backend**  | Ruby on Rails 7 (API), PostgreSQL, RSpec, FactoryBot    |
| **Frontend** | React, Vite, TailwindCSS, Zustand, React Hook Form, Yup |
| **Testes**   | RSpec, Jest, React Testing Library, cURL                |

---

## Como Rodar o Projeto

### Backend (Rails API)

**Pré-requisitos:**

* Ruby 3.0+
* PostgreSQL

```bash
bundle install
rails db:create db:migrate
rails s
# Acesse: http://localhost:3000
```

### Frontend (React + Vite)

**Pré-requisitos:**

* Node.js 20+
* Yarn (opcional)
  
```bash
# Acesse o diretório do frontend
cd teams-qulture/frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Acesse no navegador:
# http://localhost:5173
```
---

## 👤 Usuário de Teste

**Superadmin:**
`Email: superadmin@qulture.com`

---

## Exemplos de Requisições (cURL)

### 🏢 Empresas

```bash
# Criar empresa
curl -X POST http://localhost:3000/companies \
  -H "Content-Type: application/json" \
  -d '{"company": {"name": "Empresa Teste"}}'

# Listar empresas
curl -X GET http://localhost:3000/companies
```

### 👥 Colaboradores

```bash
# Criar colaborador
curl -X POST http://localhost:3000/companies/1/employees \
  -H "Content-Type: application/json" \
  -d '{
    "employee": {
      "name": "João",
      "email": "joao@empresa.com",
      "picture": "https://via.placeholder.com/150"
    }
  }'

# Listar colaboradores
curl -X GET http://localhost:3000/companies/1/employees

# Deletar colaborador
curl -X DELETE http://localhost:3000/companies/1/employees/2
```

### 📊 Organograma

```bash
# Definir gestor
curl -X POST http://localhost:3000/companies/1/employees/3/set_manager \
  -H "Content-Type: application/json" \
  -d '{"manager_id": 1}'

# Ver pares (peers)
curl -X GET http://localhost:3000/companies/1/employees/3/peers

# Ver liderados diretos
curl -X GET http://localhost:3000/companies/1/employees/1/subordinates

# Ver liderados de segundo nível
curl -X GET http://localhost:3000/companies/1/employees/1/second_level_sub
```
---
## Considerações finais

Este projeto foi desenvolvido com foco em:

- Separação clara entre frontend e backend
- Facilidade de testes manuais e automatizados
- Consistência visual e componentização no React

focado na entrega das *user stories* propostas.
