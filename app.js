const express = require("express");
const app = express();
const port = 3000;
const notFoundError = require("./middlewares/notFoundError.js");
const errorHandler = require("./middlewares/errorHandler.js");

//Middlewares
app.use(express.json());

//Router Posts
const postsRouter = require("./routers/posts");
app.use("/posts", postsRouter);

app.use(notFoundError);
app.use(errorHandler);

app.listen(port, () => {
  console.log("App listening");
});
