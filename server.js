"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);
const Book = require("./models/book");
const PORT = process.env.PORT || 3001;

app.get("/test", (request, response) => {
  response.send("test request received");
});
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find(request.query);
    response.json(books);
  } catch (error) {
    response.status(500).json("Cannot find any books");
  }
});
app.post("/books", async (request, response) => {
  try {
    const newBook = await Book.create(request.body);
    response.json(newBook);
  } catch (error) {
    response.status(500).json("Cannot create the book");
  }
});
app.delete("/books/:id", async (request, response) => {
  try {
    if (request.params.id) {
      const deletedBook = await Book.findByIdAndDelete(request.params.id);
      response.json(deletedBook);
    } else {
      response.status(500).json("Please enter an ID");
    }
  } catch (error) {
    response.status(500).json("Cannot delete the book");
  }
});

app.put("/books/:id", async (request, response) => {
  const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body);
  response.json(updatedBook);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
