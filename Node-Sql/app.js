const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;
const cors = require('cors'); 
app.use(cors());

const postsRouter = require("./routes/postsRoutes")
app.use("/posts", postsRouter);
console.log(typeof postsRouter);

const todosRouter = require("./routes/todosRoutes")
app.use("/todos", todosRouter);

const usersRouter = require("./routes/usersRoutes")
app.use("/users", usersRouter);

const commentsRouter = require("./routes/commentsRoutes")
app.use("/comments", commentsRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
