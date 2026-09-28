const express = require('express');
const app = express();
const PORT = 3000;

// OBRIGATÓRIO: Habilita o Express a ler JSON no corpo da requisição (req.body)
app.use(express.json());

// 2. EXEMPLO COM QUERY PARAMS (req.query) - Filtro / Busca Dinâmica
app.get('/livros', (req, res) => {
  const { autor, categoria } = req.query;
  res.status(200).json({
    mensagem: "Consulta de livros realizada com sucesso",
    filtros: { autor: autor || "Todos", categoria: categoria || "Todas" }
  });
});

// 3. EXEMPLO COM BODY (req.body) - Cadastro / Envio de Dados JSON
app.post('/produtos', (req, res) => {
    const { nome, preco, categoria } = req.body;

    // Validação dos campos obrigatórios (Erro do Cliente -> 400)
    if (!nome || !preco) {
        return res.status(400).json({ 
            erro: "Dados incompletos! É obrigatório informar 'nome' e 'preco'." 
        });
    }

    // Sucesso ao criar novo recurso -> 201 Created
    res.status(201).json({
        mensagem: "Produto cadastrado com sucesso!",
        produtoCriado: { id: Math.floor(Math.random() * 1000), nome, preco, categoria }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express rodando na porta ${PORT}`);
});