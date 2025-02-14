### Relatório do Trabalho: Desenvolvimento de uma API REST para Gestão de Agendamentos de Academia

---

#### 1. **Introdução**

Este relatório descreve o desenvolvimento de uma **API REST** para gestão de agendamentos de uma academia, seguindo uma abordagem **Design-first**. A API foi desenvolvida utilizando **Node.js** como servidor aplicacional e **MySQL** como sistema de gestão de base de dados (SGBD). O objetivo principal foi disponibilizar recursos para uma aplicação web que permita a gestão de agendamentos de aulas, instrutores, utilizadores e feedbacks.

A API foi documentada utilizando o formato **OpenAPI 3.0** e disponibiliza uma **Collection** para o **Postman** para facilitar a consulta dos recursos. Além disso, a aplicação foi configurada para funcionar num ambiente **multi-container** utilizando **Docker**, com duas imagens: uma para o MySQL e outra para o Node.js.

---

#### 2. **Tema do Trabalho**

O tema escolhido para este trabalho foi **"Gestão de Agendamentos de Academia"**. A API desenvolvida permite a gestão de:

- **Utilizadores**: Registo e autenticação de utilizadores (administradores e membros).
- **Instrutores**: Registo de instrutores e as suas especialidades.
- **Agendamentos**: Criação, leitura, atualização e eliminação de agendamentos de aulas.
- **Feedbacks**: Registo de feedbacks dos utilizadores sobre as aulas.

A escolha deste tema foi sugerida ao docente devido à sua relevância prática e à possibilidade de explorar relações de cardinalidade entre entidades, como a relação **1:n** entre **Agendamentos** e **Feedbacks**, e a relação **m:n** entre **Utilizadores** e **Agendamentos**.

---

#### 3. **Base de Dados**

A base de dados foi projetada para suportar os serviços da API e foi preenchida com dados suficientes para a apresentação do trabalho. Foram criadas as seguintes tabelas:

1. **Users**: Armazena informações dos utilizadores (nome, email, senha, role).
2. **Instructors**: Armazena informações dos instrutores (nome, especialidade, email, telefone).
3. **Schedules**: Armazena os agendamentos de aulas (nome da aula, data, horário, instrutor responsável, utilizador que reservou).
4. **Feedback**: Armazena os feedbacks dos utilizadores sobre as aulas (classificação, comentário, data de criação).

Cada tabela foi preenchida com **30 registos** para garantir um volume de dados suficiente para a demonstração.

---

#### 4. **Arquitetura de Serviços REST**

A API foi desenvolvida seguindo os princípios da arquitetura REST, com os seguintes requisitos mínimos atendidos:

- **Verbos HTTP**: Foram utilizados os métodos **GET**, **POST**, **PUT** e **DELETE** para operações CRUD (Criar, Ler, Atualizar e Eliminar).
- **Recursos Disponibilizados**:
  1. **Users**: Gestão de utilizadores.
  2. **Instructors**: Gestão de instrutores.
  3. **Schedules**: Gestão de agendamentos de aulas.
  4. **Feedback**: Gestão de feedbacks dos utilizadores.
- **Relação de Cardinalidade 1:n**: A relação entre **Schedules** e **Feedback** é de **1:n**, onde um agendamento pode ter vários feedbacks.
- **Relação de Cardinalidade m:n**: A relação entre **Users** e **Schedules** é de **m:n**, onde um utilizador pode reservar vários agendamentos, e um agendamento pode ser reservado por vários utilizadores.
- **Representação dos Recursos**: Os recursos são representados em formato **JSON**.
- **Documentação da API**: A API foi documentada utilizando o formato **OpenAPI 3.0**, com descrição detalhada dos endpoints, parâmetros e respostas.

---

#### 5. **Implementação**

##### 5.1. **Tecnologias Utilizadas**
- **Node.js**: Servidor aplicacional para implementação da camada de serviços.
- **MySQL**: SGBD para armazenamento dos dados.
- **Docker**: Configuração multi-container para execução do MySQL e Node.js.
- **Express.js**: Framework para criação da API REST.
- **Swagger**: Documentação da API no formato OpenAPI 3.0.
- **Postman**: Criação de uma Collection para teste dos endpoints.

