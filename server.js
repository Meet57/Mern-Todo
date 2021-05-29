const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const path = require("path")

mongoose.connect("mongodb+srv://meet:meet@meet.soyef.mongodb.net/todo?retryWrites=true&w=majority", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
});

const PORT =  process.env.YOUR_PORT || process.env.PORT || 80;

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.json());

app.get("/api/", (req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

app.post("/api/create", (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

app.post("/api/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.text = req.body.text;

      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
