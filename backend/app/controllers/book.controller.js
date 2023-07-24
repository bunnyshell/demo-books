const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;
const { XataClient } = require("../models/xata");
const fetch = require("node-fetch");

let instance = undefined;
const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient({
    // Override configuration here
    fetch: fetch,
  });
  return instance;
};

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "The title can not be empty",
    });
    return;
  }

  const book = {
    title: req.body.title,
    description: req.body.description,
    available: req.body.available ? req.body.available : false,
  };

  const xata = getXataClient();
  xata.db.books
    .create(book)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while adding the Book",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $contains: title } } : {};

  const xata = getXataClient();
  xata.db.books
    .filter(condition)
    .getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving the Books",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  const xata = getXataClient();
  xata.db.books
    .read(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the Book with ID ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `An error occurred while retrieving Book with ID ${id}`,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  const xata = getXataClient();
  xata.db.books
    .update(id, req.body)
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "The Book was updated successfully",
        });
      } else {
        res.send({
          message: `Cannot update the Book with ID ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `An error occurred while updating Book with ID ${id}`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  const xata = getXataClient();
  xata.db.books
    .delete([id])
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "The Book was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete the Book with ID ${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `An error occurred while deleting the Book with ID ${id}`,
      });
    });
};

exports.deleteAll = (req, res) => {
  const xata = getXataClient();
  xata.db.books.getAll().then((books) => {
    xata.db.books
      .delete(books)
      .then((nums) => {
        res.send({ message: `${nums} Books were deleted successfully` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "An error occurred while removing all the Books",
        });
      });
  });
};

exports.findAllAvailable = (req, res) => {
  const xata = getXataClient();
  xata.db.books
    .filter({ available: true })
    .getAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "An error occurred while retrieving the Books",
      });
    });
};
