
const express = require("express");
const router = express.Router();
const controller = require("../controllers/todosController");


router.get("/", async (req, res) => {
  const userID = req.query.userID;
  if (userID) {
    try {
      const todos = await controller.getTodoByUser(userID);
      if (!todos) {
        return res.status(404).send({ error: "Todo not found" });
      }
      res.status(200).send(todos);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch todo" });
    }
  }
  else {//get AllTodos
    try {
      const todos = await controller.getAllTodos();
      res.status(200).send(todos);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch todos" });
    }
  }

});

router.post("/", async (req, res) => {
  try {
    const { userID, title, completed } = req.body;
    const response = await controller.createTodo(userID, title, completed);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create todo" });
  }
});


router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { userID, title, completed } = req.body;
    await controller.updateTodo(ID, userID, title, completed);
    const updatedTodo = await controller.getTodo(ID);
    if (!updatedTodo) {
      return res.status(404).send({ error: "Todo not found" });
    }
    res.status(200).send(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update todo" });
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const result = await await controller.deleteTodo(ID);
    if (result === false) {
      return res.status(404).send({ error: "Todo not found" });
    }
    res.status(200).send({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete todo" });
  }
});


module.exports = router;