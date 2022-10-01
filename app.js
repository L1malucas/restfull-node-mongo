// importações das dependências externas
const express = require("express");
const mongoose = require("mongoose");

// importação das configs do banco
const Person = require("./models/Person");

// variaveis basicas e universais
const app = express();
const PORT = 3000;

// leitrua de json = middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

// criação da rota home, rota = endpoint
app.get("/", (_req, res) => {
  res.json({ message: "eita" });
});

// config mongoose
const MONGO_USER = "lucas";
const MONGO_PASS = "privacidade";
mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@restfull-node-mongo.vqw1iin.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao mongo atlas");
    // define porta do servidor
    app.listen(PORT, () => {
      console.log(`Rodando em http://localhost:${PORT}`);
    });
  })
  .catch((erro) => {
    console.log(erro);
  });

app.use(express.json());

// ROTAS DA API REST

// POST
app.post("/person", async (req, res) => {
  //desestruturação
  const { name, salary, approved } = req.body;

  // cria objeto q sera enviado para o mongo
  const pessoa = {
    name,
    salary,
    approved,
  };

  // cria dados apenas passando o objeto json pessoa
  try {
    await Person.create(pessoa);
    res.status(201).json({ message: `${pessoa.name} criada com sucesso` });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// GET USERNAME
app.get("/person/:name", (_req, res) => {});
