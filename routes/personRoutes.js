const router = require("express").Router();
// importação das configs do banco
const Person = require("../models/Person");
// POST
router.post("/", async (req, res) => {
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

// GET TOTAL
router.get("/", async (_req, res) => {
  try {
    // find busca todos dados do banco
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// GET NAME
router.get("/:id", async (req, res) => {
  // extrai informações pelo parametro params, com a unica variavel id
  const id = req.params.id;
  try {
    const person = await Person.findOne({ _id: id });
    if (!person) {
      res
        .status(422)
        .json({ message: `usario de id ${person} nao encontrado` });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// UPDATE -  PATCH (atualiza parcialmente)

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = { name, salary, approved };

  try {
    const patchPerson = await Person.updateOne({ _id: id }, person);

    if (patchPerson.matchedCount === 0) {
      res
        .status(422)
        .json({ message: `usario de id ${person} nao encontrado` });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});

// DELETE

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({ _id: id });
  if (!person) {
    res.status(422).json({ message: `usario de id ${id} nao encontrado` });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: `usario de id ${id} removido` });
  } catch (error) {
    res.status(422).json({ message: `usario de id ${person} nao encontrado` });
  }
});

module.exports = router;
