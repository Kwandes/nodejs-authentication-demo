import express from "express";
import { processError } from "../util/process-error.js";
import { AuthService } from "./auth.service.js";

const router = express.Router();

const authService = new AuthService();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the body
    if (!email || !password) {
      return res.status(400).send({
        statusCode: 400,
        message: "Email and password are required",
        error: "Bad Request",
      });
    }

    const response = await authService.login(email, password);
    return res.status(200).send(response);
  } catch (err) {
    return processError(err, res);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate the body
    if (!email || !password) {
      return res.status(400).send({
        statusCode: 400,
        message: "Email and password are required",
        error: "Bad Request",
      });
    }

    const response = await authService.signup(email, password);
    return res.status(200).send(response);
  } catch (err) {
    return processError(err, res);
  }
});

router.post("/secret", async (_req, res) => {
  return res
    .status(418)
    .send({ secretData: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" });
});

export { router as AuthRouter };
