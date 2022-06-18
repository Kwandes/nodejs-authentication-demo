import express, { json } from "express";

const app = express();
app.use(json());

app.get("/", function (_req, res) {
  console.log("Request body", _req.body);
  res.status(418).send({ message: `I'm alive!!` });
});

app.listen(3000, function () {
  console.log(`Server running on port 3000`);
});
