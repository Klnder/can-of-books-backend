"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const Book = require("./models/book");
const PORT = process.env.PORT || 3001;

app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/books", async (require, response) => {
  const books = await Book.find();
  response.json(books);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
