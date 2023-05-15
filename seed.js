const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const Book = require("./models/book");

async function seed() {
  await Book.create({ title: "Favourite book", description: "best book ever", status: "available" });
  await Book.create({ title: "Amazing book", description: "amazing book, you should read it", status: "available" });
  await Book.create({ title: "Merlin", description: "do you know Merlin ?", status: "not available" });
  await Book.create({ title: "I'm a Wizard !", description: "my life as a wizard", status: "not available" });
  mongoose.disconnect();
}

seed();
