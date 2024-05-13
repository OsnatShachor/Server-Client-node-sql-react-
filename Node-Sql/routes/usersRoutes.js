
const express = require("express");
const router = express.Router();
const controller = require("../controllers/usersController");

// GET all users
router.get("/", async (req, res) => {
  const userName = req.query.userName;
  const password = req.query.password;
  if (userName) {
    if (password) {
      try {
        user = await controller.getUserByNamePassword(userName, password);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch user" });
      }
    }
    else{
      try {
        user = await controller.getUserByUserName(userName);
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch user" });
      } 
    }
  }
  else {//
    try {
      console.log("getAllUsers");
      const users = await controller.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch users" });
    }
  }
});


router.post("/", async (req, res) => {
      try {
        const { userName, password } = req.body; // Assuming you meant to include completed
        const user = await controller.createUser(userName, password);
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to create user" });
      }
});



// PUT (update) an existing user by userName
router.put("/:userName", async (req, res) => {
  try {
    const { userName, name, email, phone, company, street, city, zipcode } = req.body; // Assuming you meant to include completed
    const user = await controller.updateUser(userName, name, email, phone, company, street, city, zipcode);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update user" });
  }
});
module.exports = router;