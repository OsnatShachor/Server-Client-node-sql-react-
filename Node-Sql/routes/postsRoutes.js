
const express = require("express");
const router = express.Router();
const controller = require("../controllers/postsController");

// GET all posts
router.get("/", async (req, res) => {
  const userID = req.query.userID;
  if (userID) {
    try {
      const posts = await controller.getPostByUser(userID);
      if (!posts) {
        return res.status(404).send({ error: "Post not found" });
      }
      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch post" });
    }
  }
  else {
    try {//get AllPosts
      const posts = await controller.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Failed to fetch posts" });
    }
  }
});

// POST a new post-create
router.post("/", async (req, res) => {
  try {
    const { userID, title, body } = req.body;
    const response = await controller.createPost(userID, title, body);
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create post" });
  }
});

// PUT (update) an existing post by ID
router.put("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const { userID, title, body } = req.body;
    await controller.updatePost(ID, userID, title, body);
    const updatedPost = await controller.getPost(ID);
    if (!updatedPost) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).send(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update post" });
  }
});

router.delete("/:ID", async (req, res) => {
  try {
    const ID = req.params.ID;
    const deletedPost = await controller.deletePost(ID);
    if (!deletedPost) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to delete post" });
  }
});







module.exports = router;