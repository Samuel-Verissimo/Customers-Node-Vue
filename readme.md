# Gerenciamento de Clientes

Uma aplicação completa para gerenciamento de clientes, construída com **Vue 3**, **Vuetify**, **Node.js** e **MySQL**. A aplicação oferece funcionalidade de CRUD, integração com a API de CEP (ViaCEP), e utiliza Docker para simplificar o processo de execução.

## 🚀 Tecnologias Utilizadas

- **Frontend**: Vue 3, Vuetify, Vue Good Table
- **Backend**: Node.js, Express.js, MySQL
- **Banco de Dados**: MySQL
- **Integração**: ViaCEP 
- **Containerização**: Docker e Docker Compose

---

## 🛠️ Configuração e Execução

### Pré-requisitos

Certifique-se de ter instalado:

- **Docker**: [Instalar Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone git@github.com:Samuel-Verissimo/Customers-Node-Vue.git
   cd Customers-Node-Vue
   ```

2. **Suba os containers com Docker Compose**

   ```bash
   docker-compose up --build -d
   ```

3. **Acesse a aplicação**

   - **Frontend**: [http://localhost:85](http://localhost:85)
   - **Backend** (API): [http://localhost:3001/api/v1/clients](http://localhost:3001/api/v1/clients)

---

## 🔥 Endpoints Disponíveis

### **Base URL**: `/api/v1/clients`

| Método | Endpoint       | Descrição                                      |
|--------|----------------|-----------------------------------------------|
| GET    | `/`            | Lista todos os clientes ou filtra por campos. |
| GET    | `/:id`         | Retorna os dados de um cliente específico.    |
| POST   | `/`            | Cria um novo cliente.                         |
| PUT    | `/:id`         | Atualiza os dados de um cliente existente.    |
| DELETE | `/:id`         | Remove um cliente pelo ID.                    |

### **Exemplo de Payload para Criação de Cliente (POST)**

```json
{
  "Codigo": "12345",
  "Nome": "João Silva",
  "CPF_CNPJ": "123.456.789-00",
  "CEP": "01001000",
  "Logradouro": "Praça da Sé",
  "Endereco": "Praça da Sé",
  "Numero": "123",
  "Bairro": "Centro",
  "Cidade": "São Paulo",
  "UF": "SP",
  "Complemento": "Apto 101",
  "Fone": "11999999999",
  "LimiteCredito": 5000.50,
  "Validade": "2025-12-31"
}
```
---

## 🌟 Melhorias Futuras

1. **Autenticação JWT**:
   - Implementar autenticação para proteger os endpoints, garantindo que apenas usuários autorizados possam acessar a aplicação.

2. **Upload de Arquivos**:
   - Adicionar suporte para upload de arquivos (ex.: fotos ou documentos relacionados aos clientes), armazenando-os no servidor ou em um serviço de armazenamento em nuvem.

3. **Paginação no Backend**:
   - Melhorar a performance implementando paginação diretamente no backend, em vez de apenas no frontend.

4. **Notificações em Tempo Real**:
   - Adicionar notificações em tempo real usando WebSockets para alertar os usuários sobre mudanças na base de dados.
