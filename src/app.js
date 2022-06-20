import express, { json } from "express";
import { AuthRouter } from "./authentication/auth.routes.js";
import { logger } from "./middlewares/logging.middleware.js";
import { UsersRouter } from "./users/users.routes.js";

const app = express();

// Add ability to read request bodies as JSON
app.use(json());
app.use(logger);

app.use("/auth", AuthRouter);
app.use("/users", UsersRouter);

app.get("/", function (_req, res) {
  res.status(418).send({ message: `I'm alive!!` });
});

app.all("/*", (req, res) => {
  res.status(404).send({
    statusCode: 404,
    message: `Cannot ${req.method} ${req.url}`,
    error: "Not Found",
  });
});

app.listen(3000, function () {
  console.log(`Server running on port 3000`);
});
