const mongoose = require("mongoose");

// define conteudo do banco
const Person = mongoose.model("Person", {
  name: String,
  salary: Number,
  approved: Boolean,
});

module.exports = Person;
