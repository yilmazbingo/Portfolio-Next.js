const Book = require("../models/Book");

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  if (!books) res.status(404).send("there is no book");
  res.send(books);
};

exports.saveBook = async (req, res) => {
  const bookData = req.body;
  const book = new Book(bookData);

  await book.save();
  return res.send(book);
};

exports.updateBooks = async (req, res) => {
  const id = req.params.id;
  let book = await Book.findById(id);
  if (!book) res.status(404).send(`there is no book with this ${id}`);
  book.set(req.body);

  try {
    await book.save();
    res.send(book);
  } catch (e) {
    console.log(e);
  }
};

exports.deleteBooks = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findByIdAndDelete(id);
    console.log(book);
    return res.send(`${book} is deleted`);
  } catch (e) {
    console.log(e);
  }
};