##### 5.2. **Estrutura do Projeto**
- **`docker-compose.yml`**: Configuração dos containers Docker para MySQL e Node.js.
- **`init.sql`**: Script SQL para inicialização da base de dados e inserção de dados iniciais.
- **`package.json`**: Dependências do projeto, incluindo `mysql2` para conexão com a base de dados.
- **`README.md`**: Instruções para execução do servidor e acesso à documentação da API.

##### 5.3. **Endpoints da API**
A API disponibiliza os seguintes endpoints:

1. **Users**:
   - `GET /users`: Lista todos os utilizadores.
   - `POST /users`: Cria um novo utilizador.
   - `PUT /users/:id`: Atualiza um utilizador existente.
   - `DELETE /users/:id`: Remove um utilizador.

2. **Instructors**:
   - `GET /instructors`: Lista todos os instrutores.
   - `POST /instructors`: Cria um novo instrutor.
   - `PUT /instructors/:id`: Atualiza um instrutor existente.
   - `DELETE /instructors/:id`: Remove um instrutor.

3. **Schedules**:
   - `GET /schedules`: Lista todos os agendamentos.
   - `POST /schedules`: Cria um novo agendamento.
   - `PUT /schedules/:id`: Atualiza um agendamento existente.
   - `DELETE /schedules/:id`: Remove um agendamento.

4. **Feedback**:
   - `GET /feedback`: Lista todos os feedbacks.
   - `POST /feedback`: Cria um novo feedback.
   - `PUT /feedback/:id`: Atualiza um feedback existente.
   - `DELETE /feedback/:id`: Remove um feedback.

---

#### 6. **Configuração Multi-Container**

A aplicação foi configurada para funcionar num ambiente **multi-container** utilizando **Docker**. O ficheiro `docker-compose.yml` define dois serviços:

1. **MySQL**: Base de dados com configuração de utilizador, senha e base de dados.
2. **Node.js**: Servidor da API, que depende da base de dados para funcionar.

Para executar a aplicação, basta rodar o comando:

```bash
docker-compose up --build
ou
docker compose up
```

---

#### 7. **Documentação da API**

A API foi documentada utilizando o formato **OpenAPI 3.0**, com descrição detalhada dos endpoints, parâmetros e respostas. A documentação pode ser acessada através da interface **Swagger UI** no endereço:

```
http://localhost:3000/docs
```

---

#### 8. **Conclusão**

Este trabalho demonstrou a aplicação dos conceitos de desenvolvimento de APIs REST utilizando uma abordagem **Design-first**. A API desenvolvida atende a todos os requisitos mínimos obrigatórios, incluindo a utilização de verbos HTTP, relações de cardinalidade e documentação no formato OpenAPI 3.0.

A configuração multi-container utilizando Docker facilita a execução e o teste da aplicação em diferentes ambientes. A base de dados foi preenchida com dados suficientes para a apresentação do trabalho, garantindo a funcionalidade e a usabilidade da API.

---

#### 9. **Resultados Entregues**

- **API REST**: Implementação completa da API com endpoints para gestão de utilizadores, instrutores, agendamentos e feedbacks.
- **Relatório**: Este documento, que descreve o desenvolvimento, a arquitetura e a implementação da API.
- **Collection do Postman**: Disponibilizada para teste dos endpoints da API.
- **Configuração Docker**: Ficheiro `docker-compose.yml` para execução multi-container.

---

#### 10. **Sugestões para Melhorias Futuras**

- Implementação de autenticação e autorização (JWT) para garantir a segurança da API.
- Adição de mais filtros e parâmetros de consulta para melhorar a flexibilidade dos endpoints.
- Integração com um front-end para criar uma aplicação web completa.

---

#### 11. **Referências**

- Documentação oficial do **Node.js**: https://nodejs.org/
- Documentação oficial do **MySQL**: https://dev.mysql.com/doc/
- Documentação oficial do **Docker**: https://docs.docker.com/
- Documentação oficial do **OpenAPI 3.0**: https://swagger.io/specification/

---

**Assinatura:**  
Rodrigo Pereira - A045580
Miguel Caetano - A045911
30/01/2025
