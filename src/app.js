import express from "express";

const app = express();

app.get("/", function (_req, res) {
  res.status(418).send({ message: `I'm alive!!` });
});

app.listen(3000, function () {
  console.log(`Server running on port 3000`);
});
