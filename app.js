// importações das dependências externas
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

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
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
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
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);
